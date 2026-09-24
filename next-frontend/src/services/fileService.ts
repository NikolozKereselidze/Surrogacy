export type DonorAssetCategory = "main-image" | "secondary-image" | "document";

export const uploadFileToS3 = async (file: File, type: "image" | "document", donorType: string, profileId: string, assetCategory: DonorAssetCategory) => {
    try {
        const query = new URLSearchParams({
            fileType: file.type,
            fileName: file.name,
            donorType,
            profileId,
            assetCategory,
        });
        const response = await fetch(`/api/file?${query}`, { method: "POST" });
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.error || "Failed to prepare file upload");
        }
        const { signedUrl, key } = await response.json();
        const uploadResponse = await fetch(signedUrl, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": file.type,
            },
        });
        if (!uploadResponse.ok) {
            throw new Error(uploadResponse.statusText || "Failed to upload file to S3");
        }
        return key;
    }
    catch (error) {
        console.error(`Error uploading ${type}:`, error);
        throw error;
    }
};
export const deleteFileFromS3 = async (filePath: string) => {
    if (!filePath)
        return;
    try {
        const query = new URLSearchParams({ key: filePath });
        const response = await fetch(`/api/file?${query}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            console.error("Failed to delete file from S3");
        }
    }
    catch (error) {
        console.error("Error deleting file from S3:", error);
    }
};
