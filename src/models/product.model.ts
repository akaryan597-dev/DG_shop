import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;              // ✅ frontend ke liye "name" field use karo
  category: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  tags: string[];
  bestseller: boolean;
  rating: number;
  reviews: number;
}

const ProductSchema: Schema = new Schema(
  {
    // ✅ "name" field rakho, aur unique hata do
    name: { type: String, required: true },

    category: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    bestseller: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
