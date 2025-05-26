
```markdown
# Todo Backend API

A RESTful API for task management with JWT authentication, built with Node.js, Express, MongoDB, and documented with Swagger.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running](#running-the-project)
- [API Docs](#api-documentation)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Authentication**:
  - JWT-based auth with refresh tokens
  - Rate limiting on auth endpoints
  - Role-based access control

- **Task Management**:
  - Full CRUD operations
  - Status tracking (todo/in-progress/done)
  - Commenting system
  - Priority levels

## Technologies

- [Node.js](https://nodejs.org/) (v22.14+)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Swagger UI](https://swagger.io/)

## Installation

1. Install prerequisites:
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install MongoDB
   sudo apt-get install mongodb
   ```

2. Clone and setup:
   ```bash
   git clone https://github.com/your-repo/todo-backend.git
   cd todo-backend
   npm install
   ```

## Configuration

Create `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your-strong-secret-here
PORT=5000
```

## Running the Project

```bash
# Development
npm run dev

# Production
npm start
```

Access docs at: `http://localhost:3000/api-docs`

## API Documentation

![Swagger UI Preview](./swagger-preview.png)

Interactive documentation available at `/api-docs` including:
- Authentication flows
- Role permissions
- Request/response examples

## Project Structure

```
todo-backend/
├── src/
│   ├── config/       # Swagger and DB config
│   ├── controllers/  # Business logic
│   ├── middleware/   # Auth handlers
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API endpoints
│   └── app.js        # Express setup
```

## Endpoints

| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| POST   | /api/auth/register | Register new user               |
| POST   | /api/auth/login    | Login and get JWT               |
| GET    | /api/tasks         | Get filtered tasks              |

## Contributing

1. Fork the repository
2. Create your feature branch
3. Submit a pull request

## License

MIT © [Mohammad Dehdar]
```
