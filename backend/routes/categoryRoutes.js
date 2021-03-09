import express from 'express';
const router = express.Router();
import { createCategory, getCategories, getImage, getCategoryById, updateCategory } from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';



router.route('/').get(getCategories);
router.route('/:categoryId').get(getCategoryById, protect, admin);
router.route('/getImage/:categoryId').get(getImage);
router.route('/create').post(createCategory, protect, admin);
router.route('/update/:categoryId').post(updateCategory, protect, admin);



export default router;