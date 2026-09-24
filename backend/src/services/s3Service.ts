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
  donorType?: string,
  profileId?: string,
  assetCategory?: string,
) {
  const requestedExtension = fileName.split(".").pop()?.toLowerCase() || "";
  const fileExtension = /^[a-z0-9]{1,10}$/.test(requestedExtension)
    ? requestedExtension
    : "bin";
  const timestamp = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  const donorTypes = new Set(["egg-donors", "sperm-donors", "surrogates"]);
  const assetFolders: Record<string, string> = {
    "main-image": "main",
    "secondary-image": "secondary",
    document: "documents",
  };

  let key: string;
  if (donorType && donorTypes.has(donorType)) {
    if (!profileId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(profileId)) {
      throw new Error("A valid profile ID is required for donor uploads");
    }
    const folder = assetCategory ? assetFolders[assetCategory] : undefined;
    if (!folder) {
      throw new Error("A valid asset category is required for donor uploads");
    }
    key = `donors/${donorType}/${profileId}/${folder}/${uuidv4()}.${fileExtension}`;
  } else if (donorType === "team-members") {
    key = `team/${timestamp}/${uuidv4()}.${fileExtension}`;
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
