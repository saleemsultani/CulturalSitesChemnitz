import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    site: { type: mongoose.Schema.Types.ObjectId, ref: "site", required: true },
  },
  { timestamps: true }
);

favoriteSchema.index({ user: 1, site: 1 }, { unique: true }); // Prevent duplicates

const favoriteModel = mongoose.model("favorite", favoriteSchema);

export default favoriteModel;
