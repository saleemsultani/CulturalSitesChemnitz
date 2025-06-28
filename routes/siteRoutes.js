import express from "express";
import {
  filterSiteController,
  getAllArtworks,
  getAllGalleries,
  getAllMuseums,
  getAllRestaurants,
  getAllSites,
  getAllTheatres,
  // gettAllSitesWithDescription,
  searchSiteController,
  singleSiteController,
} from "../controllers/siteController.js";

const router = express.Router();

router.get("/get-all-sites", getAllSites);
router.get("/get-all-restaurants", getAllRestaurants);
router.get("/get-all-artworks", getAllArtworks);
router.get("/get-all-museums", getAllMuseums);
router.get("/get-all-theatres", getAllTheatres);
router.get("/get-all-galleries", getAllGalleries);
router.get("/search/:keyword", searchSiteController);
router.get("/filter", filterSiteController);
router.get("/:id", singleSiteController);

// test
// router.get("/get-all-sites-with-description", gettAllSitesWithDescription);

export default router;
