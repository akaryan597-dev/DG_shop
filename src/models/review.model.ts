import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    productId: { type: Number, required: true, index: true },
    author: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    image: { type: String },
    verified: { type: Boolean, default: true },
    date: { type: String, required: true },
});

export const ReviewModel = model('Review', reviewSchema);
