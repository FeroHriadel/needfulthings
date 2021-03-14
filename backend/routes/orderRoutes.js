import express from 'express';
const router = express.Router();
import { addOrder, getOrderById, updateOrder, getOrders, deleteOrder, getOrderByUserId } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

//CHECK IF ROUTES WORK IN THIS ORDER!

router.route('/').post(protect, addOrder);
router.route('/getOrders').get(protect, admin, getOrders);
router.route('/update/:orderId').put(protect, admin, updateOrder);
router.route('/delete/:orderId').delete(protect, admin, deleteOrder);
router.route('/:orderId').get(protect, getOrderById);
router.route('/getOrderByUserId/:userId').get(protect, admin, getOrderByUserId);



export default router;