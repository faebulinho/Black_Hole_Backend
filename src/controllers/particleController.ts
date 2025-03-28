import { Request, Response } from "express";
import { particleService } from "./../services/particleService";

/**
 * @swagger
 * tags:
 *   name: Particles
 *   description: API endpoints for particle management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Particle:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The particle ID
 *         name:
 *           type: string
 *           nullable: true
 *           description: Optional name of the particle
 *         a:
 *           type: number
 *           format: float
 *           description: Spin value
 *         m:
 *           type: number
 *           format: float
 *           description: Mass value
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the particle was created
 *       required:
 *         - a
 *         - m
 */

export class ParticleController {
  /**
   * @swagger
   * /particles:
   *   get:
   *     summary: Get all particles
   *     description: Retrieves a list of all particles
   *     tags: [Particles]
   *     responses:
   *       200:
   *         description: List of particles retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Particle'
   *       500:
   *         description: Server error
   */
  public async getAllParticles(req: Request, res: Response): Promise<void> {
    try {
      const particles = await particleService.getAllParticles();
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
   *     description: Retrieves a particle by its ID
   *     tags: [Particles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The particle ID
   *     responses:
   *       200:
   *         description: Particle found successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Particle'
   *       404:
   *         description: Particle not found
   *       500:
   *         description: Server error
   */
  public async getParticleById(req: Request, res: Response): Promise<void> {
    try {
      const particle = await particleService.getParticleById(
        Number(req.params.id)
      );
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
   *     description: Creates a new particle with the provided data
   *     tags: [Particles]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - a
   *               - m
   *             properties:
   *               name:
   *                 type: string
   *                 nullable: true
   *                 description: Optional name of the particle
   *               a:
   *                 type: number
   *                 format: float
   *                 description: Spin value
   *               m:
   *                 type: number
   *                 format: float
   *                 description: Mass value
   *           example:
   *             name: "Electron"
   *             a: 0.5
   *             m: 0.00054
   *     responses:
   *       201:
   *         description: Particle created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Particle'
   *       400:
   *         description: Bad request
   */
  public async createParticle(req: Request, res: Response): Promise<void> {
    try {
      const { name, a, m } = req.body;

      // Check if required fields are present
      if (a === undefined || m === undefined) {
        res.status(400).json({
          error: "Missing required fields: a and m are required",
        });
        return;
      }

      const particle = await particleService.createParticle({
        name,
        a,
        m,
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
   *     description: Updates a particle's information by its ID
   *     tags: [Particles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The particle ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 nullable: true
   *                 description: Optional name of the particle
   *               a:
   *                 type: number
   *                 format: float
   *                 description: Spin value
   *               m:
   *                 type: number
   *                 format: float
   *                 description: Mass value
   *           example:
   *             name: "Updated Electron"
   *             a: 0.5
   *             m: 0.00054
   *     responses:
   *       200:
   *         description: Particle updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Particle'
   *       400:
   *         description: Bad request
   *       404:
   *         description: Particle not found
   */
  public async updateParticle(req: Request, res: Response): Promise<void> {
    try {
      const particle = await particleService.updateParticle(
        Number(req.params.id),
        req.body
      );
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
   *     description: Deletes a particle by its ID
   *     tags: [Particles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The particle ID
   *     responses:
   *       200:
   *         description: Particle deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Particle deleted successfully"
   *       404:
   *         description: Particle not found
   *       500:
   *         description: Server error
   */
  public async deleteParticle(req: Request, res: Response): Promise<void> {
    try {
      await particleService.deleteParticle(Number(req.params.id));
      res.json({ message: "Particle deleted successfully" });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export const particleController = new ParticleController();
