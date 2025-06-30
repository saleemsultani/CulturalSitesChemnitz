import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/connectDB.js";
import siteRoutes from "./routes/siteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

// Configure dotenv
config();
// Connyect to DB
connectDB();

// make an express app
const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

//routes
app.use("/api/v1/sites", siteRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/reviews", reviewRoutes);
// app.use("/api/v1/favourites", categoryRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 3000");
});
