'use strict';

// Import required modules
const Product = require('../db/models/product.model');

/**
 * @controller Create Product
 * @description Creates a new product in the database. If the product is not on promotion,
 * the discount field is set to null.
 * @route POST /api/products
 * @param {Object} req - Express request object with product data in req.body
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the newly created product's id
 * @throws {500} Internal server error if the product cannot be created
 */
exports.createProduct = async (req, res) => {
	try {
		const data = req.body;

		if(data.isPromotion === false && data.discount !== undefined) {
		// If the product is not in promotion, ensure the discount field is null
			data.discount = null;
		}

		const product = new Product(data);
		await product.save();
		return res.status(201).json({ id: product._id });
	} catch(error) {
		return res.status(500).json({ error: error.message });
	}
};

/**
 * @controller Edit Product
 * @description Updates product details based on provided data and product id.
 * Ensures that a discount is only provided when the product is on promotion.
 * Automatically updates the modification date.
 * @route PUT /api/products/:id
 * @param {Object} req - Express request object with product id in req.params and update data in req.body
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the updated product's id
 * @throws {400} Bad request when invalid update data is provided or discount is set without promotion
 * @throws {404} Product not found
 * @throws {500} Internal server error if the product cannot be updated
 */
exports.editProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const updateData = req.body;

		// If 'isPromotion' is provided as false and a discount is included, return an error
		if(updateData.hasOwnProperty('isPromotion') && updateData.isPromotion === false && updateData.discount !== undefined)
			return res.status(400).json({ error: 'El descuento solo puede ser ingresado si el producto está en promoción.' });

		// Update the modification date
		updateData.dateModified = Date.now();
		const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
		if(!product)
			return res.status(404).json({ error: 'Producto no encontrado.' });
		return res.status(200).json({ id: product._id });
	} catch(error) {
		return res.status(500).json({ error: error.message });
	}
};

/**
 * @controller Delete Product
 * @description Deletes a product from the database based on its id.
 * @route DELETE /api/products/:id
 * @param {Object} req - Express request object with product id in req.params
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the deleted product's data
 * @throws {404} Product not found
 * @throws {500} Internal server error if the product cannot be deleted
 */
exports.deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);
		if(!product)
			return res.status(404).json({ error: 'Producto no encontrado.' });
		return res.status(200).json(product);
	} catch(error) {
		return res.status(500).json({ error: error.message });
	}
};

/**
 * @controller List Products
 * @description Retrieves a list of products based on query parameters.
 * Supports filtering by name (partial, case-insensitive), type, price range, and promotion status.
 * Also supports sorting by name, price, type, or discount.
 * @route GET /api/products
 * @param {Object} req - Express request object with query parameters:
 *   - name {string}: partial name to search for
 *   - type {string}: product type (accepted values: 'burger', 'condiments', 'snacks', 'drinks')
 *   - priceFrom {number}: minimum price
 *   - priceTo {number}: maximum price
 *   - isPromotion {string}: promotion status as '1' for true, '0' for false
 *   - orderBy {string}: field to sort by (allowed: 'name', 'price', 'type', 'discount')
 *   - orderDirection {string}: 'asc' or 'desc' for sorting direction (default is ascending)
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the list of products
 * @throws {400} Bad request if any query parameter is invalid
 * @throws {500} Internal server error if there is an issue retrieving the products
 */
exports.getProducts = async (req, res) => {
	try {
		const {
			name, type, priceFrom, priceTo, isPromotion, orderBy, orderDirection
		} = req.query;
		const filter = {};

		if(name) {
			// Partial search by name (case-insensitive)
			filter.name = { $regex: name, $options: 'i' };
		}
		// Filter by valid product types
		if(type) {
			if(['burger', 'condiments', 'snacks', 'drinks'].includes(type))
				filter.type = type;
			else
				return res.status(400).json({ error: 'Tipo de producto inválido para filtro.' });

		}

		// Filter by price range
		if(priceFrom)
			filter.price = { ...filter.price, $gte: Number(priceFrom) };
		if(priceTo)
			filter.price = { ...filter.price, $lte: Number(priceTo) };

		// Filter by promotion status
		if(isPromotion !== undefined) {
			if(isPromotion === '1')
				filter.isPromotion = true;
			else if(isPromotion === '0')
				filter.isPromotion = false;
			else
				return res.status(400).json({ error: 'Valor inválido para isPromotion.' });

		}

		// Define sorting options if provided
		const sort = {};
		if(orderBy) {
			const validSortFields = ['name', 'price', 'type', 'discount'];
			if(!validSortFields.includes(orderBy))
				return res.status(400).json({ error: 'Campo de ordenamiento inválido.' });

			const direction = (orderDirection && orderDirection.toLowerCase() === 'desc') ? -1 : 1;
			sort[orderBy] = direction;
		}

		const products = await Product.find(filter).sort(sort);
		return res.status(200).json(products);
	} catch(error) {
		return res.status(500).json({ error: error.message });
	}
};

/**
 * @controller Get Single Product
 * @description Retrieves a single product based on its id.
 * @route GET /api/products/:id
 * @param {Object} req - Express request object with product id in req.params
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the product details
 * @throws {404} Product not found
 * @throws {500} Internal server error if the product cannot be retrieved
 */
exports.getProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		if(!product)
			return res.status(404).json({ error: 'Producto no encontrado.' });
		return res.status(200).json(product);
	} catch(error) {
		return res.status(500).json({ error: error.message });
	}
};
