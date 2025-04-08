'use strict';

/**
 * @file Main Application Entry Point
 * @description Configures and starts Express server with security best practices
 * @requires express
 */

require('dotenv').config();

// Core dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

// Application configuration
const connectDB = require('./src/db/config/mongo.connection');
const cfg = require('./cf');

// Route handlers
const authRoutes = require('./src/routes/auth.routes');
const productRoutes = require('./src/routes/product.routes');
const userRoutes = require('./src/routes/user.routes');
const authMiddleware = require('./src/middlewares/auth.middleware');

const app = express();

// Enhanced CORS configuration
const corsOptions = {
	origin: process.env.CORS_ORIGIN || '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: [
		'Content-Type',
		'Authorization',
		'X-Requested-With',
		'Accept',
		'x-filename',
		'Content-disposition'
	],
	exposedHeaders: ['x-filename', 'Content-disposition'],
	credentials: true
};

// Optimized rate limiting configuration
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: process.env.RATE_LIMIT_MAX || 100,
	message: {
		status: 429,
		message: 'Too many requests from this IP, please try again later'
	},
	standardHeaders: true,
	legacyHeaders: false
});

// Optimized middleware stack
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);
app.use(mongoSanitize());
app.use(xssClean());
app.use(hpp());

// API route handlers
app.use('/api', authRoutes);
app.use('/api', authMiddleware, userRoutes);
app.use('/api', authMiddleware, productRoutes);

/**
 * Server initialization with MongoDB connection
 * @async
 * @throws {Error} Server startup failure with detailed error information
 */
const startServer = async () => {
	try {
		// Establish database connection first
		await connectDB();

		// Start HTTP server
		app.listen(cfg.port, () => {
			console.log(`Port ${cfg.port} :: ${cfg.serverMessage}`);
			console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
		});
	} catch(error) {
		console.error('Server startup error:', error);
		process.exit(1);
	}
};

// Initialize application
startServer();
