/**
 * Authentifizierungs-Routen für die Schwarze-Loch-Simulationsanwendung
 * 
 * Diese Datei definiert die API-Endpunkte für Benutzerauthentifizierung:
 * - /register: Registrierung neuer Benutzer
 * - /login: Anmeldung existierender Benutzer
 * 
 * Die Routen sind unter dem Präfix '/auth' in der Hauptanwendung eingebunden
 */

import { Router } from "express";
import { userController } from "../controllers/userController";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

export { router as authRoutes };