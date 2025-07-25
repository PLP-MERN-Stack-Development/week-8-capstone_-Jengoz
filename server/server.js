// backend/server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// --- IMPORTS AND DEFINITIONS FOR SERVING STATIC FILES IN ES MODULES ---
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- END STATIC FILE SETUP ---

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// --- Request Tracing Middleware (for debugging) ---
app.use((req, res, next) => {
  console.log(`[REQUEST TRACE] Method: ${req.method}, URL: ${req.originalUrl}`);
  next();
});
// --- END Request Tracing Middleware ---

// --- Enable CORS for frontend origin (CRUCIAL FOR DEPLOYMENT) ---
// Use process.env.CORS_ORIGIN for dynamic origin in production
// In development, you can keep localhost:5173 or use a fallback.
// Render will inject CORS_ORIGIN from your environment variables.
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // <--- UPDATED: Dynamic CORS Origin
  credentials: true
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// --- CRUCIAL LINE FOR SERVING STATIC FILES (IMAGES) ---
// When a request comes for '/images/filename.jpg', it will look in 'backend/public/images'
// Ensure you have a 'public/images' folder inside your 'server' directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));


// --- API Routes (CRUCIAL FOR DEPLOYMENT) ---
// Frontend will now send requests like `${API_BASE_URL}/api/products`
// So, the backend needs to mount its routes under '/api'
app.use('/api/products', productRoutes); // <--- UPDATED: Mounted under /api
app.use('/api/users', userRoutes);       // <--- UPDATED: Mounted under /api

// Base route for API health check
app.get('/', (_req, res) => {
  res.send({ message: 'API is running...' });
});

// --- ERROR HANDLING MIDDLEWARE (MUST be placed after all routes) ---
app.use(notFound);
app.use(errorHandler);
// --- END ERROR HANDLING MIDDLEWARE ---

// Define the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  )
);
