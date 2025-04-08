'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * @file User Model
 * @description Defines the schema for user authentication with validation and business rules
 * @requires mongoose
 * @requires bcryptjs
 */

const SALT_ROUNDS = 10;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'El nombre completo es obligatorio'],
		trim: true,
		maxlength: [100, 'El nombre completo no puede exceder los 100 caracteres']
	},
	email: {
		type: String,
		required: [true, 'El email es obligatorio'],
		unique: true,
		lowercase: true,
		match: [EMAIL_REGEX, 'Formato de email inválido'],
		index: true
	},
	password: {
		type: String,
		required: [true, 'Contraseña es obligatoria']
	},
	role: {
		type: String,
		enum: {
			values: ['admin', 'user'],
			message: 'Role inválido. Valores válidos: admin, user'
		},
		default: 'user'
	},
	status: {
		type: String,
		enum: {
			values: ['active', 'inactive'],
			message: 'Estado válido. Valores válidos: active, inactive'
		},
		default: 'active'
	},
	createdAt: {
		type: Date,
		default: Date.now,
		immutable: true
	}
});

// Middleware to hash the password before saving
userSchema.pre('save', async function(next) {
	if(!this.isModified('password'))
		return next();

	try {
		this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
		next();
	} catch(error) {
		next(new Error('Password hashing failed'));
	}
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
