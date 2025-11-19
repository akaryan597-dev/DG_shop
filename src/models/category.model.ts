import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // ✅ unique category names
  icon: { type: String }
});

export const CategoryModel = mongoose.model("Category", CategorySchema);
