import express from 'express';
const router = express.Router();
import { signup, signin, getUsers, getUserById, changeUserRole } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';



router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/getUsers').get(protect, admin, getUsers);
router.route('/getUser/:userId').get(protect, admin, getUserById);
router.route('/changeUserRole/:userId').put(protect, admin, changeUserRole);



export default router;