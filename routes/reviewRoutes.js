import { Router } from "express";
import {
  createReviewController,
  deleteReviewController,
  getAllReviews,
  getSiteReviewsController,
  getUserReviewsController,
  updateReviewController,
} from "../controllers/reviewController.js";
import { isLogin } from "../controllers/authController.js";

const router = Router();

// get all reviews
router.get("/get-all-reviews", getAllReviews);
// create review
router.post("/create-review", isLogin, createReviewController);
// update review
router.put("/update-review/:id", isLogin, updateReviewController);
// delete review
router.delete("/delete-review/:id", isLogin, deleteReviewController);

// get all reviews of a specific site
router.get("/get-site-reviews/:id", getSiteReviewsController);

// get all reviews of a specific user
router.get("/get-user-reviews", isLogin, getUserReviewsController);

export default router;
