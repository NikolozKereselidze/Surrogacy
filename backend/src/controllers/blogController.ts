import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBlogPosts = async (req: Request, res: Response) => {
  const blogPosts = await prisma.blogPost.findMany();
  res.json(blogPosts);
};

const getBlogPostsCount = async (req: Request, res: Response) => {
  try {
    const count = await prisma.blogPost.count();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to get blog posts count" });
  }
};

const createBlogPost = async (req: Request, res: Response) => {
  const { link, title, excerpt, date, category, readTime, content, imagePath } =
    req.body;
  const blogPost = await prisma.blogPost.create({
    data: {
      link,
      title,
      excerpt,
      date,
      category,
      readTime,
      content,
      imagePath,
    },
  });
  res.json(blogPost);
};

const updateBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { link, title, excerpt, date, category, readTime, content, imagePath } =
    req.body;

  try {
    const blogPost = await prisma.blogPost.update({
      where: { id },
      data: {
        link,
        title,
        excerpt,
        date,
        category,
        readTime,
        content,
        imagePath,
      },
    });
    res.json(blogPost);
  } catch (error) {
    res.status(404).json({ error: "Blog post not found" });
  }
};

const deleteBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.blogPost.delete({
      where: { id },
    });
    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Blog post not found" });
  }
};

export default {
  getBlogPosts,
  getBlogPostsCount,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
