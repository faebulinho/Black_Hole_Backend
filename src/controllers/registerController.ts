/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     description: Registers a new user in the database
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request or email already in use
 *       500:
 *         description: Server error
 */

// controllers/registerController.ts
import { Request, Response } from "express";
import { createUser } from '../services/userService';

export const registerUser = async (req: Request, res: Response) => {
    const { first_name, last_name, email, password } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: 'Bitte alle Felder ausfüllen' });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Ungültige E-Mail-Adresse' });
    }

    // Password strength validation (optional)
    if (password.length < 8) {
        return res.status(400).json({ message: 'Das Passwort muss mindestens 8 Zeichen lang sein' });
    }

    try {
        const newUser = await createUser({ first_name, last_name, email, password });
        res.status(201).json({
            message: 'Benutzer erfolgreich registriert',
            user: newUser
        });
    } catch (error: any) {
        // Check for duplicate email error
        if (error.message === 'E-Mail wird bereits verwendet') {
            return res.status(400).json({ message: error.message });
        }

        console.error('Fehler beim Erstellen des Benutzers:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
};