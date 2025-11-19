import { Router } from 'express';
import * as productController from '../controllers/product.controller';
import * as categoryController from '../controllers/category.controller';
import * as reviewController from '../controllers/review.controller';
import * as directorController from '../controllers/director.controller';
import * as aiController from '../controllers/ai.controller';

const router = Router();

// Product routes
router.get('/products', productController.getProducts);
router.get('/products/bestsellers', productController.getBestsellers);
router.get('/products/related', productController.getRelatedProducts);
router.get('/products/suggestions', productController.searchSuggestions);
router.get('/products/:id', productController.getProductById);
router.post('/products/by-ids', productController.getProductsByIds);

// Other routes
router.get('/categories', categoryController.getCategories);
router.get('/reviews', reviewController.getReviews);
router.get('/reviews/:productId', reviewController.getProductReviews);
router.get('/directors', directorController.getDirectors);

// AI routes
router.post('/ai/chat', aiController.chatWithAI);
router.post('/ai/image', aiController.generateImage);

export default router;
