import express from 'express';
const router = express.Router();
import { createProduct, getProductsByCategory, getImage, getProductById } from '../controllers/productController.js';




router.route('/create').post(createProduct);
router.route('/getProductsByCategory/:categoryId').get(getProductsByCategory);
router.route('/getImage/:productId').get(getImage);
router.route('/:productId').get(getProductById);

export default router;