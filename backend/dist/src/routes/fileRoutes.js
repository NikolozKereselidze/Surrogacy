import express from "express";
import fileController from "../controllers/fileController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/", requireAdmin, fileController.getPresignedPutUrl);
router.delete("/", requireAdmin, fileController.deleteFile);
export default router;
