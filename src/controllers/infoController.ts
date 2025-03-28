import { Request, Response } from "express";

/**
 * @swagger
 * tags:
 *   name: Info
 *   description: API endpoints for system information
 */

export class InfoController {
  /**
   * @swagger
   * /info/datetime:
   *   get:
   *     summary: Get current date and time
   *     description: Returns the current server date and time along with timezone information
   *     tags: [Info]
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 datetime:
   *                   type: string
   *                   format: date-time
   *                 timezone:
   *                   type: string
   */
  public getDateTime(req: Request, res: Response): void {
    const currentDateTime = new Date().toISOString();
    res.json({
      datetime: currentDateTime,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }

  /**
   * @swagger
   * /info/version:
   *   get:
   *     summary: Get API version information
   *     description: Returns the current API version and environment information
   *     tags: [Info]
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 version:
   *                   type: string
   *                 environment:
   *                   type: string
   *                 nodeVersion:
   *                   type: string
   */
  public getVersion(req: Request, res: Response): void {
    res.json({
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
      nodeVersion: process.version,
    });
  }
}

export const infoController = new InfoController();
