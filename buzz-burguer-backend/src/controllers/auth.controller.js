'use strict';

// Import required modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../db/models/user.model');

/**
 * Generates JWT token for authenticated user
 * @param {Object} user - User object from database
 * @returns {string} JWT token signed with secret
 */
const generateToken = user => {
	return jwt.sign(
		{ id: user._id, role: user.role },
		process.env.JWT_SECRET,
		{ expiresIn: '1h' }
	);
};

/**
 * @controller Register new user
 * @description Creates new user account with validation
 * @route POST /api/register
 * @param {string} name - User's full name
 * @param {string} email - Valid email address
 * @param {string} password - Password (min 6 characters)
 * @param {string} [role=user] - Optional role (admin/user)
 * @returns {Object} JSON response with JWT token and user data
 * @throws {400} Validation errors
 * @throws {400} Email already exists
 * @throws {400} Invalid role assignment
 * @throws {500} Server error
 */
exports.register = async (req, res) => {
	// Validate request body using express-validator
	const errors = validationResult(req);
	if(!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	try {
		// Destructure with default role as 'user'
		const { name, email, password, role = 'user' } = req.body;

		// Validate role - only 'admin' or 'user' allowed
		if(role !== 'admin' && role !== 'user')
			return res.status(400).json({ message: 'Rol inválido. Debe ser admin o user.' });

		// Check if email already exists
		let user = await User.findOne({ email });

		if(user)
			return res.status(400).json({ message: 'El email ya está en uso' });

		// Create new user with hashed password (handled by User model pre-save hook)
		user = new User({
			name,
			email,
			password,
			role
		});

		await user.save();

		// Generate JWT and return user data (without password)
		const token = generateToken(user);
		res.json({
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role
			}
		});
	} catch(err) {
		// Handle Mongoose validation errors separately
		if(err.name === 'ValidationError')
			return res.status(400).json({ message: err.message });

		// Generic server error
		res.status(500).json({ message: 'Error en el servidor' });
	}
};

/**
 * @controller Authenticate user
 * @description Validates credentials and returns JWT token
 * @route POST /api/login
 * @param {string} email - Registered email address
 * @param {string} password - Account password
 * @returns {Object} JSON response with JWT token and user data
 * @throws {400} Invalid credentials
 * @throws {403} Inactive account
 * @throws {500} Server error
 */
exports.login = async (req, res) => {
	// Validate request body
	const errors = validationResult(req);
	if(!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	try {
		const { email, password } = req.body;
		// Find user by email
		const user = await User.findOne({ email });
		if(!user)
			return res.status(400).json({ message: 'Credenciales inválidas' });
		// Check if user is active
		if(user.status === 'inactive')
			return res.status(403).json({ message: 'El usuario se encuentra inactivo' });
		// Compare hashed password
		const isMatch = await bcrypt.compare(password, user.password);
		if(!isMatch)
			return res.status(400).json({ message: 'Credenciales inválidas' });

		// Generate JWT and return user data
		const token = generateToken(user);
		res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
	} catch(err) {
		res.status(500).json({ message: 'Error en el servidor' });
	}
};
