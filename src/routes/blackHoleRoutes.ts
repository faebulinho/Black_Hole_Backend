// Route für Informationen der Schwarzen Löcher

import { Router } from "express";
import { blackHoleController } from "../controllers/blackHoleController";

const router = Router(); // Erstellt eine neue Router-Instanz


// Wenn eine Anfrage  gesendet wird, ruft sie die Methode getBlackHoleInfo des Controllers auf
router.get("/:name", blackHoleController.getBlackHoleInfo);

export { router as blackHoleRoutes }; // Exportiert den Router mit dem Namen "blackHoleRoutes"
