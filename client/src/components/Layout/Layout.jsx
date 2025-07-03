import { Box } from "@mui/material";
import Header from "./Header";

const Layout = ({ children, title }) => {
  return (
    <Box>
      <title>{title}</title>
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
