import express from 'express';
const router = express.Router();
import { createProduct, getProductsByCategory, getImage, getProductById, getProducts, updateProduct, deleteProduct, updateStats } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

//CHECK IF ALL ROUTES WORK IN THIS ORDER !!!!!!!!!!!!!!!!!!


router.route('/').get(getProducts);
router.route('/create').post(protect, admin, createProduct);
router.route('/:productId').post(protect, updateProduct);
router.route('/getProductsByCategory/:categoryId').get(getProductsByCategory);
router.route('/getImage/:productId').get(getImage);
router.route('/:productId').get(getProductById);
router.route('/delete/:productId').delete(protect, admin, deleteProduct);
router.route('/updateStats/:productId').put(updateStats);

export default router;