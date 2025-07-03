import { useState, useRef, useEffect } from "react";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useAuth } from "../contexts/auth";
import axios from "axios";
import { useSite } from "../contexts/SiteContext";

export default function RatingWithStars({ initialValue = 0 }) {
  const [value, setValue] = useState(initialValue);
  const [editing, setEditing] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const containerRef = useRef();
  const { isLogin } = useAuth();
  const { currentSite } = useSite();

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        resetForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [initialValue]);

  const resetForm = () => {
    setEditing(false);
    setReviewing(false);
    setValue(initialValue);
    setReviewText("");
  };

  const handleRatingClick = (_, newValue) => {
    if (!isLogin?.user) {
      alert("You are not logged in. Please login.");
      return;
    }

    setValue(newValue);
    setReviewing(true);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/reviews/create-review`,
        { rating: value, review: reviewText, site: currentSite._id },
        { withCredentials: true }
      );
      if (res?.data?.success) {
        console.log("review submitted successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Error! You have already submitted a review.");
      } else {
        console.log("error in login method", error);
        alert(error.response?.data?.message || "Review failed");
      }
    }

    resetForm();
  };

  return (
    <Box
      ref={containerRef}
      onMouseEnter={() => setEditing(true)}
      onMouseLeave={() => {
        if (
          !reviewing &&
          !containerRef.current.contains(document.activeElement)
        ) {
          setEditing(false);
          setValue(initialValue);
          setReviewText("");
        }
      }}
      sx={{ display: "inline-block" }}
    >
      <Rating
        name="hover-edit-rating"
        value={value}
        precision={0.5}
        readOnly={!editing}
        onChange={handleRatingClick}
      />

      {reviewing && (
        <>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={resetForm}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
}
