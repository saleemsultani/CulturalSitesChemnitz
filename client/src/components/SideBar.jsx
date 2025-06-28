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
import ChevronRightIcon from "@mui/icons-material/ChevronLeft";

import React from "react";

const drawerWidth = 300;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function SideBar({ handleDrawerClose, open, handleDrawerOpen }) {
  const theme = useTheme();
  return (
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
      open={open}
    >
      <DrawerHeader
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "secondary",
        }}
      >
        <Box sx={{ marginLeft: "30px" }}>
          <Typography>Menue</Typography>
        </Box>

        {open ? (
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleDrawerOpen}>
            <ChevronRightIcon />
          </IconButton>
        )}
        {/* <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton> */}
      </DrawerHeader>
      <Divider />
    </Drawer>
  );
}

export default SideBar;
