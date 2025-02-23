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
export class UserController {
  public getUserName(req: Request, res: Response): void {
    res.json({
      name: "User Name Lauch",
    });
  }
}

export const userController = new UserController();
