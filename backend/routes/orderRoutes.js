import express from 'express';
const router = express.Router();
import { addOrder, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';



router.route('/').post(protect, addOrder);
router.route('/:orderId').get(protect, getOrderById);



export default router;