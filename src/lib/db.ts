import mongoose from "mongoose";

export async function connectToDB() {
  if (mongoose.connection.readyState) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}