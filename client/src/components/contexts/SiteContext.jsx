import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const siteContext = createContext();
const SiteProvider = ({ children }) => {
  const [currentSite, setCurrentSite] = useState(null);
  const [isSiteOpen, setIsSiteOpen] = useState(false);
  const [sites, setSites] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("sites");

  useEffect(
    function () {
      const getSites = async () => {
        const res = await axios.get(
          `http://127.0.0.1:8080/api/v1/sites/get-all-${filteredCategory}`
        );

        setSites(res.data.sites);
      };
      getSites();
    },
    [filteredCategory, setSites]
  );

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
      }}
    >
      {children}
    </siteContext.Provider>
  );
};

// custom hook
const useSite = () => useContext(siteContext);

export { useSite, SiteProvider };
