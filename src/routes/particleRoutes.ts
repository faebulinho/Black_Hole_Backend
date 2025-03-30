import { Router } from "express";
import { particleController } from "../controllers/particleController";

// Erstellt eine neue Router-Instanz
const router = Router();

// Definiert die CRUD-Routen für Partikel
router.get("/", particleController.getAllParticles);
router.get("/:id", particleController.getParticleById);
router.post("/", particleController.createParticle);
router.put("/:id", particleController.updateParticle);
router.delete("/:id", particleController.deleteParticle);

// Exportiert den Router mit dem Namen "particleRoutes"
export default router;
