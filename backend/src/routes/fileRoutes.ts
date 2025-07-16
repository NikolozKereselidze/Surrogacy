import express, { Request, Response } from "express";
import fileController from "../controllers/fileController";

const router = express.Router();

router.post("/", fileController.getPresignedPutUrl);
router.get("/", fileController.getPresignedGetUrl);
router.delete("/", fileController.deleteFile);

export default router;
