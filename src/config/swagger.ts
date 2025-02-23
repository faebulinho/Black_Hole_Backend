import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Black Hole API",
      version: "1.0.0",
      description: "API for retrieving black hole information",
    },
    servers: [
      {
        url: "http://localhost:8080/api/v1",
        description: "Local development server",
      },
    ],
  },
  // Path to the API docs
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // files containing annotations
};

export const swaggerSpec = swaggerJsdoc(options);
