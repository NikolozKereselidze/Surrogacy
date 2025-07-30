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
  const [mainImage, setMainImage] = useState<string | null>(
    donor.mainImagePath
  );

  return (
    <>
      <Navigation />
      <div className={styles.donorCardContainer}>
        <div className={styles.donorCard}>
          {/* Left Section - Main Image & Actions */}
          <div className={styles.leftSection}>
            <div className={styles.mainImageContainer}>
              <img
                src={`${CLOUDFRONT_DOMAIN}/${mainImage}?w=800&q=80&f=webp`}
                alt={donor.id}
                className={styles.mainImage}
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className={styles.thumbnailGallery}>
              <img
                src={`${CLOUDFRONT_DOMAIN}/${donor.mainImagePath}?w=800&q=80&f=webp`}
                alt={donor.id}
                className={styles.thumbnail}
                onClick={() => setMainImage(donor.mainImagePath)}
              />
              {donor.donorImages
                .slice(0, 3)
                .map(
                  (image: { id: string; imagePath: string }, index: number) => (
                    <div key={image.id} className={styles.thumbnail}>
                      <img
                        src={`${CLOUDFRONT_DOMAIN}/${image.imagePath}?w=150&q=80&f=webp`}
                        alt={`${donor.id} ${index + 1}`}
                        onClick={() => setMainImage(image.imagePath)}
                      />
                      {index === 2 && donor.donorImages.length > 3 && (
                        <div className={styles.moreImages}>
                          +{donor.donorImages.length - 3}
                        </div>
                      )}
                    </div>
                  )
                )}
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
