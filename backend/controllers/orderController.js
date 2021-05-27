import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { DateTime } from 'luxon';

// @desc Create new Order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  // orderItems is the array of items that gets passed
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // To make sure the orderItems array is not empty before
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    // begins new order
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    // Saves the Order to the database
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc Get Order By ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  // Getting the ID from the URL
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// @desc Update Order to Paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // Getting the ID from the URL
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = DateTime.now();
    // PaymentResult Comes from the Paypal API
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save(); // saves the order in the database
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// @desc Update Order to Delivered
// @route GET /api/orders/:id/delivered
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  // Getting the ID from the URL
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = DateTime.now();

    const updatedOrder = await order.save(); // saves the order in the database
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// @desc Get Logged In User Orders
// @route GET /api/orders/my-orders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  // Getting the orders of the logged in users by ID
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc Get All Orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate();
  res.json(orders);
});

// @desc Cancel an Order
// @route DELETE /api/orders/:id
// @access Private
const cancelOrder = asyncHandler(async (req, res) => {
  // Goals:
  // 1. Giving the user an option to cancel the order
  // 2. Only the user can cancel the order
  // 3. The OrderId should be linked to the UserId
  const order = await Order.findById(req.params.id);

  if (order) {
    await order.remove();
    res.json({ message: "Order Canceled" });
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  cancelOrder
};
