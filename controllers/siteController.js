import siteModel from "../modals/siteModel.js";
import { escapeRegex } from "../utills/escapeRegex.js";

export async function getAllSites(req, res) {
  try {
    const allSites = await siteModel.find({});

    res.status(200).json({
      success: true,
      message: "All Sites",
      numberOfSites: allSites.length,
      sites: allSites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

// Get all restaurants
export async function getAllRestaurants(req, res) {
  try {
    // restaurant is dependent on amenity
    const allRestaurants = await siteModel.find({
      $or: [{ amenity: "restaurant" }, { tourism: "restaurant" }],
    });

    const cusines = [];

    allRestaurants.map((restaurant) => {
      Object.entries(restaurant.metadata).map(([key, value]) => {
        if (key === "cuisine" && !cusines.includes(value)) cusines.push(value);
      });
    });

    console.log(cusines.length);
    console.log(cusines);
    // Object.entries(allRestaurants.metadata).map(([key, value]) => {
    //   if (key === "cuisine") console.log(key);
    // });

    res.status(200).json({
      success: true,
      message: "All Restaurants",
      numberOfRestaurants: allRestaurants.length,
      restaurants: allRestaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

// Get all theatres
export async function getAllTheatres(req, res) {
  try {
    // theatre is dependent on amenity
    const allTheatres = await siteModel.find({
      $or: [{ amenity: "theatre" }, { tourism: "theatre" }],
    });

    res.status(200).json({
      success: true,
      message: "All Theatres",
      numberOfTheatres: allTheatres.length,
      theatres: allTheatres,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

// Get all art works
export async function getAllArtworks(req, res) {
  try {
    // artwork is dependent on tourism
    const allArtworks = await siteModel.find({
      $or: [{ tourism: "artwork" }, { amenity: "artwork" }],
    });

    const artWorks = [];

    allArtworks.map((artWork) => {
      Object.entries(artWork.metadata).map(([key, value]) => {
        if (key === "artwork_type" && !artWorks.includes(value))
          artWorks.push(value);
      });
    });

    console.log(artWorks.length);
    console.log(artWorks);

    res.status(200).json({
      success: true,
      message: "All Art works",
      numberOfArtworks: allArtworks.length,
      artworks: allArtworks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

// Get all museums
export async function getAllMuseums(req, res) {
  try {
    // museum is dependent on tourism
    const allMuseums = await siteModel.find({
      $or: [{ tourism: "museum" }, { amenity: "museum" }],
    });

    res.status(200).json({
      success: true,
      message: "All Museums",
      numberOfMuseums: allMuseums.length,
      museums: allMuseums,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

// Get all Galleries
export async function getAllGalleries(req, res) {
  try {
    // Gallery is dependent on tourism
    const allGalleries = await siteModel.find({
      $or: [{ tourism: "gallery" }, { amenity: "gallery" }],
    });

    res.status(200).json({
      success: true,
      message: "All Galleries",
      numberOfGalleries: allGalleries.length,
      galleries: allGalleries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

// Get Sites with Search
export async function searchSiteController(req, res) {
  try {
    const { keyword } = req.params;

    // First, try full-text search
    let searchResult = await siteModel.find({
      $text: { $search: keyword },
    });

    // If nothing found, fall back to regex
    if (!searchResult.length) {
      const escaped = escapeRegex(keyword);
      const pattern = new RegExp(`.*${escaped}.*`, "i");

      searchResult = await siteModel.find({
        $or: [
          { name: { $regex: pattern } },
          { amenity: { $regex: pattern } },
          { tourism: { $regex: pattern } },
          { "metadata.cuisine": { $regex: pattern } },
        ],
      });
    }

    res.status(200).json({
      success: true,
      message: "Search related sites",
      numberOfSitesWithSearch: searchResult.length,
      sitesWithSearch: searchResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
}

// filter site
export async function filterSiteController(req, res) {
  try {
    const category = req.body.category.toLowerCase();
    const subCategory = req.body?.subCategory?.toLowerCase();

    const escaped = escapeRegex(subCategory);
    const pattern = new RegExp(`.*${escaped}.*`, "i");

    const query = {
      $and: [
        {
          $or: [{ amenity: category }, { tourism: category }],
        },
        ...(subCategory
          ? [
              {
                $or: [
                  { "metadata.cuisine": subCategory },
                  { "metadata.cuisine": { $regex: pattern } },
                ],
              },
            ]
          : []),
      ],
    };

    const allFilteredSites = await siteModel.find(query);

    res.status(200).json({
      success: true,
      message: "Filtered Sites",
      numberOfFilteredSites: allFilteredSites.length,
      allFilteredSites,
    });
  } catch (error) {
    console.log("Error in filtering sites", error);
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
}

// get site with id
export async function singleSiteController(req, res) {
  try {
    const { id } = req.params;
    const site = await siteModel.findById(id);

    res.status(200).json({
      success: true,
      message: "Site fetched",
      site,
    });
  } catch (error) {
    console.log("error in getting site with id");
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
}
