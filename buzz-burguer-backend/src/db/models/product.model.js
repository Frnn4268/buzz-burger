'use strict';

const mongoose = require('mongoose');

/**
 * @file Product Model
 * @description Defines the schema for food products with validation and business rules
 * @requires mongoose
 */

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'El nombre del producto es obligatorio']
	},
	type: {
		type: String,
		required: [true, 'El tipo de producto es obligatorio'],
		enum: {
			values: ['burger', 'condiments', 'snacks', 'drinks'],
			message: 'Tipo de producto inválido. Valores válidos: burger, condiments, snacks, drinks'
		}
	},
	price: {
		type: Number,
		required: [true, 'El precio del producto es obligatorio'],
		min: [0.01, 'El precio del producto debe de ser mayor a 0']
	},
	image: {
		type: String,
		match: [/\.(jpe?g|png|webp)$/i, 'Formato de imágen inválido. Permitido: jpg, jpeg, png, webp']
	},
	isPromotion: {
		type: Boolean,
		default: false
	},
	discount: {
		type: Number,
		min: [0, 'El descuento no puede ser negativo'],
		max: [100, 'El descuento no puede exceder el 100%'],
		validate: {
			validator(value) {
				return this.isPromotion ? value !== undefined : true;
			},
			message: 'El descuento es requerido si el producto está en promoción'
		}
	},
	ingredients: {
		type: [String],
		required: [true, 'La lista de ingredientes es obligatoria'],
		validate: {
			validator: arr => arr.length > 0,
			message: 'La lista de ingredientes no puede estar vacía'
		},
		set: arr => [...new Set(arr)]
	},
	dateCreated: {
		type: Date,
		default: Date.now
	},
	dateModified: {
		type: Date
	},
	status: {
		type: String,
		default: 'active',
		enum: {
			values: ['active', 'inactive'],
			message: 'Estados inválidos. Valores válidos: Activo, Inactivo'
		}
	}
});

// Middleware for setting the dateModified field before saving
productSchema.pre('save', function(next) {
	this.dateModified = Date.now();
	next();
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
