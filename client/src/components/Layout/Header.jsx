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
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useAuth } from "../contexts/auth";
import SearchSiteBox from "./SearchSiteBox";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenueOpen] = useState(false);
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  function handleClick(path) {
    setIsMenueOpen(false);
    navigate(path);
  }

  return (
    <AppBar>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          onClick={() => {
            navigate("/home");
          }}
        >
          Cultural Sites Chemnitz
        </Typography>

        {location.pathname === "/home" && <SearchSiteBox />}

        <Box>
          <IconButton onClick={() => setIsMenueOpen(true)} color="inherit">
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
        onClose={() => setIsMenueOpen(false)}
      >
        {isLogin?.user ? (
          <Box>
            <MenuItem
              onClick={() => {
                handleClick("/dashboard");
              }}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClick("/profile");
              }}
            >
              Profile
            </MenuItem>
          </Box>
        ) : (
          <MenuItem
            onClick={() => {
              handleClick("/login");
            }}
          >
            Login
          </MenuItem>
        )}
      </Menu>
    </AppBar>
  );
}

export default Header;
