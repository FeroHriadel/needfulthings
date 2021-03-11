import express from 'express';
const router = express.Router();
import { createProduct, getProductsByCategory, getImage, getProductById, getProducts, updateProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';




router.route('/').get(getProducts);
router.route('/create').post(createProduct, protect, admin);
router.route('/:productId').post(updateProduct, protect, admin);
router.route('/getProductsByCategory/:categoryId').get(getProductsByCategory);
router.route('/getImage/:productId').get(getImage);
router.route('/:productId').get(getProductById);

export default router;