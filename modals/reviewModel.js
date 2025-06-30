import mongoose from "mongoose";
import siteModel from "./siteModel.js";

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    require: true,
    min: 0,
    max: 5,
  },
  review: String,
  site: {
    type: mongoose.ObjectId,
    ref: "site",
    required: [true, "Review Must belong to a site"],
  },
  user: {
    type: mongoose.ObjectId,
    ref: "user",
    require: [true, "Review Must belong to a user"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// this index declaration defines that
// one user is allowed to give review on a site only once
// or in other words no two documents should have the same combinagtion of "user" and "site"
reviewSchema.index({ site: 1, user: 1 }, { unique: true });

// calculate the average rating after review is submitted
reviewSchema.statics.calcAverageRatings = async function (siteId) {
  const stats = await this.aggregate([
    { $match: { site: siteId } },
    {
      $group: {
        _id: "$site",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  // console.log(stats);

  if (stats.length > 0) {
    await siteModel.findByIdAndUpdate(siteId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await siteModel.findByIdAndUpdate(siteId, {
      ratingsQuantity: 0,
      ratingsAverage: 0,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.site);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.model.findOne(this.getQuery()); // 'r' is a custom property to access later
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  if (this.r) {
    await this.r.constructor.calcAverageRatings(this.r.site);
  }
});

const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;
