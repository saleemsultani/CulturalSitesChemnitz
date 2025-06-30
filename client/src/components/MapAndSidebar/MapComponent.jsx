import { useState } from "react";
const GoogleMapAPIKey = "AIzaSyA5da3XitVIhtsu6J9GG-bbib9L3VIwUnA";

import { APIProvider, Map } from "@vis.gl/react-google-maps";
import MarkerMaker from "./MarkerMaker";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import TheaterComedyOutlinedIcon from "@mui/icons-material/TheaterComedyOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import MuseumOutlinedIcon from "@mui/icons-material/MuseumOutlined";
import ArtTrackOutlinedIcon from "@mui/icons-material/ArtTrackOutlined";
import FilterButton from "./FilterButton.jsx";

import { useSite } from "../contexts/SiteContext";

const filters = [
  {
    catageory: "restaurant",
    label: "Restaurants",
    icon: <FoodBankOutlinedIcon />,
  },
  {
    catageory: "theatre",
    label: "Theatres",
    icon: <TheaterComedyOutlinedIcon />,
  },
  {
    catageory: "artwork",
    label: "Artworks",
    icon: <ColorLensOutlinedIcon />,
  },
  { catageory: "museums", label: "Museums", icon: <MuseumOutlinedIcon /> },
  {
    catageory: "galleries",
    label: "Galleries",
    icon: <ArtTrackOutlinedIcon />,
  },
];

function MapComponent() {
  const { setFilteredCategory } = useSite();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <APIProvider apiKey={GoogleMapAPIKey}>
        <Map
          style={{ width: "100vw", height: "100vh" }}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          defaultZoom={13}
          defaultCenter={{ lat: 50.833005, lng: 12.920996 }}
          mapId={"e90cbdd70ae838612648a161"}
        >
          <MarkerMaker />
        </Map>
      </APIProvider>
      <Box
        sx={{
          position: "absolute",
          top: theme.mixins.toolbar.minHeight + 15,
          left: 10,
          display: "flex",
          gap: 1,
          overflowX: "auto",
        }}
      >
        {filters.map((filter) => (
          <FilterButton
            key={filter.label}
            label={filter.label}
            icon={filter.icon}
            selected={selectedFilter === filter.label}
            onClick={() => {
              setSelectedFilter(filter.label);
              setFilteredCategory(filter.label);
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default MapComponent;
