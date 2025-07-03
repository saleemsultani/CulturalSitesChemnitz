import siteModel from "../modals/siteModel.js";
import favoriteModel from "../modals/favoriteModel.js";

// Add to favorite
export async function addFavoriteController(req, res) {
  try {
    const { siteId } = req.body;

    if (!siteId) {
      return res.status(400).json({
        success: false,
        message: "Missing site ID!",
      });
    }

    const alreadyExists = await favoriteModel.findOne({
      user: req.user._id,
      site: siteId,
    });

    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message: "Site is already marked as favorite.",
      });
    }

    const fav = await favoriteModel.create({
      user: req.user._id,
      site: siteId,
    });

    res.status(201).json({
      success: true,
      message: "Site marked as favorite!",
      favorite: fav,
    });
  } catch (error) {
    console.log("Error in adding favorite");
    res.status(500).json({
      success: false,
      message: "Error in adding favorite",
      error,
    });
  }
}

// delete favorite
export async function removeFavoriteController(req, res) {
  try {
    const { siteId } = req.params;
    console.log("this is id of fav to delete: ", siteId);

    if (!siteId) {
      return res.status(400).json({
        success: false,
        message: "Missing site ID!",
      });
    }

    const fav = await favoriteModel.findOneAndDelete({
      user: req.user._id,
      site: siteId,
    });

    if (!fav) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Favorite removed",
    });
  } catch (error) {
    console.log("Error in removing favorite");
    res.status(500).json({
      success: false,
      message: "Error in removing favorite",
      error,
    });
  }
}

// get all favorites
export async function getFavoritesController(req, res) {
  console.log("i am all favorite");
  try {
    const favorites = await favoriteModel
      .find({ user: req.user._id })
      .populate("site");

    res.status(200).json({
      success: true,
      message: "Fetched favorites",
      favorites,
    });
  } catch (error) {
    console.log("Error in getting favorites");
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error in getting favorites",
      error,
    });
  }
}
