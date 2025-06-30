import React from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
import { Box } from "@mui/material";
import Header from "./Header";

const Layout = ({ children, title }) => {
  return (
    <Box>
      <title>{title}</title>
      <Header />
      {children}
      {/* <Footer /> */}
    </Box>
  );
};

export default Layout;
