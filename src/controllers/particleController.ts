import { Request, Response } from "express";
import { prisma } from "../app";

export class ParticleController {
  /**
   * @swagger
   * /particles:
   *   get:
   *     summary: Get all particles
   *     tags: [Particles]
   */
  public async getAllParticles(req: Request, res: Response): Promise<void> {
    try {
      const particles = await prisma.particle.findMany();
      res.json(particles);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /**
   * @swagger
   * /particles/{id}:
   *   get:
   *     summary: Get particle by ID
   *     tags: [Particles]
   */
  public async getParticleById(req: Request, res: Response): Promise<void> {
    try {
      const particle = await prisma.particle.findUnique({
        where: { id: Number(req.params.id) },
      });
      if (!particle) {
        res.status(404).json({ message: "Particle not found" });
        return;
      }
      res.json(particle);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /**
   * @swagger
   * /particles:
   *   post:
   *     summary: Create particle
   *     tags: [Particles]
   */
  public async createParticle(req: Request, res: Response): Promise<void> {
    try {
      const particle = await prisma.particle.create({
        data: req.body,
      });
      res.status(201).json(particle);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /**
   * @swagger
   * /particles/{id}:
   *   put:
   *     summary: Update particle
   *     tags: [Particles]
   */
  public async updateParticle(req: Request, res: Response): Promise<void> {
    try {
      const particle = await prisma.particle.update({
        where: { id: Number(req.params.id) },
        data: req.body,
      });
      res.json(particle);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /**
   * @swagger
   * /particles/{id}:
   *   delete:
   *     summary: Delete particle
   *     tags: [Particles]
   */
  public async deleteParticle(req: Request, res: Response): Promise<void> {
    try {
      await prisma.particle.delete({
        where: { id: Number(req.params.id) },
      });
      res.json({ message: "Particle deleted successfully" });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export const particleController = new ParticleController();
