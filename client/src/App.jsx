import Box from "@mui/material/Box";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserAuth from "./components/common/UserAuth";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import PageNotFound from "./components/pages/PageNotFound";
import Landing from "./components/pages/Landing";
import RedirectIfLoggedIn from "./components/common/RedirectToIfLoggedIn.jsx";
import MapLayout from "./components/MapAndSidebar/MapLayout.jsx";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<MapLayout />} />
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfLoggedIn>
              <Signup />
            </RedirectIfLoggedIn>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Box>
  );
}

export default App;

{
  /* <Route path="/user" element={<UserAuth />}></Route> */
}
