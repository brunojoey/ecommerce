import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch All Products
// @route GET /api/products
// @access Public/Token
const getProducts = asyncHandler(async (req, res) => {
  const pageProductSize = 5;
  const page = Number(req.query.pageNumber) || 1; // ?pageNumber=2....
  // to get query strings when a ? is denounced in the URL
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i", // case insensitive
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword }); // will give us the product count
  // spread keyword. It is either going to be empty or it will be part of the name of the product being searched for
  const products = await Product.find({ ...keyword })
    .limit(pageProductSize) // limits the products shown on the page
    .skip(pageProductSize * (page - 1)); // skipping the page size multiplied by the page minus one. This gives us the correct place in the products, and the page
  res.json({ products, page, pages: Math.ceil(count / pageProductSize) });
});

// @desc Fetch Single Products
// @route GET /api/products/:id
// @access Public/Token
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc Delete a Product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc Create a Product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Iced Coffee",
    price: 2.0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Coffee",
    category: "coffee",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Iced Coffee",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Update a Product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    (product.name = name),
      (product.price = price),
      (product.description = description),
      (product.image = image),
      (product.brand = brand),
      (product.category = category),
      (product.countInStock = countInStock);

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc Create New Review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product Already Reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // Pushes the new review to the Product Reviews array
    product.reviews.push(review);

    // Updates the Number of reviews the product has
    product.numReviews = product.reviews.length;

    // Updates the Average Rating of the Product
    product.rating = product.reviews.reduce(
      (acc, item) => item.rating + acc,
      0 / product.reviews.length
    );

    await product.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Review Not Found");
  }
});

// @desc Get Top Rated Products
// @route Get /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1}).limit(5);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
};
