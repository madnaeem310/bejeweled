import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import cartRoutes from './routes/cart.js';
import userRoutes from './routes/users.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

let isShuttingDown = false;

const shutdown = (signal, onComplete) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`${signal} received. Shutting down gracefully...`);

  server.close(async (serverError) => {
    if (serverError) {
      console.error('Error while closing server:', serverError);
      process.exit(1);
    }

    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
    } catch (dbError) {
      console.error('Error while closing MongoDB connection:', dbError);
      process.exit(1);
    }

    if (onComplete) {
      onComplete();
      return;
    }

    process.exit(0);
  });

  setTimeout(() => {
    console.error('Forced shutdown after timeout.');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
