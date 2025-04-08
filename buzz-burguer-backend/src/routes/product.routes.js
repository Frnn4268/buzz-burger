'use strict';

/**
 * @file Product Routes
 * @description Defines CRUD operations for product management
 * @requires express
 * @requires express-validator
 */

const express = require('express');
const { check } = require('express-validator');

const app = express.Router();
const productController = require('../controllers/product.controller');

const MIN_PRICE = 0.01;
const MAX_NAME_LENGTH = 100;

/**
 * @route GET /api/product
 * @description Get paginated list of products with filters
 * @param {number} [page=1] - Page number
 * @param {number} [limit=10] - Items per page
 * @param {string} [type] - Filter by product type
 * @returns {Array} List of products with metadata
 * @error 500 - Server error
 */
app.get('/product', productController.getProducts);

/**
 * @route GET /api/product/:id
 * @description Get single product details
 * @param {string} id - Product ID
 * @returns {object} Product details
 * @error 404 - Product not found
 * @error 400 - Invalid ID format
 */
app.get('/product/:id', productController.getProduct);

/**
 * @route POST /api/product
 * @description Create new product
 * @param {string} name - Product name
 * @param {string} type - Product type (burger|condiments|snacks|drinks)
 * @param {number} price - Product price
 * @param {Array} ingredients - List of ingredients
 * @returns {object} Created product
 * @error 400 - Validation error
 * @error 401 - Unauthorized
 */
app.post('/product', [
	check('name')
		.trim()
		.escape()
		.isLength({ min: 2, max: MAX_NAME_LENGTH })
		.withMessage(`El nombre debe de tener entre 2-${MAX_NAME_LENGTH} caracteres`),

	check('type')
		.isIn(['burger', 'condiments', 'snacks', 'drinks'])
		.withMessage('Tipo de producto inválido'),

	check('price')
		.isFloat({ min: MIN_PRICE })
		.withMessage(`El precio debe de ser mínimo de $${MIN_PRICE}`),

	check('ingredients')
		.isArray({ min: 1 })
		.withMessage('Al menos un ingrediente es requerido')
], productController.createProduct);

/**
 * @route PUT /api/product/:id
 * @description Update existing product
 * @param {string} id - Product ID
 * @returns {object} Updated product
 * @error 404 - Product not found
 * @error 403 - Modification not allowed
 */
app.put('/product/:id', [
	check('status')
		.optional()
		.isIn(['active', 'inactive'])
		.withMessage('Estado inválido'),

	check('discount')
		.optional()
		.isFloat({ min: 0 })
		.withMessage('Descuento debe de ser mayor a 0')
], productController.editProduct);

/**
 * @route DELETE /api/product/:id
 * @description Deactivate product (soft delete)
 * @param {string} id - Product ID
 * @returns {object} Confirmation message
 * @error 404 - Product not found
 * @error 403 - Delete not allowed
 */
app.delete('/product/:id', productController.deleteProduct);

module.exports = app;
