import { Router } from "express";
import { particleController } from "../controllers/particleController";

// Erstellt eine neue Router-Instanz
const router = Router();

// Definiert die CRUD-Routen für Partikel
router.get("/particles", particleController.getAllParticles);
router.get("/particles/:id", particleController.getParticleById);
router.post("/particles", particleController.createParticle);
router.put("/particles/:id", particleController.updateParticle);
router.delete("/particles/:id", particleController.deleteParticle);

// Exportiert den Router mit dem Namen "particleRoutes"
export default router;
