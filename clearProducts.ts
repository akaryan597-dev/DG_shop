import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function clear() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("❌ MONGODB_URI not found in .env file");
    }

    await mongoose.connect(uri);

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("❌ Database connection not established");
    }

    await db.collection("products").deleteMany({});
    console.log("✅ Products cleared successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error clearing products:", error);
  }
}

clear();
