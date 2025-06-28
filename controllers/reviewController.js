import reviewModel from "../modals/reviewModel.js";

export async function createReviewController(req, res) {
  try {
    const { rating, review, site } = req.body;

    if (!rating || !site) {
      return res.status(400).json({
        success: false,
        message: "Missing Review Requirements",
        error: "rating and site are mandatory!",
      });
    }
    // create review
    const newReview = await reviewModel.create({
      user: req.user._id,
      rating,
      site,
      review,
    });

    res.status(200).json({
      success: true,
      message: "Review Created Successfully",
      review: newReview,
    });
  } catch (error) {
    console.log("Error in creating review");
    // if a user is trying to submit more than one reviews for the same site
    if (
      error.code === 11000 &&
      error.keyPattern?.site &&
      error.keyPattern?.user
    ) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a review for this site.",
      });
    }

    res.status(500).json({
      success: false,
      message: "error in creating review",
      error,
    });
  }
}

// Get all reviews
export async function getAllReviews(req, res) {
  try {
    const allReviews = await reviewModel.find({});

    res.status(200).json({
      success: true,
      message: "All Reviews",
      numberOfSites: allReviews.length,
      reviews: allReviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
}

// UPdate Review
export async function updateReviewController(req, res) {
  try {
    const { id } = req.params;
    const { rating, review } = req.body;

    // check for the id
    if (!id || !rating) {
      return res.status(400).json({
        success: false,
        message: "missing review id or rating!",
      });
    }

    const rev = await reviewModel.findById(id);

    // check if the review is available
    if (!rev) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // check if the user is updating his own review
    if (rev.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can not edit someone elss's review",
      });
    }

    // await rev.updateOne({ rating, review });
    await reviewModel.findOneAndUpdate(
      { _id: id },
      { rating, review },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
    });
  } catch (error) {
    console.log("Error in Updating review");
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
}

// Delete Review
export async function deleteReviewController(req, res) {
  try {
    const { id } = req.params;

    // check for the id
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "missing review id!",
      });
    }

    const rev = await reviewModel.findById(id);

    // check if the review is available
    if (!rev) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // check if the user is deleting his own review
    if (rev.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can not delete someone elss's review",
      });
    }

    await reviewModel.findOneAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.log("Error in Deleting review");
    res.status(500).json({
      success: false,
      message: "Error in Deleting Review",
      error,
    });
  }
}

// Get all reviews of a specific site
export async function getSiteReviewsController(req, res) {
  try {
    const { id } = req.params;
    // check for the id
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "missing review id!",
      });
    }

    const reviews = await reviewModel.find({ site: id });

    res.status(200).json({
      success: true,
      message: "All reviews of a site",
      numberOfReviewsOnSite: reviews.length,
      reviews,
    });
  } catch (error) {
    console.log("Error in getting site reveiews");
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
}
