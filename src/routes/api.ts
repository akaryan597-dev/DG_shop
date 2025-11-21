import { Router, Request, Response } from "express";
import * as directorController from "../controllers/director.controller";
import * as reviewController from "../controllers/review.controller";
// Agar aur controllers hain (product, user, order), unko bhi yahan import kar sakte ho

const router = Router();

// ✅ Director Routes
router.get("/directors", directorController.getDirectors);
router.get("/directors/:id", directorController.getDirectorById);
router.post("/directors", directorController.createDirector);
router.put("/directors/:id", directorController.updateDirector);
router.delete("/directors/:id", directorController.deleteDirector);

// ✅ Review Routes
router.get("/reviews", reviewController.getReviews);
router.get("/reviews/:id", reviewController.getReviewById);
router.post("/reviews", reviewController.createReview);
router.put("/reviews/:id", reviewController.updateReview);
router.delete("/reviews/:id", reviewController.deleteReview);

// ✅ Get reviews for a specific product
router.get(
  "/reviews/product/:productId",
  (req: Request, res: Response) => reviewController.getProductReviews(req, res)
);

export default router;
