import express from "express";
import {
  deleteUserController,
  reactivateUserController,
  registerController,
} from "../controllers/userController.js";
import formidable from "express-formidable";
import { isLogin, loginUser, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/register-user", formidable(), registerController);
router.put("/reactive-user", reactivateUserController);

// this is soft deletion, that's why put is used instead of delete
router.put("/delete-user", isLogin, deleteUserController);

// login
router.post("/login", loginUser);

// logout
router.post("/logout", logout);

export default router;
