import express from 'express';
const router = express.Router();
import { createCategory, getCategories, getImage } from '../controllers/categoryController.js';



router.route('/').get(getCategories);
router.route('/getImage/:categoryId').get(getImage);
router.route('/create').post(createCategory);



export default router;