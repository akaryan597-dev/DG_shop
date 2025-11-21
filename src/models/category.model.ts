import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  icon: string; // ✅ icon field added for frontend mapping
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true } // ✅ required icon field
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("Category", CategorySchema);
