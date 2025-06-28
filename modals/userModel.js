import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please give us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please Provide your email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
