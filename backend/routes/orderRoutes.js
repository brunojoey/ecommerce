import express from "express";
const router = express.Router();

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  cancelOrder
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/my-orders").get(protect, getMyOrders);

// ID ROUTES
// Must be at the bottom, otherwise other routes would look at it like id's
router.route("/:id").get(protect, getOrderById).delete(protect, cancelOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/delivered").put(protect, admin, updateOrderToDelivered);

export default router;
