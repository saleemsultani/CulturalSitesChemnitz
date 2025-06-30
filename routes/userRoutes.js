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

// isLogin
router.get("/is-login", isLogin, (req, res) => {
  if (req.user) {
    res.status(201).json({
      success: true,
      message: "User is logged in",
      user: req.user,
      token: req.token,
    });
  } else {
    res.status(201).json({
      success: false,
      message: "User is not logged in",
    });
  }
});

export default router;
