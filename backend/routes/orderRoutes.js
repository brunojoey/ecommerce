import express from 'express';
const router = express.Router();

import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } from '../controllers/orderController.js';
import { protect } from "../middleware/authMiddleware.js";

router.route('/').post(protect, addOrderItems);
router.route('/my-orders').get(protect, getMyOrders);

// ID ROUTES
// Must be at the bottom, otherwise other routes would look at it like id's
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router;
