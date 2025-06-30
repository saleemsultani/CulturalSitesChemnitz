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
  const { isSiteOpen, setIsSiteOpen } = useSite();
  const { isLogin } = useAuth();

  function handleCloseDrawer() {
    setIsSiteOpen(false);
    console.log(isLogin);
  }
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

            {isSiteOpen && (
              <IconButton onClick={handleCloseDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            )}
          </DrawerHeader>
          <Divider />
          {/* site info */}
          <SiteInfo />
          {/* <Box>
            <Typography component={"h6"}>Site information</Typography>
            <Typography component={"p"}>
              {`${currentSite?.metadata?.name || "This"} is ${
                currentSite?.amenity ||
                currentSite?.tourism ||
                "an attractive site"
              } in ${currentSite?.address?.city || "this location"}`}
            </Typography>
          </Box> */}
        </Drawer>
      )}
    </React.Fragment>
  );
}

export default SideBar;
