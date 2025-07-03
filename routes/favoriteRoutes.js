import { Router } from "express";
import {
  addFavoriteController,
  getFavoritesController,
  removeFavoriteController,
} from "../controllers/favoriteController.js";
import { isLogin } from "../controllers/authController.js";

const router = Router();

// Add to favorite
router.post("/add-to-favorite", isLogin, addFavoriteController);
router.delete("/delete-favorite/:siteId", isLogin, removeFavoriteController);
router.get("/get-all-favorites", isLogin, getFavoritesController);

export default router;
