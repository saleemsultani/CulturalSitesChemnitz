import { CircularProgress, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Spinner.module.css";

export default function Spinner({ path = "login" }) {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <Box className={styles.spinnerContainer}>
      <CircularProgress />
      <Typography>{`Redirecting to you in ${count} soconds`}</Typography>
    </Box>
  );
}
