import express from 'express';
const router = express.Router();
import { addOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';



router.route('/').post(protect, addOrder);



export default router;