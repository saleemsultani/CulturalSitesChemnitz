import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useSite } from "../contexts/SiteContext";
import React from "react";
import SiteInfo from "./SiteInfo";
import { useAuth } from "../contexts/auth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";

const drawerWidth = 300;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function SideBar() {
  const theme = useTheme();
  const { isSiteOpen, setIsSiteOpen, favoriteSites, currentSite } = useSite();
  const { isLogin } = useAuth();

  function handleCloseDrawer() {
    setIsSiteOpen(false);
    console.log(isLogin);
  }

  // let isFavorited = true;
  const isFavorited = favoriteSites?.some(
    (fav) => fav?.site?._id === currentSite?._id
  );

  const handleFavoriteClick = () => {
    async function addSiteToFavorite() {
      try {
        const res = await axios.post(
          `http://localhost:8080/api/v1/favourites/add-to-favorite`,
          {
            siteId: currentSite?._id,
          },
          {
            withCredentials: true,
          }
        );

        if (res?.data?.success) {
          console.log("Site Added to favorites");
          alert("Site added to favorites");
        }
      } catch (error) {
        console.log("Error in loading Reviewd sites: ", error);
        alert("Error in adding site to favorite");
      }
    }
    if (!isLogin?.user) {
      alert("Your are not logged in!");
      return;
    } else {
      addSiteToFavorite();
    }
  };

  return (
    <React.Fragment>
      {isSiteOpen && (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              top: theme.mixins.toolbar.minHeight + 10,
            },
          }}
          variant="persistent"
          anchor="left"
          open={isSiteOpen}
        >
          <DrawerHeader
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "secondary",
            }}
          >
            <Box sx={{ marginLeft: "30px" }}>
              <Typography>Site Details</Typography>
            </Box>

            <IconButton
              aria-label={
                isFavorited ? "Remove from favorites" : "Add to favorites"
              }
              onClick={handleFavoriteClick}
              size="large"
            >
              {isFavorited ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>

            {isSiteOpen && (
              <IconButton onClick={handleCloseDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            )}
          </DrawerHeader>
          <Divider />
          {/* site info */}
          <SiteInfo />
        </Drawer>
      )}
    </React.Fragment>
  );
}

export default SideBar;
