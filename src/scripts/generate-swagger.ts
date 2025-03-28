import fs from "fs";
import { swaggerSpec } from "../config/swagger";

// Write to file
fs.writeFileSync(
  "openapi-specification.json",
  JSON.stringify(swaggerSpec, null, 2)
);
console.log("Swagger JSON file generated!");
