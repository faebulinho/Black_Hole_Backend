const Particle = require("../models/particle");

const particleController = {
  // Create particle
  createParticle: async (req, res) => {
    try {
      const particle = new Particle(req.body);
      await particle.save();
      res.status(201).json(particle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all particles
  getAllParticles: async (req, res) => {
    try {
      const particles = await Particle.find();
      res.json(particles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get particle by ID
  getParticleById: async (req, res) => {
    try {
      const particle = await Particle.findById(req.params.id);
      if (!particle)
        return res.status(404).json({ message: "Particle not found" });
      res.json(particle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update particle
  updateParticle: async (req, res) => {
    try {
      const particle = await Particle.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!particle)
        return res.status(404).json({ message: "Particle not found" });
      res.json(particle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete particle
  deleteParticle: async (req, res) => {
    try {
      const particle = await Particle.findByIdAndDelete(req.params.id);
      if (!particle)
        return res.status(404).json({ message: "Particle not found" });
      res.json({ message: "Particle deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = particleController;
