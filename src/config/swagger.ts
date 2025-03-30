import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';
import YAML from 'yamljs';

// Swagger definition
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Black Hole Simulation API',
      version: '1.0.0',
      description: 'API documentation for the Black Hole Simulation project',
      contact: {
        name: 'Developer',
        email: 'your.email@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server',
      },
    ],
  },
  // Path to the API docs
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
    './src/models/*.ts',
  ],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Create the swagger.json file
const swaggerJson = JSON.stringify(swaggerSpec, null, 2);
const outputDir = path.resolve(__dirname, '../../src/swagger');

// Ensure the directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the JSON file
fs.writeFileSync(path.resolve(outputDir, 'swagger.json'), swaggerJson);

// Also generate YAML version (optional)
const swaggerYaml = YAML.stringify(swaggerSpec, 10);
fs.writeFileSync(path.resolve(outputDir, 'swagger.yaml'), swaggerYaml);

console.log('Swagger documentation generated!');

export { swaggerSpec };