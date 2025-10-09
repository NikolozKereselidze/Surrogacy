import { useLocation } from "react-router-dom";
import styles from "../styles/DonorCard.module.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useState } from "react";
import { CiFileOn } from "react-icons/ci";

const CLOUDFRONT_DOMAIN = import.meta.env.VITE_CLOUDFRONT_DOMAIN;

interface Donor {
  id: string;
  available: boolean;
  documentPath: string;
  donorImages: {
    id: string;
    imagePath: string;
  }[];
  height: number;
  mainImagePath: string;
  updatedAt: string;
  weight: number;
  age: number;
  hairColor?: string;
  eyeColor?: string;
  sociability?: string;
  relationshipStatus?: string;
  livingSituation?: string;
  character?: string;
  children?: string;
}

const Donor = () => {
  const { donor }: { donor: Donor } = useLocation().state;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Create array of all images (main image + donor images)
  const allImages = [
    donor.mainImagePath,
    ...donor.donorImages.map((img) => img.imagePath),
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  return (
    <>
      <Navigation />
      <div className={styles.donorCardContainer}>
        <div className={styles.donorCard}>
          {/* Left Section - Main Image & Actions */}
          <div className={styles.leftSection}>
            <div className={styles.mainImageContainer}>
              <img
                src={`${CLOUDFRONT_DOMAIN}/${allImages[currentImageIndex]}?w=800&q=80&f=webp`}
                alt={donor.id}
                className={styles.mainImage}
                onError={(e) => {
                  console.error("Image failed to load:", e.currentTarget.src);
                }}
              />
              {allImages.length > 1 && (
                <>
                  <button
                    className={`${styles.navButton} ${styles.prevButton}`}
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    className={`${styles.navButton} ${styles.nextButton}`}
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className={styles.thumbnailGallery}>
              {allImages.map((imagePath, index) => (
                <img
                  key={index}
                  src={`${CLOUDFRONT_DOMAIN}/${imagePath}?w=150&q=80&f=webp`}
                  alt={`${donor.id} ${index + 1}`}
                  className={`${styles.thumbnail} ${
                    currentImageIndex === index ? styles.activeThumbnail : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Section - Donor Details */}
          <div className={styles.rightSection}>
            <div className={styles.donorAvailability}>
              <span
                className={
                  donor.available ? styles.available : styles.notAvailable
                }
              >
                {donor.available ? "Available" : "Not Available"}
              </span>
            </div>
            <div className={styles.attributes}>
              <div className={styles.attribute}>
                <span>Hair: </span>
                <p>{donor.hairColor || "Blonde"}</p>
              </div>
              <div className={styles.attribute}>
                <span>Eyes: </span>
                <p>{donor.eyeColor || "Brown"}</p>
              </div>
              <div className={styles.attribute}>
                <span>Height: </span>
                <p>{donor.height || "170"} cm</p>
              </div>
              <div className={styles.attribute}>
                <span>Weight: </span>
                <p>{donor.weight || "55"} kg</p>
              </div>
              <div className={styles.attribute}>
                <span>Sociability: </span>
                <p>{donor.sociability || "High"}</p>
              </div>
              <div className={styles.attribute}>
                <span>Status: </span>
                <p>{donor.relationshipStatus || "Single"}</p>
              </div>
              <div className={styles.attribute}>
                <span>Living: </span>
                <p>{donor.livingSituation || "Alone"}</p>
              </div>
              <div className={styles.attribute}>
                <span>Character: </span>
                <p>{donor.character || "Kind"}</p>
              </div>
              <div className={styles.attribute}>
                <span>Children: </span>
                <p>{donor.children || "None"}</p>
              </div>
            </div>
            {donor.documentPath && (
              <div className={styles.donorDocument}>
                <a
                  className={styles.donorDocumentLink}
                  href={`${CLOUDFRONT_DOMAIN}/${donor.documentPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CiFileOn className={styles.donorDocumentIcon} />
                  <p>View Document</p>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Donor;
