import { useState, useRef, useCallback } from "react";
import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import FoodBankRoundedIcon from "@mui/icons-material/FoodBankRounded";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import { Marker } from "@googlemaps/markerclusterer";
import { useEffect } from "react";

function MarkerMaker({ sites, handleDrawerOpen }) {
  const map = useMap(); // ✅ Get the map instance from context
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);

  const handleClick = useCallback(
    (ev) => {
      if (!map) return;
      if (!ev.latLng) return;
      console.log("marker clicked:", ev.latLng.toString());

      map.panTo(ev.latLng); //
      handleDrawerOpen();
    },
    [map]
  );

  // Initialize MarkerClusterer once map is ready
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // Update cluster when markers change
  useEffect(() => {
    if (clusterer.current) {
      clusterer.current.clearMarkers();
      clusterer.current.addMarkers(Object.values(markers));
    }
  }, [markers]);

  // Manage individual marker references
  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return; // already tracked
    if (!marker && !markers[key]) return; // already removed

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {sites.map((site) => (
        <AdvancedMarker
          key={site.id}
          position={{
            lng: site.geometry.coordinates[0],
            lat: site.geometry.coordinates[1],
          }}
          clickable={true}
          onClick={handleClick}
          ref={(marker) => setMarkerRef(marker, "Restaurant")}
        >
          <FoodBankRoundedIcon sx={{ fontSize: "30px", color: "	#FF4500 " }} />
        </AdvancedMarker>
      ))}
    </>
  );
}

export default MarkerMaker;

{
  /* #8B4513
#0d5210
#776608
	#FFA500
	#FF4500
            #FFA500 */
}
