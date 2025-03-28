// Route für Informationen der Schwarzen Löcher

import { Router } from "express";
import { blackHoleController } from "../controllers/blackHoleController";

// Erstellt eine neue Router-Instanz
const router = Router();


// Wenn eine Anfrage  gesendet wird, ruft sie die Methode getBlackHoleInfo des Controllers auf
router.get("/:name", blackHoleController.getBlackHoleInfo);

// Exportiert den Router mit dem Namen "blackHoleRoutes"
export { router as blackHoleRoutes };
