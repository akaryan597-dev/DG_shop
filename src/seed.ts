import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CategoryModel } from './models/category.model';
import { ProductModel } from './models/product.model';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || '';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding");

    // Clear old categories
    await CategoryModel.deleteMany({});
    console.log("🗑️ Old categories cleared");

    await CategoryModel.insertMany([
      { name: "Vegetables", icon: "VegetablesIcon" },
      { name: "Groceries", icon: "GroceriesIcon" },
      { name: "Cosmetics", icon: "CosmeticIcon" },
      { name: "Household", icon: "HouseholdIcon" },
      { name: "Non-Veg", icon: "MeatIcon" },
      { name: "Kids", icon: "BabyIcon" },
      { name: "Appliances", icon: "AppliancesIcon" },
      { name: "Plants", icon: "PlantIcon" },
      { name: "Luxury", icon: "LuxuryIcon" }
    ]);
    console.log("✅ Categories seeded successfully");

    // Clear old products
    await ProductModel.deleteMany({});
    console.log("🗑️ Old products cleared");

    await ProductModel.insertMany([
      {
        id: 1,
        name: "Organic Tomatoes",
        category: "Vegetables",
        brand: "DG Fresh",
        price: 35,
        image: "https://picsum.photos/400/400?random=1",
        description: "Fresh organic tomatoes from Patna farms.",
        tags: ["organic"],
        bestseller: true,
        rating: 4.5,
        reviews: 12
      },
      {
        id: 2,
        name: "Basmati Rice 5kg",
        category: "Groceries",
        brand: "DG Essentials",
        price: 420,
        image: "https://picsum.photos/400/400?random=2",
        description: "Premium long grain basmati rice.",
        tags: ["staple"],
        rating: 4.4,
        reviews: 15
      },
      {
        id: 3,
        name: "Herbal Face Wash",
        category: "Cosmetics",
        brand: "DG Care",
        price: 160,
        image: "https://picsum.photos/400/400?random=3",
        description: "Refreshing herbal face wash.",
        tags: ["skincare"],
        rating: 4.3,
        reviews: 10
      },
      {
        id: 4,
        name: "Detergent Powder 2kg",
        category: "Household",
        brand: "DG Clean",
        price: 200,
        image: "https://picsum.photos/400/400?random=4",
        description: "Powerful detergent powder.",
        tags: ["cleaning"],
        rating: 4.2,
        reviews: 8
      },
      {
        id: 5,
        name: "Kadaknath Chicken",
        category: "Non-Veg",
        brand: "DG Meat",
        price: 480,
        image: "https://picsum.photos/400/400?random=5",
        description: "Authentic Kadaknath chicken.",
        tags: ["protein"],
        bestseller: true,
        rating: 4.6,
        reviews: 20
      },
      {
        id: 6,
        name: "Baby Diapers Pack",
        category: "Kids",
        brand: "DG Baby",
        price: 450,
        image: "https://picsum.photos/400/400?random=6",
        description: "Soft and absorbent baby diapers.",
        tags: ["babycare"],
        rating: 4.5,
        reviews: 14
      },
      {
        id: 7,
        name: "Mixer Grinder",
        category: "Appliances",
        brand: "DG Appliances",
        price: 2200,
        image: "https://picsum.photos/400/400?random=7",
        description: "Durable mixer grinder.",
        tags: ["kitchen"],
        rating: 4.3,
        reviews: 9
      },
      {
        id: 8,
        name: "Tulsi Plant",
        category: "Plants",
        brand: "DG Green",
        price: 70,
        image: "https://picsum.photos/400/400?random=8",
        description: "Sacred Tulsi plant.",
        tags: ["eco"],
        rating: 4.6,
        reviews: 11
      },
      {
        id: 9,
        name: "Designer Perfume",
        category: "Luxury",
        brand: "DG Luxury",
        price: 1800,
        image: "https://picsum.photos/400/400?random=9",
        description: "Elegant designer perfume.",
        tags: ["fragrance"],
        bestseller: true,
        rating: 4.7,
        reviews: 18
      }
    ]);
    console.log("✅ Products seeded successfully");

    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  } catch (error) {
    console.error("❌ Seeding error:", error);
  }
}

seedDatabase();
