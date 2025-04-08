# Buzz Burger Management System

![Buzz Burger Logo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDeOKZARPDYtQKvi1FTS5E2juGqIuubkGI0CwKhx2ZJSbsY448)

Modern restaurant management system with digital menu and admin capabilities.

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

## Installation

### Running the Application with CLI

1. Clone the repository:

	```bash
	git clone https://github.com/Frnn4268/buzz-burger.git
	 # Backend
	cd buzz-burguer-backend
	 # Frontend
	cd buzz-burguer-frontend
	```

2. Install dependencies: 
	```bash
	npm install
	```

3. Start the backend: 
	```bash
	npm run dev
	```

4. Start the client side: 
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