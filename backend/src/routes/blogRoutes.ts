import express, { Request, Response } from "express";
import blogController from "../controllers/blogController";

const router = express.Router();

router.get("/", blogController.getBlogPosts);
router.post("/", blogController.createBlogPost);
router.get("/count", blogController.getBlogPostsCount);
router.put("/:id", blogController.updateBlogPost);
router.delete("/:id", blogController.deleteBlogPost);

router.post("/image", blogController.generateBlogImageUploadUrl);
router.get("/image", blogController.getBlogImage);      
export default router;
