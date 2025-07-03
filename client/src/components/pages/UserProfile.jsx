import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { useAuth } from "../contexts/auth";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { isLogin, setIsLogin } = useAuth();
  const navigate = useNavigate();
  const user = isLogin?.user;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "********",
  });

  const [isEditingPassword, setIsEditingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "********",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordEditToggle = () => {
    setIsEditingPassword((prev) => !prev);
  };

  const handlePasswordSave = async () => {
    setIsEditingPassword(false);
    const res = await axios.put(
      `http://localhost:8080/api/v1/user/change-password`,
      {
        newPassword: formData.password,
      },
      {
        withCredentials: true,
      }
    );

    if (res?.data?.success) {
      setIsLogin((curr) => ({
        ...curr,
        token: res.data.token,
      }));
    } else {
      console.log("Error in Changing password");
    }
  };

  const handleLogout = async () => {
    const res = await axios.post(
      `http://localhost:8080/api/v1/user/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log(res);
    if (res?.data?.success) {
      setIsLogin((curr) => ({
        ...curr,
        user: null,
        token: "",
      }));
      navigate("/home");
    } else {
      console.log("Something went wrong while logging out!");
    }
  };

  const handleDeleteAccount = () => {
    async function deleteAccount() {
      try {
        const res = await axios.put(
          `http://localhost:8080/api/v1/user/delete-user`,
          {},
          { withCredentials: true }
        );

        // if the user is deleted. Log him out
        if (res.data.success) {
          handleLogout();
        }
      } catch (error) {
        console.log(error);
      }
    }
    const agree = confirm("Delete your account🥺!");
    if (agree) {
      deleteAccount();
    }
  };

  return (
    <Layout title={"User - profile"}>
      <Box
        component={Paper}
        sx={{
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
          margin: "5% 15% 15% 15%",
          padding: "5%",
        }}
      >
        <Typography variant="h5">Profile</Typography>

        <TextField
          label="Name"
          name="name"
          value={formData.name}
          fullWidth
          disabled
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          fullWidth
          disabled
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          disabled={!isEditingPassword}
        />

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={handlePasswordEditToggle}>
            {isEditingPassword ? "Cancel" : "Change Password"}
          </Button>
          {isEditingPassword && (
            <Button variant="contained" onClick={handlePasswordSave}>
              Save
            </Button>
          )}
        </Stack>

        <Stack direction="row" spacing={2} mt={3}>
          <Button variant="outlined" color="warning" onClick={handleLogout}>
            Logout
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </Stack>
      </Box>
    </Layout>
  );
}
