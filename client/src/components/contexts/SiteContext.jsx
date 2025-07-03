// import axios from "axios";
// import { useState, useContext, createContext, useEffect } from "react";

// const siteContext = createContext();
// const SiteProvider = ({ children }) => {
//   const [currentSite, setCurrentSite] = useState(null);
//   const [isSiteOpen, setIsSiteOpen] = useState(false);
//   const [sites, setSites] = useState([]);
//   const [filteredCategory, setFilteredCategory] = useState("sites");
//   // const { isLogin } = useAuth();

//   const [favoriteSites, setFavoriteSites] = useState();
//   const [userReviews, setUserReviews] = useState();

//   useEffect(function () {
//     async function loadFavoriteSites() {
//       try {
//         const res = await axios.get(
//           `http://localhost:8080/api/v1/favourites/get-all-favorites`,

//           {
//             withCredentials: true,
//           }
//         );

//         if (res?.data?.success) {
//           console.log("favorite sites fetched successfully");
//           setFavoriteSites(() => res.data?.favorites);
//         }
//       } catch (error) {
//         console.log("Error in loading favorite sites: ", error);
//       }
//     }

//     loadFavoriteSites();
//     console.log("favorite sites after load:", favoriteSites);
//   }, []);

//   useEffect(function () {
//     async function loadUserReviews() {
//       try {
//         const res = await axios.get(
//           `http://localhost:8080/api/v1/reviews/get-user-reviews`,

//           {
//             withCredentials: true,
//           }
//         );

//         if (res?.data?.success) {
//           console.log("User related Reviews fetched successfully");
//           setUserReviews(() => res.data?.reviews);
//         }
//       } catch (error) {
//         console.log("Error in loading Reviewd sites: ", error);
//       }
//     }

//     loadUserReviews();
//   }, []);

//   useEffect(
//     function () {
//       const getSites = async () => {
//         const res = await axios.get(
//           `http://127.0.0.1:8080/api/v1/sites/get-all-${filteredCategory}`
//         );

//         setSites(res.data.sites);
//       };
//       getSites();
//     },
//     [filteredCategory, setSites]
//   );

//   return (
//     <siteContext.Provider
//       value={{
//         currentSite,
//         setCurrentSite,
//         isSiteOpen,
//         setIsSiteOpen,
//         sites,
//         setSites,
//         filteredCategory,
//         setFilteredCategory,
//         favoriteSites,
//         setFavoriteSites,
//         userReviews,
//         setUserReviews,
//       }}
//     >
//       {children}
//     </siteContext.Provider>
//   );
// };

// // custom hook
// const useSite = () => useContext(siteContext);

// export { useSite, SiteProvider };

import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./auth";

const siteContext = createContext();

const SiteProvider = ({ children }) => {
  const [currentSite, setCurrentSite] = useState(null);
  const [isSiteOpen, setIsSiteOpen] = useState(false);
  const [sites, setSites] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("sites");

  const [favoriteSites, setFavoriteSites] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  const { isLogin, loading } = useAuth();

  // public: get sites by category (no login required)
  useEffect(() => {
    const getSites = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8080/api/v1/sites/get-all-${filteredCategory}`
        );
        setSites(res.data?.sites || []);
      } catch (err) {
        console.error("Error loading sites:", err);
      }
    };
    getSites();
  }, [filteredCategory]);

  // private: load favorites and reviews after login check
  useEffect(() => {
    if (loading || !isLogin.user) return;

    async function loadUserData() {
      try {
        const [favoritesRes, reviewsRes] = await Promise.all([
          axios.get(
            "http://localhost:8080/api/v1/favourites/get-all-favorites",
            {
              withCredentials: true,
            }
          ),
          axios.get("http://localhost:8080/api/v1/reviews/get-user-reviews", {
            withCredentials: true,
          }),
        ]);

        if (favoritesRes.data.success) {
          setFavoriteSites(favoritesRes.data.favorites || []);
        }
        if (reviewsRes.data.success) {
          setUserReviews(reviewsRes.data.reviews || []);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    loadUserData();
  }, [isLogin.user, loading]);

  return (
    <siteContext.Provider
      value={{
        currentSite,
        setCurrentSite,
        isSiteOpen,
        setIsSiteOpen,
        sites,
        setSites,
        filteredCategory,
        setFilteredCategory,
        favoriteSites,
        setFavoriteSites,
        userReviews,
        setUserReviews,
      }}
    >
      {children}
    </siteContext.Provider>
  );
};

const useSite = () => useContext(siteContext);

export { useSite, SiteProvider };
