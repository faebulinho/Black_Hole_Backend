/**
 * Routen-Definition für den Zugriff auf Informationen über schwarze Löcher über den Endpunkt '/:name'.
 */

import { Router } from "express"; // Importiert den Router von Express für die Definition von Routen
import { blackHoleController } from "../controllers/blackHoleController"; // Importiert den Controller, der die Logik für die Routen verarbeitet

// Erstellt eine neue Router-Instanz
const router = Router();

// Definiert eine GET-Route mit einem dynamischen Parameter ":name"
// Wenn eine Anfrage an "/:name" gesendet wird, ruft sie die Methode getBlackHoleInfo des Controllers auf
router.get("/:name", blackHoleController.getBlackHoleInfo);

// Exportiert den Router mit dem Namen "blackHoleRoutes"
export { router as blackHoleRoutes };
