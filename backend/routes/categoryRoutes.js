import express from 'express';
const router = express.Router();
import { createCategory, getCategories } from '../controllers/categoryController.js';



router.route('/').get(getCategories);
router.route('/create').post(createCategory);



export default router;