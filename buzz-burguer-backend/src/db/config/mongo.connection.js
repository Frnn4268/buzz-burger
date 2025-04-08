'use strict';

/**
 * @file MongoDB Atlas Connection Module
 * @description Configures secure MongoDB Atlas connection with error handling and auto-reconnect
 * @requires mongoose
 */

const mongoose = require('mongoose');

const {
	MONGO_DB_URI,
	NODE_ENV = 'development'
} = process.env;

// Validate required environment variable
if(!MONGO_DB_URI)
	throw new Error('MONGO_DB_URI is not defined in environment variables');

// Production-grade connection configuration
const connectionOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverSelectionTimeoutMS: 5000, // Fail fast if no primary available
	heartbeatFrequencyMS: 30000, // Maintain connection heartbeat
	retryWrites: true, // Enable retryable writes
	w: 'majority', // Write concern majority
	...(NODE_ENV === 'production' && { // Production-specific settings
		ssl: true, // Enforce SSL encryption
		sslValidate: true // Validate server certificate
	})
};

// Enable verbose query logging for development
if(NODE_ENV === 'development') {
	mongoose.set('debug', (collectionName, method, query, doc) => {
		console.log(`MongoDB: ${collectionName}.${method}`, {
			query,
			doc
		});
	});
}

// Connection event handlers
mongoose.connection
	.on('connected', () => {
		console.log('[MongoDB] Successfully connected to:', getSanitizedConnectionString());
	})
	.on('disconnected', () => {
		console.warn('[MongoDB] Connection lost - Attempting reconnection...');
	})
	.on('error', err => {
		console.error('[MongoDB] Critical connection error:', {
			error: err.message,
			stack: err.stack
		});
		process.exit(1);
	});

/**
 * Sanitizes connection string for secure logging
 * @returns {string} Safe connection URI without credentials
 */
const getSanitizedConnectionString = () => {
	try {
		const url = new URL(MONGO_DB_URI);
		return `${url.protocol}//${url.hostname}:${url.port}/${url.pathname.split('/')[1]}`;
	} catch(err) {
		return '[Sanitized connection string]';
	}
};

/**
 * Establishes database connection with error handling
 * @async
 * @throws {Error} Connection failure with detailed error information
 */
const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_DB_URI, connectionOptions);
		console.log('[MongoDB] Connection ready - State:', mongoose.connection.readyState);
	} catch(err) {
		console.error('[MongoDB] Initial connection error:', {
			error: err.message,
			code: err.code,
			stack: err.stack
		});
		process.exit(1);
	}
};

// Graceful shutdown handling
process.on('SIGTERM', async () => {
	await mongoose.connection.close();
	console.log('[MongoDB] Connection closed due to process termination');
	process.exit(0);
});

module.exports = connectDB;
