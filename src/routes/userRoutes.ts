import { Router } from "express";
import { userController, UserController } from "../controllers/userController";

const router = Router();

router.get("/name", userController.getUserName);

export { router as userRoutes };
