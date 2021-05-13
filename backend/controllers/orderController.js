import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

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
    return;
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
  const order = await Order.findById(req.params.id)
  .populate("user", "name email");

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

export { addOrderItems, getOrderById };
