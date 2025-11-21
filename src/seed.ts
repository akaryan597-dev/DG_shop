import dotenv from "dotenv";
import mongoose from "mongoose";
import { categories, products, reviews, directors } from "./data/seedData";

dotenv.config(); // ✅ ensures process.env is typed

const MONGO_URI: string = process.env.MONGODB_URI || "";

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected for seeding");

    // ✅ Insert seed data
    await mongoose.connection.db.collection("categories").insertMany(categories);
    await mongoose.connection.db.collection("products").insertMany(products);
    await mongoose.connection.db.collection("reviews").insertMany(reviews);
    await mongoose.connection.db.collection("directors").insertMany(directors);

    console.log("🌱 Seed data inserted successfully");
    process.exit(0); // ✅ process now properly typed
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
})();
