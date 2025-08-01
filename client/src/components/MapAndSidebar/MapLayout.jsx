import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MapComponent from "./MapComponent";
import Header from "../Layout/Header";
import SideBar from "./SideBar";
import Layout from "../Layout/Layout";

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

export default function MapLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <SideBar />
      <Main open={open}>
        <MapComponent />
      </Main>
    </Box>
  );
}
