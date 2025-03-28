const express = require("express");
const router = express.Router();
const particleController = require("../controllers/particleController");

router.post("/", particleController.createParticle);
router.get("/", particleController.getAllParticles);
router.get("/:id", particleController.getParticleById);
router.put("/:id", particleController.updateParticle);
router.delete("/:id", particleController.deleteParticle);

module.exports = router;
