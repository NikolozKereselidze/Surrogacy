"use client";
import { useState, useEffect } from "react";
import ImageCompressor from "../ImageCompressor";
import { uploadFileToS3, deleteFileFromS3 } from "@/services/fileService";
import { Donor, DonorFormData, DonorUrls } from "@/types/donor";
import styles from "@/styles/Admin/AdminDashboard.module.css";
import Image from "next/image";
const CLOUDFRONT_DOMAIN = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;
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
const DonorForm = ({ donorType, config, editingDonor, donorUrls, onSubmit, onCancel, }: DonorFormProps) => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>("");
    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [mainImageFile, setMainImageFile] = useState<File | null>(null);
    const [secondaryImageFiles, setSecondaryImageFiles] = useState<File[]>([]);
    const [storageProfileId, setStorageProfileId] = useState("");
    const [formData, setFormData] = useState<DonorFormData>({
        height: "",
        weight: "",
        age: "",
        available: true,
        hairColor: "",
        eyeColor: "",
        relationshipStatus: "",
        livingSituation: "",
        children: "",
        documentPath: "",
        mainImagePath: "",
        secondaryImages: [],
    });
    useEffect(() => {
        setStorageProfileId(editingDonor?.id || crypto.randomUUID());
        if (editingDonor) {
            setFormData({
                height: editingDonor.databaseUser.height.toString(),
                weight: editingDonor.databaseUser.weight.toString(),
                age: editingDonor.databaseUser.age.toString(),
                available: editingDonor.databaseUser.available,
                hairColor: editingDonor.databaseUser.hairColor || "",
                eyeColor: editingDonor.databaseUser.eyeColor || "",
                relationshipStatus: editingDonor.databaseUser.relationshipStatus || "",
                livingSituation: editingDonor.databaseUser.livingSituation || "",
                children: editingDonor.databaseUser.children || "",
                documentPath: editingDonor.databaseUser.documentPath || "",
                mainImagePath: editingDonor.databaseUser.mainImagePath || "",
                secondaryImages: editingDonor.databaseUser.donorImages
                    .filter((img) => !img.isMain)
                    .map((img) => img.imagePath),
            });
        }
        else {
            setFormData({
                height: "",
                weight: "",
                age: "",
                available: true,
                hairColor: "",
                eyeColor: "",
                relationshipStatus: "",
                livingSituation: "",
                children: "",
                documentPath: "",
                mainImagePath: "",
                secondaryImages: [],
            });
        }
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
    const removeKeptSecondaryImage = (imagePath: string) => {
        setFormData((prev) => ({
            ...prev,
            secondaryImages: prev.secondaryImages.filter((path) => path !== imagePath),
        }));
    };
    const resetFileStates = () => {
        setDocumentFile(null);
        setMainImageFile(null);
        setSecondaryImageFiles([]);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting)
            return;
        setSubmitting(true);
        setError("");
        const uploadedKeys: string[] = [];
        const cleanupNewUploads = async () => {
            await Promise.all(uploadedKeys.map((key) => deleteFileFromS3(key)));
        };
        try {
            const profileId = editingDonor?.id || storageProfileId;
            if (!profileId) {
                throw new Error("Profile storage ID is unavailable. Please reopen the form.");
            }
            let imageKey = "";
            let documentKey = "";
            const secondaryImageKeys = [...formData.secondaryImages];
            const filesToDelete: string[] = [];
            if (mainImageFile) {
                try {
                    if (editingDonor && editingDonor.databaseUser.mainImagePath) {
                        filesToDelete.push(editingDonor.databaseUser.mainImagePath);
                    }
                    imageKey = await uploadFileToS3(mainImageFile, "image", donorType, profileId, "main-image");
                    uploadedKeys.push(imageKey);
                }
                catch {
                    await cleanupNewUploads();
                    setError("Failed to upload main image. Please try again.");
                    setSubmitting(false);
                    return;
                }
            }
            if (documentFile) {
                try {
                    if (editingDonor && editingDonor.databaseUser.documentPath) {
                        filesToDelete.push(editingDonor.databaseUser.documentPath);
                    }
                    documentKey = await uploadFileToS3(documentFile, "document", donorType, profileId, "document");
                    uploadedKeys.push(documentKey);
                }
                catch {
                    await cleanupNewUploads();
                    setError("Failed to upload document. Please try again.");
                    setSubmitting(false);
                    return;
                }
            }
            if (secondaryImageFiles.length > 0) {
                try {
                    for (const file of secondaryImageFiles) {
                        const key = await uploadFileToS3(file, "image", donorType, profileId, "secondary-image");
                        secondaryImageKeys.push(key);
                        uploadedKeys.push(key);
                    }
                }
                catch {
                    await cleanupNewUploads();
                    setError("Failed to upload secondary images. Please try again.");
                    setSubmitting(false);
                    return;
                }
            }
            if (editingDonor) {
                if (!imageKey && editingDonor.databaseUser.mainImagePath) {
                    imageKey = editingDonor.databaseUser.mainImagePath;
                }
                if (!documentKey && editingDonor.databaseUser.documentPath) {
                    documentKey = editingDonor.databaseUser.documentPath;
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
                ...(!editingDonor && { profileId }),
            };
            try {
                await onSubmit(submitData);
                resetFileStates();
                for (const filePath of filesToDelete) {
                    try {
                        await deleteFileFromS3(filePath);
                    }
                    catch (error) {
                        console.error(`Error deleting old file ${filePath}:`, error);
                    }
                }
            }
            catch (onSubmitError) {
                await cleanupNewUploads();
                setError(onSubmitError instanceof Error
                    ? onSubmitError.message
                    : "Failed to save donor. Please try again.");
                console.error("Error saving donor:", onSubmitError);
            }
        }
        catch (error) {
            await cleanupNewUploads();
            console.error("Error saving donor:", error);
            setError("An unexpected error occurred. Please try again.");
        }
        finally {
            setSubmitting(false);
        }
    };
    return (<div className={styles.formOverlay}>
      <div className={`${styles.formContainer} ${styles.donorFormContainer}`} role="dialog" aria-modal="true" aria-labelledby="donor-form-title">
        <div className={styles.modalHeader}>
          <div><span>{editingDonor ? "Update profile" : "New profile"}</span><h2 id="donor-form-title">{editingDonor ? `Edit ${config.title.slice(0, -1)}` : `Add ${config.title.slice(0, -1)}`}</h2></div>
          <button type="button" onClick={onCancel} aria-label="Close form">×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.blogForm}>
          <section className={styles.donorFormSection}>
            <div className={styles.formSectionHeading}><h3>Profile details</h3><p>Basic characteristics and current availability.</p></div>
            <div className={styles.donorFormGrid}>
              <div className={styles.formGroup}><label htmlFor="age">Age</label><input id="age" type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} placeholder="e.g., 28" min="18" max="50" required/></div>
              <div className={styles.formGroup}><label htmlFor="height">Height (cm)</label><input id="height" type="number" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} placeholder="e.g., 165" min="140" max="200" required/></div>
              <div className={styles.formGroup}><label htmlFor="weight">Weight (kg)</label><input id="weight" type="number" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} placeholder="e.g., 60" min="30" max="220" required/></div>
              <div className={styles.formGroup}><label htmlFor="available">Availability</label><select id="available" value={formData.available.toString()} onChange={(e) => setFormData({ ...formData, available: e.target.value === "true" })} required><option value="true">Available</option><option value="false">Unavailable</option></select></div>
              <div className={styles.formGroup}><label htmlFor="hairColor">Hair color</label><input id="hairColor" type="text" value={formData.hairColor} onChange={(e) => setFormData({ ...formData, hairColor: e.target.value })} placeholder="e.g., Blonde" required/></div>
              <div className={styles.formGroup}><label htmlFor="eyeColor">Eye color</label><input id="eyeColor" type="text" value={formData.eyeColor} onChange={(e) => setFormData({ ...formData, eyeColor: e.target.value })} placeholder="e.g., Brown" required/></div>
              <div className={styles.formGroup}><label htmlFor="relationshipStatus">Relationship status</label><input id="relationshipStatus" type="text" value={formData.relationshipStatus} onChange={(e) => setFormData({ ...formData, relationshipStatus: e.target.value })} placeholder="e.g., Single" required/></div>
              <div className={styles.formGroup}><label htmlFor="livingSituation">Living situation</label><input id="livingSituation" type="text" value={formData.livingSituation} onChange={(e) => setFormData({ ...formData, livingSituation: e.target.value })} placeholder="e.g., Alone" required/></div>
              <div className={`${styles.formGroup} ${styles.fullWidthField}`}><label htmlFor="children">Children</label><input id="children" type="text" value={formData.children} onChange={(e) => setFormData({ ...formData, children: e.target.value })} placeholder="e.g., None"/></div>
            </div>
          </section>

          <section className={styles.donorFormSection}>
            <div className={styles.formSectionHeading}><h3>Documents and images</h3><p>Leave a file unchanged to keep the current version.</p></div>
            <div className={styles.assetGrid}>
              <div className={styles.assetPanel}>
                <div className={styles.formGroup}><label htmlFor="document">Profile document</label><input id="document" type="file" onChange={handleDocumentChange} accept=".pdf,.doc,.docx"/></div>
                {editingDonor && donorUrls[editingDonor.id]?.documentUrl && <a className={styles.currentDocument} href={donorUrls[editingDonor.id].documentUrl} target="_blank" rel="noopener noreferrer"><span>Current document</span><strong>Open file ↗</strong></a>}
              </div>
              <div className={styles.assetPanel}>
                <ImageCompressor onCompressed={handleMainImageChange} label="Main profile image" maxWidth={1200} maxHeight={800} quality={0.9}/>
                {editingDonor && donorUrls[editingDonor.id]?.mainImageUrl && <div className={styles.currentImage}><span>Current main image</span><Image src={donorUrls[editingDonor.id].mainImageUrl || ""} alt="Current profile" width={160} height={110}/></div>}
              </div>
              <div className={`${styles.assetPanel} ${styles.fullWidthField}`}>
                <ImageCompressor multiple onMultipleCompressed={handleSecondaryImagesChange} label="Secondary images" maxWidth={1200} maxHeight={800} quality={0.9}/>
                {editingDonor && <p className={styles.assetHelp}>Remove existing images below or select new images to add.</p>}
                {formData.secondaryImages.length > 0 && <div className={styles.currentGallery}><strong>Current secondary images</strong><div>{formData.secondaryImages.map((imagePath) => <div key={imagePath}><Image src={`${CLOUDFRONT_DOMAIN}/${imagePath}`} alt="Secondary profile" width={120} height={90}/><button type="button" onClick={() => removeKeptSecondaryImage(imagePath)} aria-label="Remove secondary image">×</button></div>)}</div></div>}
              </div>
            </div>
          </section>

          {error && <div className={styles.errorMessage} role="alert">{error}</div>}
          <div className={styles.formActions}>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>Cancel</button>
            <button type="submit" className={styles.saveButton} disabled={submitting}>{submitting ? "Saving…" : editingDonor ? "Update profile" : "Create profile"}</button>
          </div>
        </form>
      </div>
    </div>);
};
export default DonorForm;
