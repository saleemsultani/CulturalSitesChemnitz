import JWT from "jsonwebtoken";
import userModel from "../modals/userModel.js";
import { comparePassword } from "../helper/passwordEncryptDecrypt.js";

// Login
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not registered",
      });
    }

    // Check if user is soft deleted
    if (user.deleted) {
      return res.status(403).json({
        success: false,
        message: "Account has been deleted.Please Reactive your account.",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Create token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // send token as cookie
    res.cookie("token", token, {
      // sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    });

    // hide password from response
    user.password = undefined;
    user.photo = undefined;
    user.deleted = undefined;

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: user,
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while logging in",
      error: error.message,
    });
  }
}

// logout
export async function logout(req, res) {
  try {
    console.log("this is inside logout controller");
    const token = req?.cookies?.token;
    console.log("this is token inside logout", token);

    if (token) {
      res.clearCookie("token");
      return res.status(200).json({
        success: true,
        message: "User logged out successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "You are already logged out",
        error: "Invalid token",
      });
    }
  } catch (error) {
    console.log("Error in logout", error);
    return res.status(500).json({
      success: false,
      message: "Error in logging out",
      error,
    });
  }
}

// Is Logg In?
export async function isLogin(req, res, next) {
  try {
    const token = req?.cookies?.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized: No token",
        error: "Invalid token",
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id).select("-photo");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized: User not found!",
        error: "Invalid token",
      });
    }

    // attach user to the request object and then next()
    req.user = user;
    req.token = token;

    // req.user.password = undefined;
    next();
  } catch (error) {
    console.log("error in isLogin!");
    res.status(500).json({
      success: false,
      message: "Error in checking User Login!",
      error,
    });
  }
}
