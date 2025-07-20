import { Request, Response } from "express";
import {
  deleteFileFromS3,
  generatePresignedPutUrl,
} from "../services/s3Service";

const getPresignedPutUrl = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { fileType, fileName, donorType } = req.query as {
      fileType: string;
      fileName: string;
      donorType?: string;
    };

    if (!fileType || !fileName) {
      return res.status(400).json({ error: "Missing fileType or fileName" });
    }

    const { signedUrl, key } = await generatePresignedPutUrl(
      fileType,
      fileName,
      donorType
    );

    res.json({ signedUrl, key });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate signed URL" });
  }
};

// Note: getPresignedGetUrl removed - use CloudFront for file viewing

const deleteFile = async (req: Request, res: Response): Promise<any> => {
  try {
    const { key } = req.query as { key: string };

    if (!key) {
      return res.status(400).json({ error: "Missing key parameter" });
    }

    await deleteFileFromS3(key);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete file" });
  }
};

export default {
  getPresignedPutUrl,
  deleteFile,
};
