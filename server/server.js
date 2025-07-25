// backend/server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Assuming you have CORS enabled for frontend
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // Assuming you have these error handlers

// --- IMPORTS AND DEFINITIONS FOR SERVING STATIC FILES IN ES MODULES ---
import path from 'path'; // Import path module
import { fileURLToPath } from 'url'; // To get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- END STATIC FILE SETUP ---

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// --- Request Tracing Middleware (for debugging) ---
// This will log every incoming request to your backend console
app.use((req, res, next) => {
  console.log(`[REQUEST TRACE] Method: ${req.method}, URL: ${req.originalUrl}`);
  next(); // IMPORTANT: Call next() to pass the request to the next middleware/route
});
// --- END Request Tracing Middleware ---

// Enable CORS for frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend's URL
  credentials: true
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// --- CRUCIAL LINE FOR SERVING STATIC FILES (IMAGES) ---
// When a request comes for '/images/filename.jpg', it will look in 'backend/public/images'
app.use('/images', express.static(path.join(__dirname, 'public/images')));
// --- END IMAGE SERVING LINE ---


// --- API Routes ---
// Mount specific routes. Frontend sends paths without /api due to Vite proxy rewrite.
// So, mount routers directly at their intended base paths.
app.use('/products', productRoutes); // Handles /products and /products/:id
app.use('/users', userRoutes);       // Handles /users (register) and /users/login

// Base route for API health check
app.get('/', (_req, res) => {
  res.send({ message: 'API is running...' });
});

// --- ERROR HANDLING MIDDLEWARE (MUST be placed after all routes) ---
// Catches any 404 errors (requests that didn't match any defined route)
app.use(notFound);
// Handles any other errors that might occur in your routes
app.use(errorHandler);
// --- END ERROR HANDLING MIDDLEWARE ---

// Define the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);