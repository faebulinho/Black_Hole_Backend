# Black_Hole_Backend

A TypeScript-based REST API that provides information about black holes, along with user management functionality. The API scrapes data from reliable sources and serves it through a well-documented interface.

## Project Structure

```
Black_Hole_Backend/
├── src/
│   ├── config/
│   │   └── swagger.ts           # Swagger configuration
│   ├── controllers/
│   │   ├── blackHoleController.ts   # Black hole data handling
│   │   ├── infoController.ts        # System info endpoints
│   │   └── userController.ts        # User management
│   ├── routes/
│   │   ├── blackHoleRoutes.ts
│   │   ├── infoRoutes.ts
│   │   └── userRoutes.ts
│   ├── services/
│   │   └── blackHoleService.ts      # Black hole data scraping
│   ├── scripts/
│   │   └── generate-swagger.ts      # Swagger docs generation
│   └── app.ts                       # Main application file
├── .env                            # Environment variables
├── .gitignore                      # Git ignore file
├── package.json                    # Project dependencies
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## Technologies Used

### Core Technologies

- **TypeScript**: Provides strong typing and modern JavaScript features
- **Express.js**: Fast, unopinionated web framework for Node.js
- **Node.js**: JavaScript runtime for server-side execution

### Documentation & API Design

- **Swagger/OpenAPI**: API documentation and testing interface
- **swagger-jsdoc**: Generates Swagger documentation from JSDoc comments
- **swagger-ui-express**: Serves Swagger UI for API testing

### Data Processing

- **axios**: HTTP client for making requests
- **cheerio**: Web scraping library for parsing HTML

### Development Tools

- **ts-node-dev**: Development server with hot reload
- **ESLint**: Code linting
- **dotenv**: Environment variable management

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Black_Hole_Backend.git
cd Black_Hole_Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=8080
NODE_ENV=development
```

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start the server with hot reload enabled.

### Production Mode

```bash
npm start
```

This will:

1. Generate the latest Swagger documentation
2. Compile TypeScript to JavaScript
3. Start the server

## API Documentation

The API documentation is available through Swagger UI when the server is running:

```
http://localhost:8080/api-docs
```

### Available Endpoints

#### Black Hole Information

- `GET /api/v1/blackholes/{name}`: Get information about a specific black hole
  - Example: `GET /api/v1/blackholes/Sagittarius%20A*`

#### System Information

- `GET /api/v1/info/datetime`: Get current server date and time
- `GET /api/v1/info/version`: Get API version information

#### User Management

- `GET /api/v1/users/name`: Get user name information

## Development

### Adding New Endpoints

1. Create a controller in `src/controllers/`
2. Add JSDoc comments for Swagger documentation
3. Create corresponding routes in `src/routes/`
4. Register routes in `app.ts`

Example controller with Swagger documentation:

```typescript
/**
 * @swagger
 * /api/v1/your-endpoint:
 *   get:
 *     summary: Your endpoint description
 *     responses:
 *       200:
 *         description: Success response
 */
export class YourController {
  // Implementation
}
```

### Generating Documentation

Documentation is automatically generated when starting the server, but you can manually generate it:

```bash
npm run generate-docs
```

## Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Build and start production server
- `npm run generate-docs`: Generate Swagger documentation
- `npm run lint`: Run ESLint

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Server Error

Example error response:

```json
{
  "error": "Error message",
  "details": "Additional error details"
}
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Add/update Swagger documentation
4. Test all endpoints
5. Submit a pull request

## Testing

To run tests (when implemented):

```bash
npm test
```

## Future Improvements

- Add database integration for storing black hole data
- Implement caching for frequently requested black hole information
- Add rate limiting for API endpoints
- Expand black hole information fields (e.g., event horizon size, distance from Earth)
- Add user authentication and authorization
- Add more comprehensive error handling
- Implement logging system for better debugging
- Add more data sources for black hole information

## License

MIT License

## Author

Your Name

## Acknowledgments

- Wikipedia for black hole data
- Express.js community
- TypeScript team
