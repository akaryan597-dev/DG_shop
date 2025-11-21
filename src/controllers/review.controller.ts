import { Request, Response } from "express";
import ReviewModel from "../models/review.model"; // ✅ default import

// ✅ Get all reviews
export const getReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await ReviewModel.find().populate("productId");
    res.status(200).json(reviews);
  } catch (error: unknown) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

// ✅ Get review by ID
export const getReviewById = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await ReviewModel.findById(req.params.id).populate("productId");
    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.status(200).json(review);
  } catch (error: unknown) {
    res.status(500).json({ message: "Error fetching review", error });
  }
};

// ✅ Create new review
export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const newReview = new ReviewModel(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error: unknown) {
    res.status(400).json({ message: "Error creating review", error });
  }
};

// ✅ Update review
export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedReview = await ReviewModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.status(200).json(updatedReview);
  } catch (error: unknown) {
    res.status(400).json({ message: "Error updating review", error });
  }
};

// ✅ Delete review
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedReview = await ReviewModel.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error: unknown) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};

// ✅ Get reviews for a specific product
export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const reviews = await ReviewModel.find({ productId }).populate("productId");
    if (!reviews || reviews.length === 0) {
      res.status(404).json({ message: "No reviews found for this product" });
      return;
    }
    res.status(200).json(reviews);
  } catch (error: unknown) {
    res.status(500).json({ message: "Error fetching product reviews", error });
  }
};
