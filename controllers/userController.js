import userModel from "../modals/userModel.js";
import fs from "fs";
import {
  comparePassword,
  hashPassword,
} from "../helper/passwordEncryptDecrypt.js";
// import { error } from "console";

export async function registerController(req, res) {
  console.log("this is user register controller");
  try {
    const { name, email, password, passwordConfirm } = req.fields;
    const { photo } = req.files;

    //alidation
    switch (true) {
      case !name:
        return res.status(400).json({
          success: false,
          message: "Please enter name!",
          error: "Name is required!",
        });
      case !email:
        return res.status(400).json({
          success: false,
          message: "Please enter email!",
          error: "Email is required!",
        });
      case !password:
        return res.status(400).json({
          success: false,
          message: "Please enter password!",
          error: "Password is required!",
        });
      case !passwordConfirm || password !== passwordConfirm:
        return res.status(400).json({
          success: false,
          message: "please provide password confirmation!",
          error:
            "Password confirmation is either missing or not matching password!",
        });

      case photo?.size > 1000000:
        return res.status(500).json({
          success: false,
          message: "please upload image less then 1mb",
          error: "photo should be less then 1mb",
        });
    }

    //check whether user is already registered
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      if (exisitingUser.deleted) {
        return res.status(403).json({
          success: false,
          message:
            "You have deleted your account, please reactive your account by hitting endpoint: /api/v1/user/reactive-user-account.",
          error: "Registering with deleted account.",
        });
      } else {
        return res.status(409).send({
          success: false,
          message: "Already Register! Please login!",
          error: "User is already registered.",
        });
      }
    }

    // encrypt the password
    const hashedPassword = await hashPassword(password);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    // check if the photo is being provided
    if (photo) {
      newUser.photo.data = fs.readFileSync(photo.path);
      newUser.photo.contentType = photo.type;
    }
    // now save the newly created user to the DB
    await newUser.save();

    const { password: pw, photo: ph, ...userData } = newUser._doc;

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Registering new User!",
      error,
    });
  }
}

export async function reactivateUserController(req, res) {
  try {
    const { email, password } = req.body;

    //   check whether email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide Email and Password both!",
        error: "Email or password is missing!",
      });
    }

    const user = await userModel.findOne({ email });

    //   check whether the user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn not exists",
        error: "No user found",
      });
    }

    //   check whether the users password is correct
    const match = comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Please enter Correct Credentials!",
        error: "Email or password is not correct",
      });
    }

    //   check wheter the user is deleted or not
    if (!user.deleted) {
      return res.status(400).json({
        success: false,
        message: "Account is already active, please Login.",
        error: "Activating an active account",
      });
    }

    //   now finally activate user's account
    user.deleted = false;

    const activatedUser = await user.save();
    const {
      password: pw,
      photo: ph,
      deleted: del,
      ...filteredActivatedUser
    } = activatedUser._doc;

    return res.status(200).json({
      success: true,
      message: "User activated Successfully",
      user: filteredActivatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error in Reactivating User!",
    });
  }
}

// Delete User controller
export async function deleteUserController(req, res) {
  try {
    const user = req.user;
    if (user.deleted) {
      return res.status(400).json({
        success: false,
        message: "Account already deleted",
        error: "Deleting deleted account",
      });
    }
    user.deleted = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Deleting user User!",
      error,
    });
  }
}
