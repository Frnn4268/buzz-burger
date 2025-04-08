'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const connectDB = require('./src/db/config/mongo.connection');
const cfg = require('./cf');

const authRoutes = require('./src/routes/auth.routes');
const productRoutes = require('./src/routes/product.routes');
const userRoutes = require('./src/routes/user.routes');
const authMiddleware = require('./src/middlewares/auth.middleware');

const app = express();

// Configuración mejorada de CORS
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

// Configuración de rate limit mejorada
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: process.env.RATE_LIMIT_MAX || 100,
	message: {
		status: 429,
		message: 'Demasiadas solicitudes desde esta IP, intente nuevamente más tarde'
	},
	standardHeaders: true,
	legacyHeaders: false
});

// Middlewares optimizados
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors(corsOptions)); // Un solo CORS con opciones
app.use(helmet());
app.use(limiter);
app.use(mongoSanitize());
app.use(xssClean());
app.use(hpp());

// Eliminar headers duplicados (ya están en corsOptions)
// app.use((req, res, next) => {...})

// Rutas
app.use('/api', authRoutes);
app.use('/api', authMiddleware, userRoutes);
app.use('/api', authMiddleware, productRoutes);

// Inicio del servidor con conexión a MongoDB
const startServer = async () => {
	try {
		await connectDB(); // Conexión a MongoDB primero
		app.listen(cfg.puerto, () => {
			console.log(`${cfg.puerto} :: ${cfg.messageTerminal}`);
			console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
		});
	} catch(error) {
		console.error('Error al iniciar el servidor:', error);
		process.exit(1);
	}
};

startServer();
