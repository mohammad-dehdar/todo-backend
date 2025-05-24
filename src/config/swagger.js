const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo Backend API',
      version: '1.0.0',
      description: 'API documentation for Todo Backend Application',
      contact: {
        name: 'Developer',
        email: 'dev@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
      {
        url: 'https://your-production-url.com/api',
        description: 'Production server',
      },
    ],
    tags: [
      { name: 'Authentication', description: 'User authentication endpoints' },
      { name: 'Users', description: 'User management operations' },
      { name: 'Tasks', description: 'Task management operations' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            role: { type: 'string', enum: ['admin', 'manager', 'employee'], example: 'employee' },
            createdAt: { type: 'string', format: 'date-time', example: '2025-06-01T12:00:00Z' },
          },
        },
        Task: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439012' },
            title: { type: 'string', example: 'Complete project documentation' },
            description: { type: 'string', example: 'Write detailed documentation for all API endpoints' },
            status: { type: 'string', enum: ['todo', 'in_progress', 'done', 'paused'], example: 'todo' },
            priority: { type: 'string', enum: ['low', 'medium', 'high'], example: 'medium' },
            dueDate: { type: 'string', format: 'date-time', example: '2025-06-01T12:00:00Z' },
            assignedTo: { type: 'string', example: '507f1f77bcf86cd799439011' },
            createdBy: { type: 'string', example: '507f1f77bcf86cd799439011' },
            comments: {
              type: 'array',
              items: {
                type: 'object',
                required: ['userId', 'text'],
                properties: {
                  userId: { type: 'string', example: '507f1f77bcf86cd799439011' },
                  text: { type: 'string', example: 'This task needs more details' },
                  createdAt: { type: 'string', format: 'date-time', example: '2025-06-01T12:00:00Z' },
                },
              },
            },
            attachments: {
              type: 'array',
              items: { type: 'string', example: '/uploads/file.pdf' },
            },
            createdAt: { type: 'string', format: 'date-time', example: '2025-06-01T12:00:00Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2025-06-01T12:00:00Z' },
          },
        },
        TaskInput: {
          type: 'object',
          required: ['title', 'assignedTo'],
          properties: {
            title: { type: 'string', example: 'Complete project documentation' },
            description: { type: 'string', example: 'Write detailed documentation for all API endpoints' },
            assignedTo: { type: 'string', description: 'User ID', example: '507f1f77bcf86cd799439011' },
            priority: { type: 'string', enum: ['low', 'medium', 'high'], example: 'medium' },
            dueDate: { type: 'string', format: 'date-time', example: '2025-06-01T12:00:00Z' },
          },
        },
        TaskUpdate: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Complete project documentation' },
            description: { type: 'string', example: 'Write detailed documentation for all API endpoints' },
            status: { type: 'string', enum: ['todo', 'in_progress', 'done', 'paused'], example: 'todo' },
            priority: { type: 'string', enum: ['low', 'medium', 'high'], example: 'medium' },
            dueDate: { type: 'string', format: 'date-time', example: '2025-06-01T12:00:00Z' },
            assignedTo: { type: 'string', example: '507f1f77bcf86cd799439011' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'An error occurred' },
            error: { type: 'string', example: 'Detailed error message (development only)' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };