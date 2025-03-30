/**
 * Benutzer-Controller für die Schwarze-Loch-Simulationsanwendung
 * 
 * Dieser Controller verwaltet alle benutzerbezogenen API-Endpunkte:
 * - CRUD-Operationen für Benutzerkonten (Erstellen, Lesen, Aktualisieren, Löschen)
 * - Authentifizierung (Registrierung und Login)
 * - Benutzerprofilverwaltung
 * 
 * Die Passwörter werden mit bcryptjs gehasht gespeichert, um die Sicherheit zu gewährleisten.
 * Der Controller enthält Swagger-Dokumentation für die automatische API-Spezifikationsgenerierung.
 */

import { Request, Response } from "express";
import { userService } from "@/services/userService";
import { compare, hash } from "bcryptjs";

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
 *           description: The user ID
 *         first_name:
 *           type: string
 *           description: User's first name
 *         last_name:
 *           type: string
 *           description: User's last name
 *         email:
 *           type: string
 *           description: User's email address
 *         password_hash:
 *           type: string
 *           description: Hashed password (not returned in responses)
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was created
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password_hash
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
   *             type: object
   *             required:
   *               - first_name
   *               - last_name
   *               - email
   *               - password
   *             properties:
   *               first_name:
   *                 type: string
   *               last_name:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 format: password
   *           example:
   *             first_name: "John"
   *             last_name: "Doe"
   *             email: "john.doe@example.com"
   *             password: "password123"
   *     responses:
   *       201:
   *         description: User created successfully
   *       400:
   *         description: Bad request
   */


  /**
   * Erstellt einen neuen Benutzer in der Datenbank
   * Überprüft Pflichtfelder und hasht das Passwort
   */
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { first_name, last_name, email, password } = req.body;

      // Check if required fields are present
      if (!first_name || !last_name || !email || !password) {
        res.status(400).json({
          error:
            "Missing required fields: first_name, last_name, email, and password are required",
        });
        return;
      }

      const password_hash = await hash(password, 10);
      const user = await userService.createUser({
        first_name,
        last_name,
        email,
        password_hash,
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
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   *       500:
   *         description: Server error
   */


  /**
  * Ruft alle Benutzer aus der Datenbank ab
  * Wird nur für administrative Zwecke verwendet
  */
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
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
   *         description: The user ID
   *     responses:
   *       200:
   *         description: User found successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found
   *       500:
   *         description: Server error
   */



  /**
  * Findet einen Benutzer anhand seiner ID
  * Prüft die Existenz und gibt die Benutzerdaten zurück
  */
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.getUserById(Number(req.params.id));
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
   *         description: The user ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               first_name:
   *                 type: string
   *               last_name:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 format: password
   *           example:
   *             first_name: "John"
   *             last_name: "Doe"
   *             email: "john.updated@example.com"
   *     responses:
   *       200:
   *         description: User updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Bad request
   *       404:
   *         description: User not found
   */



  /**
  * Aktualisiert Benutzerdaten (Name, E-Mail, Passwort)
  * Hasht das neue Passwort, falls aktualisiert
  */
  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { first_name, last_name, email, password } = req.body;
      const password_hash = password ? await hash(password, 10) : undefined;
      const user = await userService.updateUser(Number(req.params.id), {
        first_name,
        last_name,
        email,
        password_hash,
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
   *         description: The user ID
   *     responses:
   *       200:
   *         description: User deleted successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Server error
   */



  /**
  * Löscht einen Benutzer aus dem System
  * Entfernt alle Benutzerdaten permanent
  */
  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await userService.deleteUser(Number(req.params.id));
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Register a new user
   *     description: Registers a new user with the provided data
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - first_name
   *               - last_name
   *               - email
   *               - password
   *             properties:
   *               first_name:
   *                 type: string
   *               last_name:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 format: password
   *           example:
   *             first_name: "Jane"
   *             last_name: "Doe"
   *             email: "jane.doe@example.com"
   *             password: "securepassword"
   *     responses:
   *       201:
   *         description: User registered successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Bad request - Email already exists or missing required fields
   */


  /**
   * Registriert einen neuen Benutzer
   * Prüft auf doppelte E-Mail-Adressen und Pflichtfelder
   */
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { first_name, last_name, email, password } = req.body;

      // Check if required fields are present
      if (!first_name || !last_name || !email || !password) {
        res.status(400).json({
          error:
            "Missing required fields: first_name, last_name, email, and password are required",
        });
        return;
      }

      const existingUser = await userService.findUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ error: "Email already exists" });
        return;
      }

      const password_hash = await hash(password, 10);
      const user = await userService.createUser({
        first_name,
        last_name,
        email,
        password_hash,
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
   * /auth/login:
   *   post:
   *     summary: Login a user
   *     description: Authenticates a user with their email and password
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 format: password
   *           example:
   *             email: "jane.doe@example.com"
   *             password: "securepassword"
   *     responses:
   *       200:
   *         description: User logged in successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Login successful"
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       401:
   *         description: Unauthorized - Invalid email or password
   *       500:
   *         description: Server error
   */


  /**
   * Authentifiziert einen Benutzer für den Login
   * Vergleicht das eingereichte Passwort mit dem gespeicherten Hash
   */
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await userService.findUserByEmail(email);
      if (!user || !(await compare(password, user.password_hash))) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }
      res.json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export const userController = new UserController();
