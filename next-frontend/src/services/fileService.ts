export const uploadFileToS3 = async (
  file: File,
  type: "image" | "document",
  donorType: string
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/file?fileType=${file.type}&fileName=${file.name}&donorType=${donorType}`,
      {
        method: "POST",
      }
    );
    const { signedUrl, key } = await response.json();

    const uploadResponse = await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });
    if (!uploadResponse.ok) {
      throw new Error(
        uploadResponse.statusText || "Failed to upload file to S3"
      );
    }

    return key;
  } catch (error) {
    console.error(`Error uploading ${type}:`, error);
    throw error;
  }
};

export const deleteFileFromS3 = async (filePath: string) => {
  if (!filePath) return;
  try {
    const response = await fetch(
      `http://localhost:3000/api/file/?key=${filePath}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      console.error("Failed to delete file from S3");
    }
  } catch (error) {
    console.error("Error deleting file from S3:", error);
  }
};
