import React from "react";
// import Layout from "../layout/Layout";
import landing from "../../assets/chemnitz-culture-5.jpg";
import { Box, Button, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/auth.jsx";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <Layout title={"SultaniDev - Welcome"}> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h4" marginTop={"5px"}>
          Chemnitz Culture Explorer
        </Typography>
        <Typography variant="text" component="p" sx={{ marginBottom: "10px" }}>
          Discover local treasures, explore cultural sites, and experience the
          heart of Chemnitz
        </Typography>
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            // sx={{textTransform: "none",}}
            onClick={() => {
              navigate("/home");
            }}
          >
            Explore Withouth Login
          </Button>
        </Box>
      </Box>
      <img
        src={landing}
        alt="landing image"
        style={{
          display: "block",
          margin: "10px auto",
          height: "20%",
          width: "50%",
          borderRadius: "20px",
        }}
      />
      {/* </Layout> */}
    </>
  );
};

export default Landing;
