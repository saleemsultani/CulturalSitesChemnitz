// import { useState } from "react";
// import { useSite } from "../contexts/SiteContext";
// import Layout from "../Layout/Layout";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   Rating,
//   TextField,
//   Link,
//   Paper,
// } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import EditIcon from "@mui/icons-material/Edit";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import axios from "axios";

// dayjs.extend(relativeTime);

// function Dashboard() {
//   const { favoriteSites, userReviews } = useSite();

//   const [editingReviewId, setEditingReviewId] = useState(null);
//   const [editedReview, setEditedReview] = useState("");
//   const [editedRating, setEditedRating] = useState(0);

//   const handleRemoveFavorite = (fav) => {
//     async function removeFavorite() {
//       try {
//         const res = await axios.delete(
//           `http://localhost:8080/api/v1/favourites/delete-favorite/${fav?.site?._id}`,
//           {
//             withCredentials: true,
//           }
//         );
//         if (res?.data?.success) {
//           alert(`${fav?.site?.name} removed from favorites`);
//         }
//       } catch (error) {
//         alert(`Error in removing favorite`);
//         console.log(error);
//       }
//     }
//     const confirm = window.confirm(`Remove ${fav?.site?.name} from favorites?`);
//     if (confirm) {
//       removeFavorite();
//     }
//   };

//   const handleEditReview = (review) => {
//     setEditingReviewId(review._id);
//     setEditedReview(review.review);
//     setEditedRating(review.rating);
//   };

//   const cancelReviewEditing = () => {
//     setEditingReviewId(null);
//     setEditedReview("");
//     setEditedRating(0);
//   };

//   const handleSaveReview = async () => {
//     try {
//       const res = await axios.put(
//         `http://localhost:8080/api/v1/reviews/update-review/${editingReviewId}`,
//         {
//           rating: editedRating,
//           review: editedReview,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       if (res?.data?.success) {
//         alert(`Review updated successfully.`);
//       } else {
//         alert(`Failed to update review.`);
//       }
//     } catch (error) {
//       alert("Error updating review.");
//       console.error(error);
//     }
//     setEditingReviewId(null);
//     setEditedReview("");
//     setEditedRating(0);
//   };

//   const handleDeleteReview = async () => {
//     const confirm = window.confirm(
//       "Are you sure you want to delete this review?"
//     );
//     if (!confirm) return;

//     try {
//       const res = await axios.delete(
//         `http://localhost:8080/api/v1/reviews/delete-review/${editingReviewId}`,
//         {
//           withCredentials: true,
//         }
//       );
//       if (res?.data?.success) {
//         alert("Review deleted successfully.");
//       } else {
//         alert("Failed to delete review.");
//       }
//     } catch (error) {
//       alert("Error deleting review.");
//       console.error(error);
//     }
//   };

//   return (
//     <Layout title={"Dashboard"}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           marginTop: "10%",
//           px: 2,
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             gap: 4,
//             maxWidth: "1200px",
//             width: "100%",
//             justifyContent: "center",
//             flexWrap: "wrap",
//             height: "50%",
//             overflow: "scroll",
//             scrollbarWidth: "none",
//             "&::-webkit-scrollbar": {
//               display: "none",
//             },
//           }}
//         >
//           {/* Reviewed Sites */}
//           <Box
//             sx={{
//               flex: 1,
//               minWidth: 300,
//               height: "500px",
//               width: "50%",
//               overflow: "scroll",
//               scrollbarWidth: "none",
//               "&::-webkit-scrollbar": {
//                 display: "none",
//               },
//             }}
//           >
//             <Typography variant="h5" gutterBottom align="center">
//               Reviewed Sites
//             </Typography>
//             {userReviews?.length > 0 ? (
//               userReviews.map((review) => (
//                 <Paper key={review._id} sx={{ p: 2, mb: 2 }}>
//                   <Link
//                     href="#"
//                     underline="hover"
//                     variant="h6"
//                     sx={{ display: "block", mb: 1 }}
//                     onClick={() =>
//                       alert(`Clicked on ${review.site?.name || "Site"}`)
//                     }
//                   >
//                     {review.site?.name}
//                   </Link>
//                   {editingReviewId === review._id ? (
//                     <>
//                       <Rating
//                         name="edit-rating"
//                         value={editedRating}
//                         precision={0.5}
//                         onChange={(_, newValue) =>
//                           setEditedRating(newValue || 0)
//                         }
//                       />
//                       <TextField
//                         fullWidth
//                         multiline
//                         minRows={2}
//                         value={editedReview}
//                         onChange={(e) => setEditedReview(e.target.value)}
//                         sx={{ my: 1 }}
//                       />
//                       <Button onClick={handleSaveReview} variant="contained">
//                         Save
//                       </Button>
//                       <Button
//                         onClick={cancelReviewEditing}
//                         sx={{ marginLeft: "5px" }}
//                         variant="outlined"
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         onClick={handleDeleteReview}
//                         sx={{ marginLeft: "5px" }}
//                         variant="outlined"
//                         color="error"
//                       >
//                         Delete
//                       </Button>
//                     </>
//                   ) : (
//                     <>
//                       <Rating name="read-only" value={review.rating} readOnly />
//                       <Typography>Review: {review.review}</Typography>
//                       <IconButton
//                         onClick={() => handleEditReview(review)}
//                         sx={{ mt: 1 }}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                     </>
//                   )}
//                 </Paper>
//               ))
//             ) : (
//               <Typography align="center">No reviews yet.</Typography>
//             )}
//           </Box>

//           {/* Favorite Sites */}
//           <Box
//             sx={{
//               flex: 1,
//               minWidth: 300,
//               height: "500px",
//               width: "50%",
//               overflow: "scroll",
//               scrollbarWidth: "none",
//               "&::-webkit-scrollbar": {
//                 display: "none",
//               },
//             }}
//           >
//             <Typography variant="h5" gutterBottom align="center">
//               Favorite Sites
//             </Typography>
//             {favoriteSites?.length > 0 ? (
//               favoriteSites.map((fav) => (
//                 <Paper key={fav._id} sx={{ p: 2, mb: 2, position: "relative" }}>
//                   <Link
//                     href="#"
//                     underline="hover"
//                     variant="h6"
//                     sx={{ display: "block", mb: 1 }}
//                     onClick={() =>
//                       alert(`Clicked on ${fav.site?.name || "Site"}`)
//                     }
//                   >
//                     {fav?.site?.name} (
//                     {fav?.site?.tourism || fav?.site?.amenity})
//                   </Link>
//                   {fav?.site?.address && (
//                     <Typography variant="body2" color="textSecondary">
//                       {fav.site.address?.street}, {fav.site.address?.city}
//                     </Typography>
//                   )}
//                   <Typography variant="caption" color="textSecondary">
//                     added {dayjs(fav?.createdAt).fromNow()}
//                   </Typography>
//                   <IconButton
//                     onClick={() => handleRemoveFavorite(fav)}
//                     color="error"
//                     sx={{ position: "absolute", top: 8, right: 8 }}
//                   >
//                     <FavoriteIcon />
//                   </IconButton>
//                 </Paper>
//               ))
//             ) : (
//               <Typography align="center">No favorite sites yet.</Typography>
//             )}
//           </Box>
//         </Box>
//       </Box>
//     </Layout>
//   );
// }

// export default Dashboard;

import { Box } from "@mui/material";
import Layout from "../Layout/Layout";
import UserReviews from "./UserReviews";
import UserFavorites from "./UserFavorites";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <Layout title="Dashboard">
      <Box className={styles.container}>
        <Box className={styles.innerContainer}>
          <UserReviews />
          <UserFavorites />
        </Box>
      </Box>
    </Layout>
  );
}

export default Dashboard;
