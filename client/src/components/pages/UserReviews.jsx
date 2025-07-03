import { useState } from "react";
import {
  Typography,
  Paper,
  Link,
  Rating,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSite } from "../contexts/SiteContext";
import axios from "axios";
import styles from "./UserReviews.module.css";
import { useNavigate } from "react-router-dom";

function UserReviews() {
  const { userReviews, setCurrentSite, setIsSiteOpen } = useSite();
  const navigate = useNavigate();

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedReview, setEditedReview] = useState("");
  const [editedRating, setEditedRating] = useState(0);

  const handleEditReview = (review) => {
    setEditingReviewId(review._id);
    setEditedReview(review.review);
    setEditedRating(review.rating);
  };

  const cancelReviewEditing = () => {
    setEditingReviewId(null);
    setEditedReview("");
    setEditedRating(0);
  };

  const handleSaveReview = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/v1/reviews/update-review/${editingReviewId}`,
        {
          rating: editedRating,
          review: editedReview,
        },
        { withCredentials: true }
      );
      if (res?.data?.success) {
        alert("Review updated successfully.");
      } else {
        alert("Failed to update review.");
      }
    } catch (error) {
      alert("Error updating review.");
      console.error(error);
    }
    cancelReviewEditing();
  };

  const handleDeleteReview = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/reviews/delete-review/${editingReviewId}`,
        { withCredentials: true }
      );
      if (res?.data?.success) {
        alert("Review deleted successfully.");
      } else {
        alert("Failed to delete review.");
      }
    } catch (error) {
      alert("Error deleting review.");
      console.error(error);
    }
    cancelReviewEditing();
  };

  return (
    <Box className={styles.reviewBox}>
      <Typography variant="h5" gutterBottom align="center">
        Reviewed Sites
      </Typography>
      {userReviews?.length > 0 ? (
        userReviews.map((review) => (
          <Paper key={review._id} className={styles.paper}>
            <Link
              href="#"
              underline="hover"
              variant="h6"
              className={styles.link}
              onClick={() => {
                setCurrentSite(review?.site);
                navigate("/home");
                setIsSiteOpen(true);
              }}
            >
              {review.site?.name}
            </Link>
            {editingReviewId === review._id ? (
              <>
                <Rating
                  name="edit-rating"
                  value={editedRating}
                  precision={0.5}
                  onChange={(_, newValue) => setEditedRating(newValue || 0)}
                />
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  value={editedReview}
                  onChange={(e) => setEditedReview(e.target.value)}
                  className={styles.textField}
                />
                <Button onClick={handleSaveReview} variant="contained">
                  Save
                </Button>
                <Button
                  onClick={cancelReviewEditing}
                  variant="outlined"
                  sx={{ ml: 1 }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteReview}
                  variant="outlined"
                  color="error"
                  sx={{ ml: 1 }}
                >
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Rating name="read-only" value={review.rating} readOnly />
                <Typography>Review: {review.review}</Typography>
                <IconButton
                  onClick={() => handleEditReview(review)}
                  sx={{ mt: 1 }}
                >
                  <EditIcon />
                </IconButton>
              </>
            )}
          </Paper>
        ))
      ) : (
        <Typography align="center">No reviews yet.</Typography>
      )}
    </Box>
  );
}

export default UserReviews;
