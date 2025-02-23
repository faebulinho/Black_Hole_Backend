import { Router } from "express";
import { blackHoleController } from "../controllers/blackHoleController";

const router = Router();

router.get("/:name", blackHoleController.getBlackHoleInfo);

export { router as blackHoleRoutes };
