import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductModel from "./models/product.model";
import CategoryModel from "./models/category.model";

dotenv.config();

const MONGO_URI: string = process.env.MONGODB_URI || "";

async function seedDatabase(): Promise<void> {
  try {
    if (!MONGO_URI) {
      throw new Error("❌ MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding");

    // Clear old categories
    await CategoryModel.deleteMany({});
    console.log("🗑️ Old categories cleared");

    // Categories aligned with frontend icons + names
    const categories: { name: string; icon: string }[] = [
      { name: "Cosmetics", icon: "CosmeticIcon" },
      { name: "Live Plants/Trees", icon: "PlantIcon" },
      { name: "Fruits", icon: "AppleIcon" },
      { name: "Vegetables", icon: "VegetablesIcon" },
      { name: "Groceries", icon: "GroceriesIcon" },
      { name: "Household", icon: "HouseholdIcon" },
      { name: "Non-Veg (Desi & Kadaknath)", icon: "MeatIcon" },
      { name: "Kids Products", icon: "BabyIcon" },
      { name: "Electrical Appliances", icon: "AppliancesIcon" },
      { name: "Luxury", icon: "LuxuryIcon" },
    ];

    await CategoryModel.insertMany(categories);
    console.log("✅ Categories seeded successfully");

    // Clear old products
    await ProductModel.deleteMany({});
    console.log("🗑️ Old products cleared");

    // Products aligned with above categories
    const products: {
      name: string;
      category: string;
      brand: string;
      price: number;
      image: string;
      description: string;
      tags: string[];
      bestseller?: boolean;
      rating: number;
      reviews: number;
    }[] = [
      {
        name: "Organic Tomatoes",
        category: "Vegetables",
        brand: "DG Fresh",
        price: 35,
        image: "https://picsum.photos/400/400?random=1",
        description: "Fresh organic tomatoes from Patna farms.",
        tags: ["organic"],
        bestseller: true,
        rating: 4.5,
        reviews: 12,
      },
      {
        name: "Basmati Rice 5kg",
        category: "Groceries",
        brand: "DG Essentials",
        price: 420,
        image: "https://picsum.photos/400/400?random=2",
        description: "Premium long grain basmati rice.",
        tags: ["staple"],
        rating: 4.4,
        reviews: 15,
      },
      {
        name: "Herbal Face Wash",
        category: "Cosmetics",
        brand: "DG Care",
        price: 160,
        image: "https://picsum.photos/400/400?random=3",
        description: "Refreshing herbal face wash.",
        tags: ["skincare"],
        rating: 4.3,
        reviews: 10,
      },
      {
        name: "Detergent Powder 2kg",
        category: "Household",
        brand: "DG Clean",
        price: 200,
        image: "https://picsum.photos/400/400?random=4",
        description: "Powerful detergent powder.",
        tags: ["cleaning"],
        rating: 4.2,
        reviews: 8,
      },
      {
        name: "Kadaknath Chicken",
        category: "Non-Veg (Desi & Kadaknath)",
        brand: "DG Meat",
        price: 480,
        image: "https://picsum.photos/400/400?random=5",
        description: "Authentic Kadaknath chicken.",
        tags: ["protein"],
        bestseller: true,
        rating: 4.6,
        reviews: 20,
      },
      {
        name: "Baby Diapers Pack",
        category: "Kids Products",
        brand: "DG Baby",
        price: 450,
        image: "https://picsum.photos/400/400?random=6",
        description: "Soft and absorbent baby diapers.",
        tags: ["babycare"],
        rating: 4.5,
        reviews: 14,
      },
      {
        name: "Mixer Grinder",
        category: "Electrical Appliances",
        brand: "DG Appliances",
        price: 2200,
        image: "https://picsum.photos/400/400?random=7",
        description: "Durable mixer grinder.",
        tags: ["kitchen"],
        rating: 4.3,
        reviews: 9,
      },
      {
        name: "Tulsi Plant",
        category: "Live Plants/Trees",
        brand: "DG Green",
        price: 70,
        image: "https://picsum.photos/400/400?random=8",
        description: "Sacred Tulsi plant.",
        tags: ["eco"],
        rating: 4.6,
        reviews: 11,
      },
      {
        name: "Designer Perfume",
        category: "Luxury",
        brand: "DG Luxury",
        price: 1800,
        image: "https://picsum.photos/400/400?random=9",
        description: "Elegant designer perfume.",
        tags: ["fragrance"],
        bestseller: true,
        rating: 4.7,
        reviews: 18,
      },
    ];

    await ProductModel.insertMany(products);
    console.log("✅ Products seeded successfully");

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

// Run seeding
seedDatabase().catch((err) => {
  console.error("❌ Unhandled seeding error:", err);
  process.exit(1);
});
