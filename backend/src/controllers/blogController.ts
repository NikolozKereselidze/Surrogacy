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

export default { getBlogPosts, getBlogPostsCount, createBlogPost };
