import express from "express";
import fileController from "../controllers/fileController.js";
const router = express.Router();
router.post("/", fileController.getPresignedPutUrl);
router.delete("/", fileController.deleteFile);
export default router;
