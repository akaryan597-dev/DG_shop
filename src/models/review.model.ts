import mongoose, { Document, Schema } from "mongoose";

// ✅ Define Review interface
export interface IReview extends Document {
  productId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
}

// ✅ Schema
const reviewSchema: Schema = new mongoose.Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, trim: true }
}, { timestamps: true });

// ✅ Model
const ReviewModel = mongoose.model<IReview>("Review", reviewSchema);

// ✅ Default export (so controller can use `import ReviewModel from ...`)
export default ReviewModel;
