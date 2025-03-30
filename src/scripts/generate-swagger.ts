// Dieses Skript generiert eine Swagger-Dokumentationsdatei (swagger.json)  
// Die Datei enthält die OpenAPI-Spezifikation und wird automatisch aus der Konfiguration erstellt  
// Für unsere Webseite keine Funktion, nur Hilfreich um Backend zu erstellen/verbessern
import fs from "fs";
import { swaggerSpec } from "../config/swagger";

// Write to file
fs.writeFileSync(
  "openapi-specification.json",
  JSON.stringify(swaggerSpec, null, 2)
);
console.log("Swagger JSON file generated!");
