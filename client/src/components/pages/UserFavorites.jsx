import { useSite } from "../contexts/SiteContext";
import { Typography, Paper, Link, IconButton, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import styles from "./UserFavorites.module.css";
import { useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);

function UserFavorites() {
  const { favoriteSites, setCurrentSite, setIsSiteOpen } = useSite();
  const navigate = useNavigate();

  const handleRemoveFavorite = (fav) => {
    async function removeFavorite() {
      try {
        const res = await axios.delete(
          `http://localhost:8080/api/v1/favourites/delete-favorite/${fav?.site?._id}`,
          { withCredentials: true }
        );
        if (res?.data?.success) {
          alert(`${fav?.site?.name} removed from favorites`);
        }
      } catch (error) {
        alert("Error in removing favorite");
        console.error(error);
      }
    }

    const confirm = window.confirm(`Remove ${fav?.site?.name} from favorites?`);
    if (confirm) {
      removeFavorite();
    }
  };

  return (
    <Box className={styles.favBox}>
      <Typography variant="h5" gutterBottom align="center">
        Favorite Sites
      </Typography>
      {favoriteSites?.length > 0 ? (
        favoriteSites.map((fav) => (
          <Paper key={fav._id} className={styles.paper}>
            <Link
              underline="hover"
              variant="h6"
              className={styles.link}
              onClick={() => {
                setCurrentSite(fav?.site);
                navigate("/home");
                setIsSiteOpen(true);
              }}
            >
              {fav?.site?.name} ({fav?.site?.tourism || fav?.site?.amenity})
            </Link>
            {fav?.site?.address && (
              <Typography variant="body2" color="textSecondary">
                {fav.site.address?.street}, {fav.site.address?.city}
              </Typography>
            )}
            <Typography variant="caption" color="textSecondary">
              added {dayjs(fav?.createdAt).fromNow()}
            </Typography>
            <IconButton
              onClick={() => handleRemoveFavorite(fav)}
              color="error"
              className={styles.iconButton}
            >
              <FavoriteIcon />
            </IconButton>
          </Paper>
        ))
      ) : (
        <Typography align="center">No favorite sites yet.</Typography>
      )}
    </Box>
  );
}

export default UserFavorites;
