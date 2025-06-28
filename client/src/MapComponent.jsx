import { useEffect, useState } from "react";
const GoogleMapAPIKey = "AIzaSyA5da3XitVIhtsu6J9GG-bbib9L3VIwUnA";
import axios from "axios";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
//   MapCameraChangedEvent,
import MarkerMaker from "./MarkerMaker";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import TheaterComedyOutlinedIcon from "@mui/icons-material/TheaterComedyOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import MuseumOutlinedIcon from "@mui/icons-material/MuseumOutlined";
import ArtTrackOutlinedIcon from "@mui/icons-material/ArtTrackOutlined";
import FilterButton from "./components/FilterButton";

// <FilterButton icon={<FoodBankOutlinedIcon />} label={"Restaurants"} />
//       <FilterButton icon={<TheaterComedyOutlinedIcon />} label={"Theatres"} />
//       <FilterButton icon={<MuseumOutlinedIcon />} label={"Meuseums"} />
//       <FilterButton icon={<ArtTrackOutlinedIcon />} label={"Galleries"} />
//       <FilterButton icon={<ColorLensOutlinedIcon />} label={"Artworks"} />
const filters = [
  { label: "Restaurants", icon: <FoodBankOutlinedIcon /> },
  { label: "Theatres", icon: <TheaterComedyOutlinedIcon /> },
  { label: "Artworks", icon: <ColorLensOutlinedIcon /> },
  { label: "Meuseums", icon: <MuseumOutlinedIcon /> },
  { label: "Galleries", icon: <ArtTrackOutlinedIcon /> },
];

function MapComponent({ handleDrawerOpen }) {
  const [sites, setSites] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const loadMap = async () => {
      const res = await axios.get(
        `http://127.0.0.1:8080/api/v1/sites/get-all-restaurants`
      );
      setSites(res.data.restaurants);
    };

    loadMap();
  }, []);

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
          <MarkerMaker sites={sites} handleDrawerOpen={handleDrawerOpen} />
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
        {/* <FilterButton icon={<FoodBankOutlinedIcon />} label={"Restaurants"} />
        <FilterButton icon={<TheaterComedyOutlinedIcon />} label={"Theatres"} />
        <FilterButton icon={<MuseumOutlinedIcon />} label={"Meuseums"} />
        <FilterButton icon={<ArtTrackOutlinedIcon />} label={"Galleries"} />
        <FilterButton icon={<ColorLensOutlinedIcon />} label={"Artworks"} /> */}

        {filters.map((filter) => (
          <FilterButton
            key={filter.label}
            label={filter.label}
            icon={filter.icon}
            selected={selectedFilter === filter.label}
            onClick={() => setSelectedFilter(filter.label)}
          />
        ))}

        {/* <Button
          // variant="h6"
          sx={{
            backgroundColor: "#f9f9f9",
            color: "rgb(0, 0, 0)",
            padding: "5px",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            // justifyItems: "center",
            alignItems: "center",
            gap: 0.5,
            fontWeight: 500,
            textTransform: "none",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          <ArtTrackOutlinedIcon
            sx={{ fontWeight: 400, fontSize: "22px", color: "rgb(0, 0, 0) " }}
          />
          Galleries
        </Button> */}
      </Box>
    </Box>
  );
}

export default MapComponent;
