import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";
import { useAuth } from "../contexts/auth";
import SearchSiteBox from "./SearchSiteBox";

function Header() {
  const [isMenuOpen, setIsMenueOpen] = useState(false);
  const { isLogin } = useAuth();

  const handleProfileMenuOpen = () => {
    setIsMenueOpen(true);
  };

  const handleProfileMenuClose = () => {
    setIsMenueOpen(false);
  };

  return (
    <AppBar>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap component="div">
          Cultural Sites Chemnitz
        </Typography>

        {location.pathname === "/home" && <SearchSiteBox />}

        {/* Right: Profile Icon */}
        <Box>
          <IconButton onClick={handleProfileMenuOpen} color="inherit">
            {isLogin?.user?.photo ? (
              <Avatar src={isLogin?.user.photo} />
            ) : (
              <AccountCircle fontSize="large" />
            )}
          </IconButton>
        </Box>
      </Toolbar>
      <Menu
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleProfileMenuClose}
      >
        {isLogin?.user ? (
          <Box>
            <MenuItem onClick={handleProfileMenuClose}>Dashboard</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
          </Box>
        ) : (
          <MenuItem onClick={handleProfileMenuClose}>Login</MenuItem>
        )}
      </Menu>
    </AppBar>
  );
}

export default Header;
