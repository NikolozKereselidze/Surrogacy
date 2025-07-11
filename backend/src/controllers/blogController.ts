import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
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

// Helper function to delete image from S3
const deleteImageFromS3 = async (imagePath: string): Promise<void> => {
  if (!imagePath) return;

  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: imagePath,
    });

    await s3.send(deleteCommand);
    console.log(`Deleted image from S3: ${imagePath}`);
  } catch (error) {
    console.error("Error deleting image from S3:", error);
    // Don't throw error, just log it
  }
};

const getBlogImage = async (req: Request, res: Response): Promise<any> => {
  const key = req.query.key as string;

  if (!key) {
    return res.status(400).json({ error: "Missing 'key' query parameter" });
  }

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });
    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 300, // URL expires in 5 minutes
    });

    res.json({ url: signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({ error: "Failed to generate signed URL" });
  }
};

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

const updateBlogPost = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { link, title, excerpt, date, category, readTime, content, imagePath } =
    req.body;

  try {
    // Get the current blog post to check if image is being changed
    const currentBlogPost = await prisma.blogPost.findUnique({
      where: { id },
      select: { imagePath: true },
    });

    if (!currentBlogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // If image is being changed, delete the old image from S3
    if (currentBlogPost.imagePath && currentBlogPost.imagePath !== imagePath) {
      await deleteImageFromS3(currentBlogPost.imagePath);
    }

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
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Failed to update blog post" });
  }
};

const deleteBlogPost = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    // First, get the blog post to retrieve the imagePath
    const blogPost = await prisma.blogPost.findUnique({
      where: { id },
      select: { imagePath: true },
    });

    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Delete the image from S3 if it exists
    await deleteImageFromS3(blogPost.imagePath);

    // Delete the blog post from database
    await prisma.blogPost.delete({
      where: { id },
    });

    res.json({
      message: "Blog post and associated image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Failed to delete blog post" });
  }
};

export default {
  getBlogPosts,
  getBlogPostsCount,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  generateBlogImageUploadUrl,
  getBlogImage,
};
