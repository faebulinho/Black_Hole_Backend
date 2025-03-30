/**
 * Definiert die API-Routen für die Benutzerverwaltung mit vollständigen CRUD-Operationen für Benutzerkonten der Schwarze-Loch-Simulationsanwendung.
 */
import { Router } from "express";
import { userController } from "../controllers/userController";

// Erstellt eine neue Router-Instanz
const router = Router();

// CRUD-Routen für Benutzer
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// Exportiert den Router mit dem Namen "userRoutes"
export { router as userRoutes };
