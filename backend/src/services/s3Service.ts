import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const region = process.env.S3_BUCKET_REGION;
const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

if (!region || !accessKeyId || !secretAccessKey) {
  throw new Error("S3 credentials are not configured");
}

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function generatePresignedPutUrl(
  fileType: string,
  fileName: string,
  donorType?: string
) {
  const fileExtension = fileName.split(".").pop();
  const timestamp = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  // Organize files by donor type if provided
  let key: string;
  if (donorType) {
    key = `donors/${donorType}/${timestamp}/${uuidv4()}.${fileExtension}`;
  } else {
    key = `uploads/${timestamp}/${uuidv4()}.${fileExtension}`;
  }

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    ContentType: fileType,
    ACL: "private",
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour expiry

  return {
    signedUrl,
    key,
  };
}

// Note: generatePresignedGetUrl removed - use CloudFront for file viewing
// generatePresignedPutUrl kept for file uploads

export async function deleteFileFromS3(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
  });

  await s3.send(command);
}
