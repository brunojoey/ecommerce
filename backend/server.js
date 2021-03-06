// with new node.js, you can use ES type of importing. But with files, you need to add the extension
import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import pkg from "cloudinary";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const cloudinary = pkg;
dotenv.config();

connectDB(); // Calls the DB to connect.

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // gives us the HTTP method and status
}

app.use(express.json()); // Will allow us to accept JSON data in the body

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// When ready to make payment, this route gets hit and sends to the PAYPAL developer server
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// not available with ES6 Modules. This is to mimic that 'require' behavior
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// this will allow the folder to be static and be able to view

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build"))); // makes the build folder static to put it into production
  app.get("*", (req, res) =>
    // pointing to the index.html
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API Is Running...");
  });
}

// Middleware Call
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold
  )
);
