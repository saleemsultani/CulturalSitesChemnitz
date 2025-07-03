// import { Button } from "@mui/material";

// function FilterButton({ label, icon, selected, onClick }) {
//   return (
//     <Button
//       startIcon={icon}
//       onClick={onClick}
//       sx={{
//         // backgroundColor: "#f9f9f9",
//         backgroundColor: selected ? "rgb(158, 154, 154)" : "#f9f9f9",
//         color: "rgb(0, 0, 0)",
//         padding: "5px",
//         borderRadius: "10px",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         fontWeight: 500,
//         textTransform: "none",
//         boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
//       }}
//     >
//       {label}
//     </Button>
//   );
// }

// export default FilterButton;

import { Button } from "@mui/material";

function FilterButton({ label, icon, selected, onClick }) {
  return (
    <Button
      startIcon={icon}
      onClick={onClick}
      sx={{
        backgroundColor: selected ? "rgb(158, 154, 154)" : "#f9f9f9",
        color: "rgb(0, 0, 0)",
        px: { xs: 1, sm: 2 },
        py: { xs: 0.5, sm: 1 },
        borderRadius: "10px",
        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
        fontWeight: 500,
        textTransform: "none",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
        minWidth: { xs: "auto", sm: "120px" },
      }}
    >
      {label}
    </Button>
  );
}

export default FilterButton;
