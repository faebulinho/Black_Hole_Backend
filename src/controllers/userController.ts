import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/app";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 */

export class UserController {
  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     description: Creates a new user with the provided data
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       201:
   *         description: User created successfully
   *       400:
   *         description: Bad request
   */
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await prisma.user.create({
        data: req.body,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all users
   *     description: Retrieves a list of all users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: List of users retrieved successfully
   *       500:
   *         description: Server error
   */
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Get user by ID
   *     description: Retrieves a user by their ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: User found successfully
   *       404:
   *         description: User not found
   */
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(req.params.id) },
      });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Update user
   *     description: Updates a user's information by their ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: User updated successfully
   *       400:
   *         description: Bad request
   */
  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await prisma.user.update({
        where: { id: Number(req.params.id) },
        data: req.body,
      });
      res.json(user);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Delete user
   *     description: Deletes a user by their ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: User deleted successfully
   *       500:
   *         description: Server error
   */
  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await prisma.user.delete({
        where: { id: Number(req.params.id) },
      });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export const userController = new UserController();
