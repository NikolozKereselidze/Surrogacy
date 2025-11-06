"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

interface ImageCompressorProps {
  onCompressed?: (file: File) => void;
  onMultipleCompressed?: (files: File[]) => void;
  multiple?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  label?: string;
}

const ImageCompressor: React.FC<ImageCompressorProps> = ({
  onCompressed,
  onMultipleCompressed,
  multiple = false,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.7,
  label = "Upload Image",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
          if (!ctx) return;

          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (!blob) return;
              const compressedFile = new File([blob], file.name, {
                type: blob.type,
              });
              resolve(compressedFile);
            },
            "image/webp",
            quality
          );
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

    // Append instead of replace
    setCompressedFiles((prev) => [...prev, ...compressedFilesArray]);
    setPreviews((prev) => [...prev, ...previewUrls]);

    // Append for parent too
    onMultipleCompressed?.(compressedFilesArray);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (multiple) {
      await handleMultipleImages(files);
    } else {
      await handleSingleImage(files[0]);
    }
  };

  const removeImage = (index: number) => {
    const newCompressedFiles = compressedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setCompressedFiles(newCompressedFiles);
    setPreviews(newPreviews);
    onMultipleCompressed?.(newCompressedFiles);
  };

  return (
    <>
      <label htmlFor={label}>{label}: </label>
      <input
        id={label}
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept="image/*"
        onChange={handleChange}
      />

      {/* Single image preview */}
      {!multiple && preview && (
        <div style={{ marginTop: "10px" }}>
          <strong>Compressed Preview:</strong>
          <br />
          <Image
            src={preview}
            alt="Compressed"
            width={120}
            height={120}
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </div>
      )}

      {/* Multiple images preview */}
      {multiple && previews.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <strong>Compressed Previews ({previews.length} images):</strong>
          <br />
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "5px",
            }}
          >
            {previews.map((preview, index) => (
              <div key={index} style={{ position: "relative" }}>
                <Image
                  src={preview}
                  alt={`Compressed ${index + 1}`}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "75px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                  width={120}
                  height={120}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    fontSize: "12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCompressor;
