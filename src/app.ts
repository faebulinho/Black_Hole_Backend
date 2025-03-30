/**
 * 30.3.2025 Projekt: Schwarze Loch Simulation von Vishal Sivanathan, Miloš Maric, Fabian Boner
 * 
 * Backend: Fabian, Frontend: Miloš, Simulation: Vishal
 * 
 * 
 * Hauptdatei der Express-Anwendung für die Black Hole Simulation API=> Wichtigste Datei
 * 
 * Konfiguriert den Express-Server mit Middleware, Routen und Swagger-Dokumentation.
 * Verbindet die verschiedenen Komponenten der Anwendung und startet den Webserver.
 */

import express, { Express, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import dotenv from "dotenv";
import { infoRoutes } from "./routes/infoRoutes";
import { blackHoleRoutes } from "./routes/blackHoleRoutes";
import { userRoutes } from "./routes/userRoutes";
import { swaggerSpec } from "./config/swagger"; // Add this import
import { PrismaClient } from "@prisma/client";
import particleRoutes from "./routes/particleRoutes";
import { authRoutes } from "./routes/authRoute";


// Load environment variables
dotenv.config();

// Export PrismaClient Instanz
export const prisma = new PrismaClient();

export const app: Express = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Add CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/v1/info", infoRoutes);
app.use("/api/v1/blackholes", blackHoleRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/particles", particleRoutes);
app.use("/api/v1/auth", authRoutes);



// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
