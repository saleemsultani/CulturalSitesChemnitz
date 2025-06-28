import mongoose from "mongoose";

export default async function connectDB() {
  const DB_URL = process.env.MONGO_DB_URL.replace(
    "<db_password>",
    process.env.MONGO_DB_PASSWORD
  );

  try {
    const res = await mongoose.connect(DB_URL);
    console.log(`Connected to MongoDB database ${res.connection.host}`);
  } catch (error) {
    console.log("error in connecting DB ", error);
  }
}
