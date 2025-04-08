'use strict';

/**
 * @file User Management Routes
 * @description Defines user administration endpoints with role-based access
 * @requires express
 * @requires express-validator
 */

const express = require('express');
const { check, param } = require('express-validator');
const mongoose = require('mongoose');

const app = express.Router();
const userController = require('../controllers/user.controller');

// Validation constants
const VALID_STATUS = ['active', 'inactive'];

/**
 * @route GET /api/user
 * @description Get paginated user list (Admin only)
 * @param {number} [page=1] - Page number
 * @param {number} [limit=10] - Items per page
 * @returns {Array} List of users with metadata
 * @error 403 - Forbidden (non-admin access)
 * @error 500 - Server error
 */
app.get('/user', userController.getUsers);

/**
 * @route GET /api/user/:id
 * @description Get user details
 * @param {string} id - Valid MongoDB ID
 * @returns {object} User details (sensitive fields filtered)
 * @error 404 - User not found
 * @error 400 - Invalid ID format
 */
app.get('/user/:id', [
	param('id')
		.trim()
		.escape()
		.custom(id => mongoose.Types.ObjectId.isValid(id))
		.withMessage('Formato de ID usuario inválido')
], userController.getUser);

/**
 * @route PUT /api/user/:id
 * @description Update user status/role (Admin only)
 * @param {string} id - Valid MongoDB ID
 * @param {string} [status] - Account status
 * @param {string} [role] - User role
 * @returns {object} Updated user data
 * @error 403 - Forbidden operation
 * @error 400 - Validation error
 */
app.put('/user/:id', [
	param('id')
		.isMongoId()
		.withMessage('Formato de ID usuario inválido'),

	check('status')
		.optional()
		.isIn(VALID_STATUS)
		.withMessage(`Estatus inválido. Valores válidos: ${VALID_STATUS.join(', ')}`)
], userController.editUserStatus);

/**
 * @route DELETE /api/user/:id
 * @description Deactivate user (soft delete)
 * @param {string} id - User ID
 * @returns {object} Confirmation message
 * @error 403 - Self-deletion attempt or insufficient permissions
 * @error 404 - User not found
 */
app.delete('/user/:id', userController.deleteUser);

module.exports = app;
