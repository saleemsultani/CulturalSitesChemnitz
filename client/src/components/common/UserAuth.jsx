import React from "react";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuth } from "../contexts/auth";

const UserAuth = () => {
  const { isLogin } = useAuth();

  return isLogin.user ? <Outlet /> : <Spinner />;
};

export default UserAuth;
