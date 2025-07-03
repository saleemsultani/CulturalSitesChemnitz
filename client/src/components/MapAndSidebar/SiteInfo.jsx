// import { Box, Typography, Divider, Link, Rating } from "@mui/material";
// import { useSite } from "../contexts/SiteContext";
// import RatingWithStars from "../common/RatingWithStars.jsx";
// import { useAuth } from "../contexts/auth.jsx";

// const SiteInfo = () => {
//   const { currentSite } = useSite();
//   if (currentSite === null) return;
//   console.log("this is current site: ", currentSite);

//   const siteType =
//     currentSite?.amenity || currentSite?.tourism || "a place of interest";
//   const siteName = currentSite?.name || "This site";
//   const fullAddress = `${currentSite?.address?.street || ""}, ${
//     currentSite?.address?.city || ""
//   }, ${currentSite?.address?.country || ""} ${
//     currentSite?.address?.postcode || ""
//   }`;

//   let fallbackDescription = "";

//   switch (siteType) {
//     case "restaurant":
//       fallbackDescription = currentSite?.metadata?.description
//         ? currentSite.metadata.description
//         : `This restaurant in Chemnitz offers a delightful culinary experience that reflects the local flavor and ambiance.`;
//       break;
//     case "artwork":
//       fallbackDescription = currentSite?.metadata?.description
//         ? currentSite.metadata.description
//         : `This public artwork in Chemnitz adds a unique artistic touch to the surroundings, inviting passersby to pause and reflect.`;
//       break;
//     case "gallery":
//       fallbackDescription = currentSite?.metadata?.description
//         ? currentSite.metadata.description
//         : `This gallery in Chemnitz showcases inspiring pieces from local and international artists, making it a hub for creative expression.`;
//       break;
//     case "theatre":
//       fallbackDescription = currentSite?.metadata?.description
//         ? currentSite.metadata.description
//         : `This theatre in Chemnitz hosts captivating performances and cultural events, enriching the local arts scene.`;
//       break;
//     case "museum":
//       fallbackDescription = currentSite?.metadata?.description
//         ? currentSite.metadata.description
//         : `This museum in Chemnitz offers a journey through history, culture, and knowledge for curious minds.`;
//       break;
//     default:
//       fallbackDescription = `This ${siteType} is located in Chemnitz, offering a unique experience to visitors.`;
//   }

//   return (
//     <Box
//       p={2}
//       my={1}
//       sx={{
//         display: "flex",
//         gap: 1,
//         flexDirection: "column",
//         overflowY: "scroll",
//         width: "90%",
//         height: "80%",
//         marginBottom: "10%",
//         scrollbarWidth: "none",
//         "&::-webkit-scrollbar": {
//           display: "none",
//         },
//       }}
//     >
//       <Typography variant="h5">{siteName}</Typography>

//       <Typography variant="subtitle1" color="text.secondary" gutterBottom>
//         {siteType.charAt(0).toUpperCase() + siteType.slice(1)} in{" "}
//         {currentSite?.address?.city || "Chemnitz City"},
//         {currentSite?.address?.country || ""}
//       </Typography>

//       <Divider sx={{ mb: 2 }} />

//       <Typography variant="body">
//         {currentSite?.metadata?.description || fallbackDescription}
//       </Typography>
//       {currentSite?.metadata?.cuisine && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Cuisine:</strong> {currentSite?.metadata?.cuisine}
//         </Typography>
//       )}
//       <Typography variant="body2" color="text.secondary">
//         <strong>Address:</strong> {fullAddress}
//       </Typography>

//       {currentSite?.metadata?.phone && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Phone:</strong> {currentSite?.metadata?.phone}
//         </Typography>
//       )}

//       {currentSite?.metadata?.website && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Website:</strong>
//           <Link
//             href={currentSite?.metadata?.website}
//             target="_blank"
//             rel="noopener"
//           >
//             {currentSite?.metadata?.website}
//           </Link>
//         </Typography>
//       )}

//       {currentSite?.metadata?.opening_hours && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Opening Hours:</strong> {currentSite?.metadata?.opening_hours}
//         </Typography>
//       )}
//       {currentSite?.ratingsAverage !== undefined && (
//         <>
//           <Typography variant="body2" color="text.secondary">
//             <strong>
//               Rating: {currentSite?.ratingsAverage} out of (
//               {currentSite?.ratingsQuantity})
//             </strong>
//           </Typography>

//           <RatingWithStars initialValue={currentSite?.ratingsAverage} />
//         </>
//       )}
//       <Box>
//         <strong>Reviews</strong>
//         {currentSite?.reviews?.map((r) => {
//           return (
//             <p key={r._id}>
//               <b>
//                 {r.user.name} ({r.rating})
//               </b>
//               : {r.review}
//             </p>
//           );
//         })}
//       </Box>
//     </Box>
//   );
// };

// export default SiteInfo;

import { Box, Typography, Divider, Link } from "@mui/material";
import { useSite } from "../contexts/SiteContext";
import RatingWithStars from "../common/RatingWithStars.jsx";
import styles from "./SiteInfo.module.css";

const SiteInfo = () => {
  const { currentSite } = useSite();
  if (!currentSite) return null;

  const {
    name,
    tourism,
    amenity,
    address = {},
    metadata = {},
    ratingsAverage,
    ratingsQuantity,
    reviews = [],
  } = currentSite;

  const siteType = amenity || tourism || "place of interest";
  const fullAddress = [
    address.street,
    address.housenumber,
    address.city,
    address.postcode,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Box className={styles.siteInfoContainer}>
      <Typography variant="h5">{name || "Unnamed Site"}</Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {siteType.charAt(0).toUpperCase() + siteType.slice(1)}
        {address.city ? ` in ${address.city}` : ""}
        {address.country ? `, ${address.country}` : ""}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {metadata.description && (
        <Typography variant="body1">{metadata.description}</Typography>
      )}

      {metadata.cuisine && (
        <Typography variant="body2" color="text.secondary">
          <strong>Cuisine:</strong> {metadata.cuisine}
        </Typography>
      )}

      {fullAddress && (
        <Typography variant="body2" color="text.secondary">
          <strong>Address:</strong> {fullAddress}
        </Typography>
      )}

      {metadata.phone && (
        <Typography variant="body2" color="text.secondary">
          <strong>Phone:</strong> {metadata.phone}
        </Typography>
      )}

      {metadata.email && (
        <Typography variant="body2" color="text.secondary">
          <strong>Email:</strong> {metadata.email}
        </Typography>
      )}

      {metadata.website && (
        <Typography variant="body2" color="text.secondary">
          <strong>Website:</strong>{" "}
          <Link href={metadata.website} target="_blank" rel="noopener">
            {metadata.website}
          </Link>
        </Typography>
      )}

      {metadata.opening_hours && (
        <Typography variant="body2" color="text.secondary">
          <strong>Opening Hours:</strong> {metadata.opening_hours}
        </Typography>
      )}

      {metadata.fee && (
        <Typography variant="body2" color="text.secondary">
          <strong>Fee:</strong> {metadata.fee}
        </Typography>
      )}

      {metadata.wheelchair && (
        <Typography variant="body2" color="text.secondary">
          <strong>Wheelchair Accessible:</strong> {metadata.wheelchair}
        </Typography>
      )}

      {ratingsAverage !== undefined && ratingsQuantity !== undefined && (
        <>
          <Typography variant="body2" color="text.secondary">
            <strong>
              Rating: {ratingsAverage} ({ratingsQuantity}{" "}
              {ratingsQuantity === 1 ? "review" : "reviews"})
            </strong>
          </Typography>
          <RatingWithStars initialValue={ratingsAverage} />
        </>
      )}

      {reviews.length > 0 && (
        <Box className={styles.reviewsSection}>
          <strong>Reviews</strong>
          {reviews.map((r) => (
            <p key={r._id}>
              <b>
                {r.user.name} ({r.rating})
              </b>
              : {r.review}
            </p>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SiteInfo;

// import { Box, Typography, Divider, Link, IconButton } from "@mui/material";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { useSite } from "../contexts/SiteContext";
// import RatingWithStars from "../common/RatingWithStars.jsx";
// import styles from "./SiteInfo.module.css";

// const SiteInfo = () => {
//   const { currentSite } = useSite();
//   if (!currentSite) return null;

//   const {
//     name,
//     tourism,
//     amenity,
//     address = {},
//     metadata = {},
//     ratingsAverage,
//     ratingsQuantity,
//     reviews = [],
//   } = currentSite;

//   const siteType = amenity || tourism || "place of interest";
//   const fullAddress = [
//     address.street,
//     address.housenumber,
//     address.city,
//     address.postcode,
//     address.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   const handleFavoriteClick = () => {
//     // Placeholder for favorite logic, e.g., toggling favorite in state or API call
//     console.log(`Favorite clicked for site: ${name}`);
//   };

//   return (
//     <Box className={styles.siteInfoContainer}>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           mb: 1,
//         }}
//       >
//         <Typography variant="h5" noWrap>
//           {name || "Unnamed Site"}
//         </Typography>
//         <IconButton
//           aria-label="Mark as favorite"
//           onClick={handleFavoriteClick}
//           edge="end"
//           size="large"
//         >
//           <FavoriteBorderIcon />
//         </IconButton>
//       </Box>

//       <Typography variant="subtitle1" color="text.secondary" gutterBottom>
//         {siteType.charAt(0).toUpperCase() + siteType.slice(1)}
//         {address.city ? ` in ${address.city}` : ""}
//         {address.country ? `, ${address.country}` : ""}
//       </Typography>

//       <Divider sx={{ mb: 2 }} />

//       {metadata.description && (
//         <Typography variant="body1">{metadata.description}</Typography>
//       )}

//       {metadata.cuisine && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Cuisine:</strong> {metadata.cuisine}
//         </Typography>
//       )}

//       {fullAddress && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Address:</strong> {fullAddress}
//         </Typography>
//       )}

//       {metadata.phone && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Phone:</strong> {metadata.phone}
//         </Typography>
//       )}

//       {metadata.email && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Email:</strong> {metadata.email}
//         </Typography>
//       )}

//       {metadata.website && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Website:</strong>{" "}
//           <Link href={metadata.website} target="_blank" rel="noopener">
//             {metadata.website}
//           </Link>
//         </Typography>
//       )}

//       {metadata.opening_hours && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Opening Hours:</strong> {metadata.opening_hours}
//         </Typography>
//       )}

//       {metadata.fee && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Fee:</strong> {metadata.fee}
//         </Typography>
//       )}

//       {metadata.wheelchair && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Wheelchair Accessible:</strong> {metadata.wheelchair}
//         </Typography>
//       )}

//       {ratingsAverage !== undefined && ratingsQuantity !== undefined && (
//         <>
//           <Typography variant="body2" color="text.secondary">
//             <strong>
//               Rating: {ratingsAverage} ({ratingsQuantity}{" "}
//               {ratingsQuantity === 1 ? "review" : "reviews"})
//             </strong>
//           </Typography>
//           <RatingWithStars initialValue={ratingsAverage} />
//         </>
//       )}

//       {reviews.length > 0 && (
//         <Box className={styles.reviewsSection}>
//           <strong>Reviews</strong>
//           {reviews.map((r) => (
//             <p key={r._id}>
//               <b>
//                 {r.user.name} ({r.rating})
//               </b>
//               : {r.review}
//             </p>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default SiteInfo;

// import { Box, Typography, Divider, Link, IconButton } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { useSite } from "../contexts/SiteContext";
// import RatingWithStars from "../common/RatingWithStars.jsx";
// import styles from "./SiteInfo.module.css";

// const SiteInfo = () => {
//   const { currentSite, favoriteSites } = useSite();
//   if (!currentSite) return null;

//   const {
//     name,
//     tourism,
//     amenity,
//     address = {},
//     metadata = {},
//     ratingsAverage,
//     ratingsQuantity,
//     reviews = [],
//   } = currentSite;

//   const siteType = amenity || tourism || "place of interest";
//   const fullAddress = [
//     address.street,
//     address.housenumber,
//     address.city,
//     address.postcode,
//     address.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

// // Check if current site is in favoriteSites by ID or unique key
// const isFavorited = favoriteSites?.some(
//   (site) => site._id === currentSite._id
// );

//   // Placeholder for click handler (you said you will handle it)
//   const handleFavoriteClick = () => {
//     console.log(`Favorite clicked for site: ${name}`);
//     console.log(favoriteSites);
//     console.log(currentSite?._id);
//   };

//   return (
//     <Box className={styles.siteInfoContainer}>
//       <Typography variant="h5">{name || "Unnamed Site"}</Typography>

//       {/* Favorite button below the name, aligned right */}
//       <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
//         <IconButton
//           aria-label={
//             isFavorited ? "Remove from favorites" : "Add to favorites"
//           }
//           onClick={handleFavoriteClick}
//           size="large"
//         >
//           {isFavorited ? (
//             <FavoriteIcon color="error" />
//           ) : (
//             <FavoriteBorderIcon />
//           )}
//         </IconButton>
//       </Box>

//       <Typography variant="subtitle1" color="text.secondary" gutterBottom>
//         {siteType.charAt(0).toUpperCase() + siteType.slice(1)}
//         {address.city ? ` in ${address.city}` : ""}
//         {address.country ? `, ${address.country}` : ""}
//       </Typography>

//       <Divider sx={{ mb: 2 }} />

//       {metadata.description && (
//         <Typography variant="body1">{metadata.description}</Typography>
//       )}

//       {metadata.cuisine && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Cuisine:</strong> {metadata.cuisine}
//         </Typography>
//       )}

//       {fullAddress && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Address:</strong> {fullAddress}
//         </Typography>
//       )}

//       {metadata.phone && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Phone:</strong> {metadata.phone}
//         </Typography>
//       )}

//       {metadata.email && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Email:</strong> {metadata.email}
//         </Typography>
//       )}

//       {metadata.website && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Website:</strong>{" "}
//           <Link href={metadata.website} target="_blank" rel="noopener">
//             {metadata.website}
//           </Link>
//         </Typography>
//       )}

//       {metadata.opening_hours && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Opening Hours:</strong> {metadata.opening_hours}
//         </Typography>
//       )}

//       {metadata.fee && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Fee:</strong> {metadata.fee}
//         </Typography>
//       )}

//       {metadata.wheelchair && (
//         <Typography variant="body2" color="text.secondary">
//           <strong>Wheelchair Accessible:</strong> {metadata.wheelchair}
//         </Typography>
//       )}

//       {ratingsAverage !== undefined && ratingsQuantity !== undefined && (
//         <>
//           <Typography variant="body2" color="text.secondary">
//             <strong>
//               Rating: {ratingsAverage} ({ratingsQuantity}{" "}
//               {ratingsQuantity === 1 ? "review" : "reviews"})
//             </strong>
//           </Typography>
//           <RatingWithStars initialValue={ratingsAverage} />
//         </>
//       )}

//       {reviews.length > 0 && (
//         <Box className={styles.reviewsSection}>
//           <strong>Reviews</strong>
//           {reviews.map((r) => (
//             <p key={r._id}>
//               <b>
//                 {r.user.name} ({r.rating})
//               </b>
//               : {r.review}
//             </p>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default SiteInfo;
