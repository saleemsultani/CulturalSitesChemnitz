import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useAuth } from "../contexts/auth";
import Layout from "../Layout/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogin } = useAuth();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsLogin((curr) => ({
          ...curr,
          token: res.data.token,
          user: res.data.user,
        }));
        // navigate to home page
        navigate("/home");
      }
    } catch (error) {
      console.log("error in login method", error);
    }
  }

  return (
    <Layout title="User - Login">
      <Box className={styles.loginFormContainer}>
        <Typography variant="h3">Login</Typography>
        <form className={styles.loginForm}>
          <TextField
            id="outlined-password-input"
            label="Email"
            type="text"
            autoComplete="current-password"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} variant="contained">
            Login
          </Button>
          <Box className={styles.registerButtonContainer}>
            new here❓ 👉
            <Button onClick={() => navigate("/signup")}>Register</Button>
          </Box>
        </form>
      </Box>
    </Layout>
  );
};

export default Login;
