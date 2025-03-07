// Klasse für Controller für API-Anfragen zum Abrufen von Informationen über ein Schwarzes Loch anhand seines Namens

import { Request, Response } from "express";
import { blackHoleService } from "../services/blackHoleService";


//Kommentar für automatische Swagger Dokumentation

/**
 * @swagger
 * /blackholes/{name}:
 *   get:
 *     summary: Get black hole information
 *     description: Retrieves information about a specific black hole by name
 *     tags:
 *       - Black Holes
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the black hole
 *         example: "Sagittarius A*"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 mass:
 *                   type: string
 *                 source:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 details:
 *                   type: string
 */



// Controller für API-Anfragen zum Abrufen von Informationen über ein Schwarzes Loch anhand seines Namens
export class BlackHoleController {
  public async getBlackHoleInfo(req: Request, res: Response): Promise<void> {
    try {
      // Extrahiere den Namen des Schwarzen Lochs aus der URL
      const name = req.params.name;
      if (!name) {
        // Falls kein Name angegeben wurde, sende eine Fehlermeldung mit Status 400 (Bad Request)
        res.status(400).json({ error: "Black hole name is required" });
        return;
      }

      // Rufe die Informationen zum Schwarzen Loch aus dem Service ab
      const info = await blackHoleService.getBlackHoleInfo(name);

      // Falls keine Daten gefunden wurden, sende eine 404-Fehlermeldung (Not Found)
      if (info.error) {
        res.status(404).json(info);
        return;
      }

      // Sende die gefundenen Informationen als JSON-Antwort zurück
      res.json(info);
    } catch (error) {
      // Fehlerbehandlung bei  Problemen
      console.error("Error fetching black hole info:", error);
      res.status(500).json({
        error: "Failed to fetch black hole information",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

// Erstelle eine Instanz des Controllers für den Export
export const blackHoleController = new BlackHoleController();
