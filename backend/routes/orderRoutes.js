import express from 'express';
const router = express.Router();

import { addOrderItems, getOrderById } from '../controllers/orderController.js';
import { protect } from "../middleware/authMiddleware.js";

router.route('/').post(protect, addOrderItems);

// Must be at the bottom, otherwise other routes would look at it like id's
router.route('/:id').get(protect, getOrderById);

export default router;
