import express, { Request, Response } from "express";
import fileController from "../controllers/fileController";

const router = express.Router();

router.get("/", fileController.getPresignedUrl);

export default router;
