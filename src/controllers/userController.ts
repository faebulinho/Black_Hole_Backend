// Controller für Userinfo, wird für Anmeldung gebraucht werden

import { Request, Response } from "express";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user management
 */

/**
 * @swagger
 * /users/name:
 *   get:
 *     summary: Get user name
 *     description: Retrieves the name of the current user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved user name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                   example: "User Name Lauch"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */


// Controller für Benutzerbezogene API-Anfragen
import { fetchUserInfo } from '../services/userService';

export const getUserInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userInfo = await fetchUserInfo(userId);
    if (!userInfo) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }
    res.status(200).json(userInfo);
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzerinformationen:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
};

