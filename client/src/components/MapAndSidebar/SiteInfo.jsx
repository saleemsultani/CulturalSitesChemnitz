import { Box, Typography, Divider, Link, Rating } from "@mui/material";
import { useSite } from "../contexts/SiteContext";
import RatingWithStars from "../common/RatingWithStars";

const SiteInfo = () => {
  const { currentSite } = useSite();
  if (currentSite === null) return;
  console.log("this is current site: ", currentSite);

  const siteType =
    currentSite?.amenity || currentSite?.tourism || "a place of interest";
  const siteName = currentSite?.name || "This site";
  const fullAddress = `${currentSite?.address?.street || ""}, ${
    currentSite?.address?.city || ""
  }, ${currentSite?.address?.country || ""} ${
    currentSite?.address?.postcode || ""
  }`;

  let fallbackDescription = "";

  switch (siteType) {
    case "restaurant":
      fallbackDescription = `This restaurant in Chemnitz offers a delightful culinary experience that reflects the local flavor and ambiance.`;
      break;
    case "artwork":
      fallbackDescription = `This public artwork in Chemnitz adds a unique artistic touch to the surroundings, inviting passersby to pause and reflect.`;
      break;
    case "gallery":
      fallbackDescription = `This gallery in Chemnitz showcases inspiring pieces from local and international artists, making it a hub for creative expression.`;
      break;
    case "theatre":
      fallbackDescription = `This theatre in Chemnitz hosts captivating performances and cultural events, enriching the local arts scene.`;
      break;
    case "museum":
      fallbackDescription = `This museum in Chemnitz offers a journey through history, culture, and knowledge for curious minds.`;
      break;
    default:
      fallbackDescription = `This ${siteType} is located in Chemnitz, offering a unique experience to visitors.`;
  }

  return (
    <Box
      p={2}
      sx={{
        display: "flex",
        gap: 1,
        flexDirection: "column",
        overflowY: "scroll",
        width: "90%",
        height: "400px",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Typography variant="h5">{siteName}</Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {siteType.charAt(0).toUpperCase() + siteType.slice(1)} in{" "}
        {currentSite?.address?.city || "Chemnitz City"},
        {currentSite?.address?.country || ""}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="body">
        {currentSite?.metadata?.description || fallbackDescription}
      </Typography>
      {currentSite?.metadata?.cuisine && (
        <Typography variant="body2" color="text.secondary">
          <strong>Cuisine:</strong> {currentSite?.metadata?.cuisine}
        </Typography>
      )}
      <Typography variant="body2" color="text.secondary">
        <strong>Address:</strong> {fullAddress}
      </Typography>

      {currentSite?.metadata?.phone && (
        <Typography variant="body2" color="text.secondary">
          <strong>Phone:</strong> {currentSite?.metadata?.phone}
        </Typography>
      )}

      {currentSite?.metadata?.website && (
        <Typography variant="body2" color="text.secondary">
          <strong>Website:</strong>
          <Link
            href={currentSite?.metadata?.website}
            target="_blank"
            rel="noopener"
          >
            {currentSite?.metadata?.website}
          </Link>
        </Typography>
      )}

      {currentSite?.metadata?.opening_hours && (
        <Typography variant="body2" color="text.secondary">
          <strong>Opening Hours:</strong> {currentSite?.metadata?.opening_hours}
        </Typography>
      )}
      {currentSite?.ratingsAverage !== undefined && (
        <>
          <Typography variant="body2" color="text.secondary">
            <strong>
              Rating: {currentSite?.ratingsAverage} out of (
              {currentSite?.ratingsQuantity})
            </strong>
          </Typography>
          <Rating
            name="read-only"
            precision={0.5}
            value={currentSite?.ratingsAverage}
            readOnly
          />
        </>
      )}
      <Box>
        <strong>Reviews</strong>
        {currentSite?.reviews?.map((r) => {
          return <p>{r.review}</p>;
        })}
      </Box>
    </Box>
  );
};

export default SiteInfo;
