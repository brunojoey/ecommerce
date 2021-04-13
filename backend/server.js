// with new node.js, you can use ES type of importing. But with files, you need to add the extension
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB(); // Calls the DB to connect.

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes);

// Middleware Call
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold));