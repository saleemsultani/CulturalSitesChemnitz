import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Layout from "../Layout/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleActivate() {
    try {
      const res = await axios.put(
        "http://localhost:8080/api/v1/user/reactive-user",
        { email, password }
      );

      if (res.data.success) {
        alert("Account activated Successfully");
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const agree = window.confirm(
          "Your account is already active. Do you want to Login?"
        );
        if (agree) {
          navigate("/login");
        }
      } else {
        console.log("error in Activating", error);
        alert(error.response?.data?.message || "Activating failed");
      }
    }
  }

  return (
    <Layout title="Reactive User">
      <Box className={styles.loginFormContainer}>
        <Typography variant="h3">Activate Account</Typography>
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
          <Button onClick={handleActivate} variant="contained">
            activate
          </Button>
          <Button
            onClick={() => {
              navigate("/home");
            }}
            variant="outlined"
          >
            cancel
          </Button>
          <Box className={styles.registerButtonContainer}>
            create New Account❓ 👉
            <Button onClick={() => navigate("/signup")}>Register</Button>
          </Box>
        </form>
      </Box>
    </Layout>
  );
};

export default Login;
