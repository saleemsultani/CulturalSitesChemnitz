import React, { useState, useRef, useCallback } from "react";
import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import FoodBankRoundedIcon from "@mui/icons-material/FoodBankRounded";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import { Marker } from "@googlemaps/markerclusterer";
import SiteMarker from "./SiteMarker";
import { useEffect } from "react";
import axios from "axios";
import { useSite } from "../contexts/SiteContext";

function MarkerMaker() {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);
  const { setCurrentSite, setIsSiteOpen, sites } = useSite();

  const handleClick = useCallback(
    (ev) => {
      if (!map) return;
      if (!ev.latLng) return;

      map.panTo(ev.latLng); //
      console.log("i am clicked");
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

  async function fetchReviewsOfCurrentSite(id) {
    console.log("id:", id);
    console.log("typeof id:", typeof id);
    console.log(
      "id === '685582e679ee6259dcf61aac':",
      id === "685582e679ee6259dcf61aac"
    );

    const res = await axios.get(
      `http://127.0.0.1:8080/api/v1/reviews/get-site-reviews/${id}`
    );
    if (res?.data?.success) {
      setCurrentSite((curr) => ({
        ...curr,
        reviews: res.data.reviews,
      }));
    }
  }

  return (
    <React.Fragment>
      {Array.isArray(sites) &&
        sites.map((site) => (
          <AdvancedMarker
            key={site.id}
            position={{
              lng: site.geometry.coordinates[0],
              lat: site.geometry.coordinates[1],
            }}
            clickable={true}
            onClick={(ev) => {
              setCurrentSite(site);
              fetchReviewsOfCurrentSite(site._id);
              setIsSiteOpen(true);
              handleClick(ev);
            }}
            ref={(marker) => setMarkerRef(marker, "Restaurant")}
          >
            <SiteMarker type={site.amenity || site.tourism} />
          </AdvancedMarker>
        ))}
    </React.Fragment>
  );
}

export default MarkerMaker;
