import { Router } from "express";
import { infoController } from "../controllers/infoController";

const router = Router();

router.get("/datetime", infoController.getDateTime);
router.get("/version", infoController.getVersion);

export { router as infoRoutes };
