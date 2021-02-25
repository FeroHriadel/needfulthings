import express from 'express';
const router = express.Router();
import { createProduct, getProductsByCategory, getImage } from '../controllers/productController.js';




router.route('/create').post(createProduct);
router.route('/getProductsByCategory/:categoryId').get(getProductsByCategory);
router.route('/getImage/:productId').get(getImage);

export default router;