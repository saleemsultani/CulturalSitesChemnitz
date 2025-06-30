import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Signup.module.css";
import Layout from "../Layout/Layout";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   console.log("inside handleRegister");
  //   try {
  //     console.log("inside try block");
  //     console.log(name, email, password, confirmPassword);

  //     const res = await axios.post(
  //       "http://localhost:8080/api/v1/user/register-user",
  //       {
  //         name: name,
  //         email: email,
  //         password: password,
  //         passwordConfirm: confirmPassword,
  //       }
  //     );

  //     console.log("before !res.user: ", res);

  //     if (!res.data.success) {
  //       console.log("error in registering");
  //       return;
  //     }
  //     console.log(res);
  //     navigate("/login");
  //   } catch (error) {
  //     console.log("error while registering", error);
  //   }
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("inside handleRegister");

    try {
      if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        console.log("please fill all required fields");
        return;
      }
      if (password !== confirmPassword) {
        console.log(`passwords doesn't match!`);
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("passwordConfirm", confirmPassword);

      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register-user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response:", res);

      if (!res.data.success) {
        console.log("error in registering");
        return;
      }

      navigate("/login");
    } catch (error) {
      console.log("error while registering", error);
    }
  };

  return (
    <Layout title="User - Register">
      <Box className={styles.signUpFormContainer}>
        <Typography variant="h3">Register</Typography>
        <form className={styles.signUpForm} onSubmit={handleRegister}>
          <TextField
            // id="outlined-password-input"
            label="Full Name"
            type="text"
            // required
            // autoComplete="current-password"
            size="small"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            // id="outlined-password-input"
            label="Email"
            type="text"
            // required
            // autoComplete="current-password"
            size="small"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <TextField
            // id="outlined-password-input"
            label="Password"
            type="password"
            // required
            // autoComplete="current-password"
            size="small"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <TextField
            // id="outlined-password-input"
            label="Confirm Password"
            type="password"
            // required
            // autoComplete="current-password"
            size="small"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <Button
            variant="contained"
            // onClick={(e) => {
            //   handleRegister(e);
            // }}
            type="submit"
          >
            Register
          </Button>
          <Box
            variant="contained"
            onClick={() => {
              navigate("/login");
            }}
            className={styles.loginButtonContainer}
          >
            already have an account❓ 👉
            <Button>Login here</Button>
          </Box>
        </form>
      </Box>
    </Layout>
  );
};

export default Signup;
