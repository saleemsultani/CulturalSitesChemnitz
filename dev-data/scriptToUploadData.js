import dotenv from "dotenv";
import mongoose from "mongoose";
import siteModel from "../modals/siteModel.js";
import connectDB from "../config/connectDB.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv
dotenv.config({ path: path.resolve(__dirname, "../.env") });
// connect to mongoDB before uploading data
connectDB();

// export default
async function uploadData() {
  try {
    // Fetch Chemnitz data from file
    const sites = JSON.parse(
      fs.readFileSync(`${__dirname}/Chemnitz.geojson`, "utf-8")
    );

    const siteFeatures = sites.features;
    // map through features
    const filteredSites = siteFeatures.map((site) => {
      let newSite = {};
      newSite.geometry = site.geometry;
      newSite.id = site.id;
      newSite.address = {};
      newSite.metadata = {};

      // map through key value pairs of properties of feature
      Object.entries(site.properties).map(([key, value]) => {
        switch (key) {
          case "@id":
            break;
          case "@geometry":
            break;
          case "name":
            newSite["name"] = value;
            break;
          case "amenity":
            newSite["amenity"] = value;
            break;
          case "tourism":
            newSite["tourism"] = value;
            break;
          case "addr:country":
            newSite.address["country"] = value;
            break;
          case "addr:city":
            newSite.address["city"] = value;
            break;
          case "addr:postcode":
            newSite.address["postcode"] = value;
            break;
          case "addr:street":
            newSite.address["street"] = value;
            break;
          case "addr:housenumber":
            newSite.address["housenumber"] = value;
            break;

          default:
            newSite.metadata[key] = value;
            break;
        }
      });

      return newSite;
    });

    const res = await siteModel.create(filteredSites);
    if (res) console.log("your data has been successfully uploaded");

    // create a text index
    await siteModel.collection.createIndex(
      { name: "text", amenity: "text", tourism: "text" },
      { default_language: "german" }
    );
  } catch (error) {
    console.log("error in uploadin Data", error);
  }
}

uploadData();
