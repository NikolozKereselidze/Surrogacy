import { Request, Response } from "express";
import { generatePresignedPutUrl } from "../services/s3Service";

const getPresignedUrl = async (req: Request, res: Response): Promise<any> => {
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

export default {
  getPresignedUrl,
};
