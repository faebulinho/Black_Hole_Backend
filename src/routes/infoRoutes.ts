import { Router } from "express";
import { infoController } from "../controllers/infoController";

// Erstellt eine neue Router-Instanz
const router = Router();

// Definiert eine GET-Route für die aktuelle Uhrzeit
router.get("/datetime", infoController.getDateTime);
// Definiert eine GET-Route für die API-Version
router.get("/version", infoController.getVersion);

// Exportiert den Router mit dem Namen "infoRoutes"
export { router as infoRoutes };
