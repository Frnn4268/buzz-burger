'use strict';

/**
 * @file Authentication Routes
 * @description Defines API endpoints for user authentication and registration
 * @requires express
 * @requires express-validator
 */

const express = require('express');
const { check } = require('express-validator');

const app = express.Router();
const authController = require('../controllers/auth.controller');

// Password requirements constants
const PASSWORD_MIN_LENGTH = 6;

/**
 * @route POST /api/register
 * @description Register new user account
 * @param {string} name - User's full name
 * @param {string} email - Valid email address
 * @param {string} password - Strong password (min 8 chars, 1 uppercase, 1 number)
 * @returns {object} User data with auth token
 * @error 400 - Validation errors
 * @error 409 - Email already registered
 */
app.post('/register', [
	check('name')
		.not()
		.isEmpty()
		.withMessage('Name is required')
		.trim()
		.escape(),

	check('email')
		.isEmail()
		.withMessage('Valid email required')
		.normalizeEmail(),

	check('password')
		.isLength({ min: PASSWORD_MIN_LENGTH })
		.withMessage(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
		.withMessage('Password must contain uppercase, lowercase, and number')
], authController.register);

app.post('/login', [
	check('email')
		.isEmail()
		.withMessage('Valid email required')
		.normalizeEmail(),

	check('password')
    	.not()
		.isEmpty()
		.withMessage('Password required')
], authController.login);

module.exports = app;
