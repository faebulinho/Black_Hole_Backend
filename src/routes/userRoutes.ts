// User Endpoint für zukünfitge Anmeldung mit Passwort usw.

// Importiert den Router von Express, um Endpunkte zu definieren
import { Router } from "express";
import { userController, UserController } from "../controllers/userController";

// Erstellt eine neue Instanz eines Express-Routers
const router = Router();

// Definiert eine GET-Route für "/name", die die Methode getUserName aufruft
router.get("/name", userController.getUserName);

// Exportiert die Router-Instanz unter dem Namen "userRoutes"
export { router as userRoutes };

