// Importiere benötigte Module und Abhängigkeiten
import express, { Express, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import dotenv from "dotenv";

// Importiere die Routenmodule
import { infoRoutes } from "./routes/infoRoutes";
import { blackHoleRoutes } from "./routes/blackHoleRoutes";
import { userRoutes } from "./routes/userRoutes";
import { swaggerSpec } from "./config/swagger"; // Importiere die Swagger-Spezifikation

// Lade Umgebungsvariablen aus der .env-Datei
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000; // Nutze den konfigurierten Port oder Standardport 3000

// Middleware für JSON-Parsing
app.use(express.json());

// CORS-Middleware, um Anfragen von anderen Domains zu erlauben
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Erlaubt Anfragen von allen Domains
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Integriere Swagger UI zur API-Dokumentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Registriere die API-Routen
app.use("/api/v1/info", infoRoutes);
app.use("/api/v1/blackholes", blackHoleRoutes);
app.use("/api/v1/users", userRoutes);

// Fehlerbehandlungsmiddleware für unerwartete Fehler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Logge den Fehler in der Konsole
  res.status(500).json({ error: "Something went wrong!" }); // Sende eine generische Fehlermeldung an den Client
});

// Starte den Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});

export { app };
