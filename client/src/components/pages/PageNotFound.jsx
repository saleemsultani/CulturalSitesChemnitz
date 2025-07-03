import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <Box sx={style}>
      <h1>PageNotFound</h1>
      <Typography>Return to home screen</Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/home");
        }}
      >
        Return
      </Button>
    </Box>
  );
};

export default PageNotFound;
