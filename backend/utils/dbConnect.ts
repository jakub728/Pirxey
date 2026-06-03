import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/pirxey_db");
    console.log("Local database connected!");
  } catch (error) {
    console.error("Error connecting to local database:", error);
    process.exit(1);
  }
};
