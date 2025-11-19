import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true, unique: true }, // ✅ name field unique
  category: { type: String, required: true },
  brand: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  tags: [{ type: String }],
  bestseller: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
});

export const ProductModel = mongoose.model("Product", ProductSchema);
