import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import path from 'path';
import { errorHandler } from './middleware/errorHandler.js';

// Import routes
import productRoutes from "./routes/products.js";
import categoryImageRoutes from "./routes/categoryImages.js";
import contactMessageRoutes from "./routes/contactMessages.js";
import testimonialRoutes from "./routes/testimonials.js";
import uploadRoutes from "./routes/upload.js";
import userRoutes from "./routes/users.js";
import orderRoutes from "./routes/orders.js";
import cartRoutes from "./routes/carts.js";
import ContactMessage from "./models/ContactMessage.js";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", process.env.VITE_API_URL],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Apply rate limiting to all routes
app.use(limiter);

// Body parser middleware with size limits
app.use(express.json({ limit: process.env.MAX_FILE_SIZE || '5mb' }));
app.use(express.urlencoded({ 
  limit: process.env.MAX_FILE_SIZE || '5mb',
  extended: true 
}));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '..', 'coolstar-frontend', 'dist')));

// API routes
app.use("/api/products", productRoutes);
app.use("/api/category-images", categoryImageRoutes);
app.use("/api/contact-messages", contactMessageRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Simple inquiry endpoint (saves to contact messages)
app.post('/api/inquiries', async (req, res) => {
  const { name, email, message, productId } = req.body;
  
  try {
    // Create subject based on whether it's a product inquiry
    const subject = productId ? `Inquiry about product ID: ${productId}` : 'General Inquiry';
    
    // Create and save new contact message
    const contactMessage = new ContactMessage({
      name,
      email,
      subject,
      message
    });
    
    await contactMessage.save();
    console.log('Received inquiry and saved as contact message');
    
    res.status(201).json({ 
      success: true, 
      message: 'Inquiry received successfully' 
    });
  } catch (error) {
    console.error('Error saving inquiry as contact message:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process inquiry' 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Serve frontend index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  // Ensure the path resolves correctly from backend directory to frontend dist
  res.sendFile(path.resolve(__dirname, '..', 'coolstar-frontend', 'dist', 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});
