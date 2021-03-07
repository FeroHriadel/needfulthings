import express from 'express';
const router = express.Router();
import { createCategory, getCategories, getImage } from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';



router.route('/').get(getCategories);
router.route('/getImage/:categoryId').get(getImage);
router.route('/create').post(createCategory, protect, admin);



export default router;