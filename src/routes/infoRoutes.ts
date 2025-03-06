// Endpoint für Systeminfo, wird für unsere Webseite nicht gebraucht, war nur da um Backend auszuprobieren

//Imports sodass eine Route gebildet werden kann, mit dem InfoController
import { Router } from "express";
import { infoController } from "../controllers/infoController";

// Erstellt eine neue Router-Instanz
const router = Router();

// Definiert eine GET-Route für "/datetime", die die aktuelle Datum- und Uhrzeitinformationen zurückgibt
router.get("/datetime", infoController.getDateTime);

// Definiert eine GET-Route für "/version", die die aktuelle Version der Anwendung zurückgibt
router.get("/version", infoController.getVersion);

// Exportiert den Router unter dem Namen "infoRoutes"
export { router as infoRoutes };

