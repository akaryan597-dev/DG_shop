
import { Request, Response } from 'express';
import { ReviewModel } from '../models/review.model';

// FIX: Add explicit Request and Response types from express to the controller method.
export const getReviews = async (req: Request, res: Response) => {
    try {
        const limit = Number(req.query.limit) || 4;
        const reviews = await ReviewModel.find().sort({ date: -1 }).limit(limit);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};

// FIX: Add explicit Request and Response types from express to the controller method.
export const getProductReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await ReviewModel.find({ productId: Number(req.params.productId) });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product reviews', error });
    }
};