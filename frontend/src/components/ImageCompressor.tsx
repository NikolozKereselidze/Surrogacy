import React, { useRef, useState } from "react";

interface ImageCompressorProps {
  onCompressed?: (file: File) => void;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  label?: string;
}

const ImageCompressor: React.FC<ImageCompressorProps> = ({
  onCompressed,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.7,
  label = "Upload Image",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImage = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
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
            setPreview(URL.createObjectURL(blob));
            onCompressed?.(compressedFile);
          },
          "image/webp",
          quality
        );
      };
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImage(file);
  };

  return (
    <>
      <label htmlFor={label}>{label}: </label>
      <input
        id={label}
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      {preview && (
        <div style={{ marginTop: "10px" }}>
          <strong>Compressed Preview:</strong>
          <br />
          <img
            src={preview}
            alt="Compressed"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </div>
      )}
    </>
  );
};

export default ImageCompressor;
