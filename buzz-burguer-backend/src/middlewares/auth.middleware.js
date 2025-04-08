'use strict';

const jwt = require('jsonwebtoken');

/**
 * @middleware JWT Authentication
 * @description Middleware to authenticate users using JWT tokens
 * @param {Object} req - Request objetct HTTP
 * @param {Object} res - Response object HTTP
 * @param {Function} next - Function to call the next middleware
 */
module.exports = (req, res, next) => {
	const authHeader = req.header('Authorization');

	// Validate presence of the Authorization header
	if(!authHeader) {
		return res.status(401).json({
			code: 'MISSING_TOKEN',
			message: 'Authentication token requerido',
			timestamp: new Date().toISOString()
		});
	}

	// Verify the format of the Authorization header
	const [bearer, token] = authHeader.split(' ');

	if(bearer !== 'Bearer' || !token) {
		return res.status(401).json({
			code: 'INVALID_TOKEN_FORMAT',
			message: 'Token format: Bearer <token>',
			timestamp: new Date().toISOString()
		});
	}

	try {
		// Verify the decoded token
		const decoded = jwt.verify(token, process.env.JWT_SECRET, {
			algorithms: ['HS256'],
			ignoreExpiration: false
		});

		// Data inject into the request object
		req.user = {
			id: decoded.id,
			role: decoded.role,
			email: decoded.email
		};

		next();
	} catch(error) {
		// Detailed error handling
		const errorType = error.name || 'TOKEN_VERIFICATION_ERROR';
		const errorMessage = error.expiredAt
			? 'Token expired'
			: 'Invalid authentication token';

		console.error(`[JWT Error] ${errorType}: ${error.message}`);

		res.status(401).json({
			code: errorType,
			message: errorMessage,
			timestamp: new Date().toISOString(),
			...(process.env.NODE_ENV === 'development' && { debug: error.message })
		});
	}
};
