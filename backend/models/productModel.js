import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: String, required: true }, // individual review rating
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: false },
    category: { type: Array, required: true },
    description: { type: Array, required: true },
    reviews: [reviewSchema], // an array of review objects
    rating: { type: Number, required: true, default: 0 }, // average rating of reivews
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
