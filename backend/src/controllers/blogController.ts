import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBlogPosts = async (req: Request, res: Response) => {
  const blogPosts = await prisma.blogPost.findMany();
  res.json(blogPosts);
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

export default { getBlogPosts, createBlogPost };
