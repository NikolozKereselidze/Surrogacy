"use client";
import Image from "next/image";
import React, { useId, useRef, useState } from "react";
import styles from "@/styles/Admin/ImageCompressor.module.css";
interface ImageCompressorProps {
    onCompressed?: (file: File) => void;
    onMultipleCompressed?: (files: File[]) => void;
    multiple?: boolean;
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    label?: string;
}
const ImageCompressor: React.FC<ImageCompressorProps> = ({ onCompressed, onMultipleCompressed, multiple = false, maxWidth = 800, maxHeight = 800, quality = 0.7, label = "Upload Image", }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const compressedFilesRef = useRef<File[]>([]);
    const inputId = useId();
    const [preview, setPreview] = useState<string | null>(null);
    const [previews, setPreviews] = useState<string[]>([]);
    const [compressedFiles, setCompressedFiles] = useState<File[]>([]);
    const handleImage = (file: File): Promise<File> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new window.Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    let { width, height } = img;
                    const aspectRatio = width / height;
                    if (width > maxWidth) {
                        width = maxWidth;
                        height = width / aspectRatio;
                    }
                    if (height > maxHeight) {
                        height = maxHeight;
                        width = height * aspectRatio;
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    if (!ctx)
                        return;
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        if (!blob)
                            return;
                        const compressedFile = new File([blob], file.name, {
                            type: blob.type,
                        });
                        resolve(compressedFile);
                    }, "image/webp", quality);
                };
            };
        });
    };
    const handleSingleImage = async (file: File) => {
        const compressedFile = await handleImage(file);
        setPreview(URL.createObjectURL(compressedFile));
        onCompressed?.(compressedFile);
    };
    const handleMultipleImages = async (files: File[]) => {
        const compressedFilesArray: File[] = [];
        const previewUrls: string[] = [];
        for (const file of files) {
            const compressedFile = await handleImage(file);
            compressedFilesArray.push(compressedFile);
            previewUrls.push(URL.createObjectURL(compressedFile));
        }
        const updatedFiles = [...compressedFilesRef.current, ...compressedFilesArray];
        compressedFilesRef.current = updatedFiles;
        setCompressedFiles(updatedFiles);
        setPreviews((prev) => [...prev, ...previewUrls]);
        onMultipleCompressed?.(updatedFiles);
    };
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0)
            return;
        if (multiple) {
            await handleMultipleImages(files);
        }
        else {
            await handleSingleImage(files[0]);
        }
    };
    const removeImage = (index: number) => {
        const newCompressedFiles = compressedFiles.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        compressedFilesRef.current = newCompressedFiles;
        setCompressedFiles(newCompressedFiles);
        setPreviews(newPreviews);
        onMultipleCompressed?.(newCompressedFiles);
    };
    return (<div className={styles.uploader}>
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} ref={inputRef} type="file" multiple={multiple} accept="image/*" onChange={handleChange}/>

      
      {!multiple && preview && (<div className={styles.singlePreview}>
          <strong>New image preview</strong>
          <Image src={preview} alt="New upload preview" width={120} height={120}/>
        </div>)}

      
      {multiple && previews.length > 0 && (<div className={styles.multiplePreview}>
          <strong>New images ({previews.length})</strong>
          <div className={styles.previewGrid}>
            {previews.map((preview, index) => (<div key={preview} className={styles.previewItem}>
                <Image src={preview} alt={`New upload ${index + 1}`} width={120} height={90}/>
                <button type="button" onClick={() => removeImage(index)} aria-label={`Remove new image ${index + 1}`}>
                  ×
                </button>
              </div>))}
          </div>
        </div>)}
    </div>);
};
export default ImageCompressor;
