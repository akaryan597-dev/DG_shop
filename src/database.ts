import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// ✅ Load environment variables safely
dotenv.config({ path: path.resolve(__dirname, "../../../server/.env") });

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri || mongoUri.trim() === "") {
      throw new Error("❌ MONGODB_URI is not defined in .env file");
    }

    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
