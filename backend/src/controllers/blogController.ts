import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

if (!process.env.S3_ACCESS_KEY || !process.env.S3_SECRET_ACCESS_KEY) {
  throw new Error("S3 credentials are not configured");
}

const s3 = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

const generateBlogImageUploadUrl = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { fileType } = req.body;

  if (!fileType || !fileType.startsWith("image/")) {
    return res.status(400).json({ error: "Invalid or missing fileType" });
  }

  const extension = fileType.split("/")[1];
  const key = `blogs/images/${uuidv4()}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  try {
    const uploadUrl = await getSignedUrl(s3, command);

    res.json({
      uploadUrl,
      fileUrl: key,
    });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({ error: "Could not generate signed URL" });
  }
};

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
  generateBlogImageUploadUrl,
};
