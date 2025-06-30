import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.jsx";
// import { useAuth } from "../../contexts/auth.jsx";

export default function RedirectIfLoggedIn({ children }) {
  const { isLogin } = useAuth();
  console.log("this is isLogin.usr inside RedirectIfLoggedIn: ", isLogin?.user);

  return isLogin?.user ? <Navigate to="/home" replace /> : children;
}
