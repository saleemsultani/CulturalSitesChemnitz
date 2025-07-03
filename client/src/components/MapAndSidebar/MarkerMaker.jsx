// import React, { useState, useRef, useCallback } from "react";
// import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
// import FoodBankRoundedIcon from "@mui/icons-material/FoodBankRounded";
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
// // import { Marker } from "@googlemaps/markerclusterer";
// import SiteMarker from "./SiteMarker";
// import { useEffect } from "react";
// import axios from "axios";
// import { useSite } from "../contexts/SiteContext";

// function MarkerMaker() {
//   const map = useMap();
//   const [markers, setMarkers] = useState({});
//   const clusterer = useRef(null);
//   const { setCurrentSite, setIsSiteOpen, sites } = useSite();

//   const handleClick = useCallback(
//     (ev) => {
//       if (!map) return;
//       if (!ev.latLng) return;

//       map.panTo(ev.latLng); //
//       console.log("i am clicked");
//     },
//     [map]
//   );

//   // Initialize MarkerClusterer once map is ready
//   useEffect(() => {
//     if (!map) return;
//     if (!clusterer.current) {
//       clusterer.current = new MarkerClusterer({ map });
//     }
//   }, [map]);

//   // Update cluster when markers change
//   useEffect(() => {
//     if (clusterer.current) {
//       clusterer.current.clearMarkers();
//       clusterer.current.addMarkers(Object.values(markers));
//     }
//   }, [markers]);

//   // Manage individual marker references
//   const setMarkerRef = (marker, key) => {
//     if (marker && markers[key]) return; // already tracked
//     if (!marker && !markers[key]) return; // already removed

//     setMarkers((prev) => {
//       if (marker) {
//         return { ...prev, [key]: marker };
//       } else {
//         const newMarkers = { ...prev };
//         delete newMarkers[key];
//         return newMarkers;
//       }
//     });
//   };

//   async function fetchReviewsOfCurrentSite(id) {
//     console.log("id:", id);
//     console.log("typeof id:", typeof id);
//     console.log(
//       "id === '685582e679ee6259dcf61aac':",
//       id === "685582e679ee6259dcf61aac"
//     );

//     const res = await axios.get(
//       `http://localhost:8080/api/v1/reviews/get-site-reviews/${id}`
//     );
//     if (res?.data?.success) {
//       console.log(res.data.reviews);
//       setCurrentSite((curr) => ({
//         ...curr,
//         reviews: res.data.reviews,
//       }));
//     }
//   }

//   return (
//     <React.Fragment>
//       {Array.isArray(sites) &&
//         sites.map((site) => (
//           <AdvancedMarker
//             key={site.id}
//             position={{
//               lng: site.geometry.coordinates[0],
//               lat: site.geometry.coordinates[1],
//             }}
//             clickable={true}
//             onClick={(ev) => {
//               setCurrentSite(site);
//               fetchReviewsOfCurrentSite(site._id);
//               setIsSiteOpen(true);
//               handleClick(ev);
//             }}
//             ref={(marker) => setMarkerRef(marker, "Restaurant")}
//           >
//             <SiteMarker type={site.amenity || site.tourism} />
//           </AdvancedMarker>
//         ))}
//     </React.Fragment>
//   );
// }

// export default MarkerMaker;

import React, { useState, useRef, useCallback } from "react";
import {
  AdvancedMarker,
  Pin,
  useMap,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import SiteMarker from "./SiteMarker";
import { useEffect } from "react";
import axios from "axios";
import { useSite } from "../contexts/SiteContext";

function MarkerMaker() {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);
  const { setCurrentSite, setIsSiteOpen, sites } = useSite();

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleClick = useCallback(
    (ev) => {
      if (!map || !ev.latLng) return;
      map.panTo(ev.latLng);
    },
    [map]
  );

  useEffect(() => {
    if (map && !clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    if (clusterer.current) {
      clusterer.current.clearMarkers();
      clusterer.current.addMarkers(Object.values(markers));
    }
  }, [markers]);

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) return { ...prev, [key]: marker };
      const newMarkers = { ...prev };
      delete newMarkers[key];
      return newMarkers;
    });
  };

  async function fetchReviewsOfCurrentSite(id) {
    const res = await axios.get(
      `http://localhost:8080/api/v1/reviews/get-site-reviews/${id}`
    );
    if (res?.data?.success) {
      setCurrentSite((curr) => ({
        ...curr,
        reviews: res.data.reviews,
      }));
    }
  }

  return (
    <>
      {Array.isArray(sites) &&
        sites.map((site) => (
          <AdvancedMarker
            key={site._id}
            position={{
              lng: site.geometry.coordinates[0],
              lat: site.geometry.coordinates[1],
            }}
            clickable={true}
            onClick={(ev) => {
              setCurrentSite(site);
              fetchReviewsOfCurrentSite(site._id);
              setIsSiteOpen(true);
              setSelectedMarker(site);
              handleClick(ev);
            }}
            ref={(marker) => setMarkerRef(marker, site._id)}
          >
            <SiteMarker type={site.amenity || site.tourism} />
          </AdvancedMarker>
        ))}

      {selectedMarker && (
        <InfoWindow
          position={{
            lat: selectedMarker.geometry.coordinates[1],
            lng: selectedMarker.geometry.coordinates[0],
          }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div style={{ fontSize: "14px", maxWidth: "15rem" }}>
            <strong>
              {selectedMarker.name ||
                selectedMarker?.amenity ||
                selectedMarker?.tourism}
            </strong>
            <p>lat: {selectedMarker.geometry.coordinates[1]}</p>
            <p>lng: {selectedMarker.geometry.coordinates[0]}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default MarkerMaker;
