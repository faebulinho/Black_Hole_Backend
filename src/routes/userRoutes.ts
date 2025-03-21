import express from 'express';
import { getUserInfo } from '../controllers/userController';

const router = express.Router();

// Route zum Abrufen von Benutzerinformationen
router.get('/:userId', getUserInfo);

export { router as userRoutes };


