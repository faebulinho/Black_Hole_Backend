import fs from "fs";
import { swaggerSpec } from "../config/swagger";

// Write to file
fs.writeFileSync("swagger.json", JSON.stringify(swaggerSpec, null, 2));
console.log("Swagger JSON file generated!");
