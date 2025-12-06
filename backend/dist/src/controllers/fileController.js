import { deleteFileFromS3, generatePresignedPutUrl, } from "../services/s3Service.js";
const getPresignedPutUrl = async (req, res) => {
    try {
        const { fileType, fileName, donorType } = req.query;
        if (!fileType || !fileName) {
            return res.status(400).json({ error: "Missing fileType or fileName" });
        }
        const { signedUrl, key } = await generatePresignedPutUrl(fileType, fileName, donorType);
        res.json({ signedUrl, key });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to generate signed URL" });
    }
};
// Note: getPresignedGetUrl removed - use CloudFront for file viewing
const deleteFile = async (req, res) => {
    try {
        const { key } = req.query;
        if (!key) {
            return res.status(400).json({ error: "Missing key parameter" });
        }
        await deleteFileFromS3(key);
        res.json({ message: "File deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete file" });
    }
};
export default {
    getPresignedPutUrl,
    deleteFile,
};
