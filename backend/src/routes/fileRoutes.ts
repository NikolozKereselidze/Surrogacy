import express, { Request, Response } from "express";
import fileController from "../controllers/fileController";

const router = express.Router();

router.post("/", fileController.getPresignedPutUrl);
router.delete("/", fileController.deleteFile);

export default router;
