import { Request, Response } from "express";
import { blackHoleService } from "../services/blackHoleService";
import { prisma } from "../app";

/**
 * @swagger
 * tags:
 *   name: Black Holes
 *   description: API endpoints for black hole information
 */

export class BlackHoleController {
  /**
   * @swagger
   * /blackholes/{name}:
   *   get:
   *     summary: Get black hole information
   *     description: Retrieves information about a specific black hole by name
   *     tags: [Black Holes]
   *     parameters:
   *       - in: path
   *         name: name
   *         required: true
   *         schema:
   *           type: string
   *         description: Name of the black hole
   *         example: "Mrk335"
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *                   description: Name of the black hole
   *                 mass:
   *                   type: string
   *                   description: Mass of the black hole
   *                 source:
   *                   type: string
   *                   description: Source URL of the information
   *       404:
   *         description: Black hole not found
   *       500:
   *         description: Server error
   */
  public async getBlackHoleInfo(req: Request, res: Response): Promise<void> {
    try {
      const name = req.params.name;
      if (!name) {
        res.status(400).json({ error: "Black hole name is required" });
        return;
      }

      const info = await blackHoleService.getBlackHoleInfo(name);

      if (info.error) {
        res.status(404).json(info);
        return;
      }

      res.json(info);
    } catch (error) {
      console.error("Error fetching black hole info:", error);
      res.status(500).json({
        error: "Failed to fetch black hole information",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export const blackHoleController = new BlackHoleController();
