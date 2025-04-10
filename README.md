# Buzz Burger Management System

Full-stack restaurant solution featuring digital menus and admin dashboard. Combines Vue.js frontend with Node.js/MongoDB backend, supporting Dockerized deployment for modern infrastructure needs.

## Features

- 🍔 Product management (CRUD operations)
- 📱 Responsive digital menu
- 🔐 Admin dashboard with authentication
- 📊 Real-time status toggles and filters
- 🐳 Dockerized deployment

## Static Service

This project consists of the following services:

| Service  | Description  | Port  |
| ------------ | ------------ | ------------ |
| Vue Client | The application interacts with an API gateway to handle all backend operations. | 8080  |
| Node/Express Server | The server responds to client-side requests | 9040  |

## Prerequisites

Ensure you have the following installed:

- Docker & Docker Compose
- Node.js & npm
- Vue CLI (optional for manual setup)

#### Set up environment variables:

Create a `.env` file in both the server and client directories and add the required environment variables.

##### Backend (buzz-burguer-backend) `.env` file:

```bash
PORT=9040
JWT_SECRET (your JWT secret)
MESSAGE_TERMINAL (your message terminal)
MONGO_DB_URI (your MongoDB URI)
```

##### Frontend (buzz-burguer-frontend) `.env` file:

```bash
VUE_APP_API_URL=http://localhost:9040/api
```

## Installation

### Running the Application with CLI

1. Clone the repository:

	```bash
	git clone https://github.com/Frnn4268/buzz-burger.git
 
	cd buzz-burguer
	```

2. Install dependencies: 
	```bash
	# Backend
	cd buzz-burguer-backend
	npm install
 
	# Frontend
	cd ../buzz-burguer-frontend
	npm install
	```

3. Start the backend (server): 
	```bash
	npm run dev
	```

4. Start the frontend (client): 
	```bash
	npm run serve
	```

5. Open the application in your browser:
	```bash
	http://localhost:8080
	```

### Running the Application with Docker Compose

1. Clone the repository:

	```bash
	git clone https://github.com/Frnn4268/buzz-burger.git
 
 	cd buzz-burguer
	```

2. Start the application:

	```bash
	docker-compose up --build
	```
	For other hand
	```bash
	docker-compose up --build -d
	```

	#### When to use:

	> - Use docker-compose up --build if you want to see logs in the terminal and ensure the containers are running.
	> -  Use docker-compose up --build -d if you prefer the containers to run in the background without keeping the terminal session open for logs.

3. Open the application in your browser:

	```bash
	http://localhost:80
	```

4. Stop the application:

	```bash
	docker-compose down
	```

## API Endpoints

| Method  | Endpoint  | Description  |
| ------------ | ------------ | ------------ |
|  POST |  /api/product  |  Create new product  |
| PUT  |  /api/product/{id} | Update existing product |
| DELETE  | /api/product/{id} | Delete product  |
| GET  | /api/product  | List all products |
| GET  | /api/product/{id} | Get single product  |

### Example Query:

```bash
GET /api/product?priceFrom=300&priceTo=500&orderBy=price&orderDirection=desc
```

## Access URLs
- Frontend: http://localhost:8080
- Backend: http://localhost:9040

## Contributors

- Fernando Martínez - [Github Profile](https://github.com/Frnn4268 "Github Profile")
