"use client";

import { useState, useEffect } from "react";
import ImageCompressor from "../ImageCompressor";
import { uploadFileToS3, deleteFileFromS3 } from "@/services/fileService";
import { Donor, DonorFormData, DonorUrls } from "@/types/donor";
import styles from "@/styles/Admin/AdminDashboard.module.css";
import Image from "next/image";

interface DonorFormProps {
  donorType: string;
  config: {
    title: string;
    color: string;
  };
  editingDonor: Donor | null;
  donorUrls: Record<string, DonorUrls>;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}

const DonorForm = ({
  donorType,
  config,
  editingDonor,
  donorUrls,
  onSubmit,
  onCancel,
}: DonorFormProps) => {
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [secondaryImageFiles, setSecondaryImageFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<DonorFormData>({
    height: "",
    weight: "",
    age: "",
    available: true,
    documentPath: "",
    mainImagePath: "",
    secondaryImages: [],
  });

  // Initialize form data when editing
  useEffect(() => {
    if (editingDonor) {
      setFormData({
        height: editingDonor.databaseUser.height.toString(),
        weight: editingDonor.databaseUser.weight.toString(),
        age: editingDonor.databaseUser.age.toString(),
        available: editingDonor.databaseUser.available,
        documentPath: editingDonor.databaseUser.documentPath || "",
        mainImagePath: editingDonor.databaseUser.mainImagePath || "",
        secondaryImages: editingDonor.databaseUser.donorImages.map(
          (img) => img.imagePath
        ),
      });
    } else {
      setFormData({
        height: "",
        weight: "",
        age: "",
        available: true,
        documentPath: "",
        mainImagePath: "",
        secondaryImages: [],
      });
    }

    // Reset file states when editing donor changes
    resetFileStates();
  }, [editingDonor]);

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentFile(file);
    }
  };

  const handleMainImageChange = (file: File) => {
    setMainImageFile(file);
  };

  const handleSecondaryImagesChange = (files: File[]) => {
    setSecondaryImageFiles(files);
  };

  const resetFileStates = () => {
    setDocumentFile(null);
    setMainImageFile(null);
    setSecondaryImageFiles([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageKey = "";
      let documentKey = "";
      const secondaryImageKeys: string[] = [];
      const filesToDelete: string[] = [];

      // Upload files to S3 if they exist
      if (mainImageFile) {
        // If editing and there's an existing main image, mark it for deletion
        if (editingDonor && editingDonor.databaseUser.mainImagePath) {
          filesToDelete.push(editingDonor.databaseUser.mainImagePath);
        }
        imageKey = await uploadFileToS3(mainImageFile, "image", donorType);
      }

      if (documentFile) {
        // If editing and there's an existing document, mark it for deletion
        if (editingDonor && editingDonor.databaseUser.documentPath) {
          filesToDelete.push(editingDonor.databaseUser.documentPath);
        }
        documentKey = await uploadFileToS3(documentFile, "document", donorType);
      }

      // Handle secondary images
      if (secondaryImageFiles.length > 0) {
        // If editing and there are existing secondary images, mark them for deletion
        if (editingDonor && editingDonor.databaseUser.donorImages) {
          editingDonor.databaseUser.donorImages
            .filter((img) => !img.isMain)
            .forEach((img) => filesToDelete.push(img.imagePath));
        }

        // Upload new secondary images
        for (const file of secondaryImageFiles) {
          const key = await uploadFileToS3(file, "image", donorType);
          secondaryImageKeys.push(key);
        }
      }

      // If editing and no new files uploaded, preserve existing files
      if (editingDonor) {
        if (!imageKey && editingDonor.databaseUser.mainImagePath) {
          imageKey = editingDonor.databaseUser.mainImagePath;
        }
        if (!documentKey && editingDonor.databaseUser.documentPath) {
          documentKey = editingDonor.databaseUser.documentPath;
        }
        // If no new secondary images uploaded, preserve existing ones
        if (
          secondaryImageKeys.length === 0 &&
          editingDonor.databaseUser.donorImages
        ) {
          editingDonor.databaseUser.donorImages
            .filter((img) => !img.isMain)
            .forEach((img) => secondaryImageKeys.push(img.imagePath));
        }
      }

      const submitData = {
        ...formData,
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        age: parseInt(formData.age),
        mainImagePath: imageKey,
        documentPath: documentKey,
        secondaryImages: secondaryImageKeys,
      };

      await onSubmit(submitData);

      // Reset file states after successful submission
      resetFileStates();

      // Delete old files after successful submission
      for (const filePath of filesToDelete) {
        try {
          await deleteFileFromS3(filePath);
        } catch (error) {
          console.error(`Error deleting old file ${filePath}:`, error);
          // Don't throw here as the main operation succeeded
        }
      }
    } catch (error) {
      console.error("Error saving donor:", error);
    }
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <h2>
          {editingDonor
            ? `Edit ${config.title.slice(0, -1)}`
            : `Add New ${config.title.slice(0, -1)}`}
        </h2>
        <form onSubmit={handleSubmit} className={styles.blogForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                placeholder="e.g., 28"
                min="18"
                max="50"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="height">Height (cm)</label>
              <input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
                placeholder="e.g., 165"
                min="140"
                max="200"
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="weight">Weight (kg)</label>
              <input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                placeholder="e.g., 60"
                min="30"
                max="220"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="available">Available</label>
              <select
                id="available"
                value={formData.available.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    available: e.target.value === "true",
                  })
                }
                required
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="document">Document</label>
              {editingDonor && (
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#666",
                    marginBottom: "5px",
                  }}
                >
                  Leave empty to keep current document
                </p>
              )}
              <input
                id="document"
                type="file"
                onChange={handleDocumentChange}
                accept=".pdf,.doc,.docx"
              />
              {/* Show current document if editing */}
              {editingDonor && donorUrls[editingDonor.id]?.documentUrl && (
                <div style={{ marginTop: "10px" }}>
                  <strong>Current Document:</strong>
                  <br />
                  <a
                    href={donorUrls[editingDonor.id].documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--color-primary)",
                      textDecoration: "underline",
                      fontSize: "0.9rem",
                    }}
                  >
                    View Current Document
                  </a>
                </div>
              )}
            </div>
            <div className={styles.formGroup}>
              <ImageCompressor
                onCompressed={handleMainImageChange}
                label="Choose Main Profile Image"
                maxWidth={1200}
                maxHeight={800}
                quality={0.9}
              />
              {editingDonor && (
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#666",
                    marginTop: "5px",
                  }}
                >
                  Leave empty to keep current image
                </p>
              )}
              {/* Show current image if editing */}
              {editingDonor && donorUrls[editingDonor.id]?.mainImageUrl && (
                <div style={{ marginTop: "10px" }}>
                  <strong>Current Main Image:</strong>
                  <br />
                  <Image
                    src={donorUrls[editingDonor.id].mainImageUrl || ""}
                    alt="Current"
                    width={200}
                    height={150}
                    style={{
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginTop: "5px",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <ImageCompressor
                multiple
                onMultipleCompressed={handleSecondaryImagesChange}
                label="Choose Secondary Images"
                maxWidth={1200}
                maxHeight={800}
                quality={0.9}
              />
              {editingDonor && (
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#666",
                    marginTop: "5px",
                  }}
                >
                  Leave empty to keep current secondary images
                </p>
              )}
              {/* Show current secondary images if editing */}
              {editingDonor &&
                donorUrls[editingDonor.id]?.secondaryImageUrls &&
                donorUrls[editingDonor.id].secondaryImageUrls!.length > 0 && (
                  <div style={{ marginTop: "10px" }}>
                    <strong>Current Secondary Images:</strong>
                    <br />
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        marginTop: "5px",
                      }}
                    >
                      {donorUrls[editingDonor.id].secondaryImageUrls!.map(
                        (url, index) => (
                          <Image
                            key={index}
                            src={url}
                            alt={`Secondary ${index + 1}`}
                            width={100}
                            height={75}
                            style={{
                              maxWidth: "100px",
                              maxHeight: "75px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.saveButton}
              style={{ background: config.color }}
            >
              {editingDonor ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorForm;
