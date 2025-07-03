import React from "react";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import MuseumIcon from "@mui/icons-material/Museum";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import FoodBankRoundedIcon from "@mui/icons-material/FoodBankRounded";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

function SiteMarker({ type }) {
  switch (type) {
    case "restaurant":
      return <FoodBankRoundedIcon sx={{ fontSize: 30, color: "#FF4500" }} />;
    case "theatre":
      return (
        <TheaterComedyIcon sx={{ fontSize: 30, color: "rgb(11, 11, 11)" }} />
      );
    case "museum":
      return <MuseumIcon sx={{ fontSize: 30, color: "#1E90FF" }} />;
    case "gallery":
      return <HomeWorkIcon sx={{ fontSize: 30, color: "rgb(202, 0, 134)" }} />;
    case "artwork":
      return <ColorLensIcon sx={{ fontSize: 30, color: "#DAA520" }} />;
    default:
      return null;
  }
}

export default SiteMarker;

//   return (
//     <>
//       <FilterButton icon={<FoodBankOutlinedIcon />} label={"Restaurants"} />
//       <FilterButton icon={<TheaterComedyOutlinedIcon />} label={"Theatres"} />
//       <FilterButton icon={<MuseumOutlinedIcon />} label={"Meuseums"} />
//       <FilterButton icon={<ArtTrackOutlinedIcon />} label={"Galleries"} />
//       <FilterButton icon={<ColorLensOutlinedIcon />} label={"Artworks"} />
//     </>
//   );
