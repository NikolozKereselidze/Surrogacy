import express, { Request, Response } from "express";
import blogController from "../controllers/blogController";

const router = express.Router();

router.get("/", blogController.getBlogPosts);
router.post("/", blogController.createBlogPost);

export default router;
