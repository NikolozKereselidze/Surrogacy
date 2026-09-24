"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CiFileOn } from "react-icons/ci";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import LoadingSpinner from "@/components/LoadingSpinner";
import styles from "@/styles/DonorCard.module.css";

const CLOUDFRONT_DOMAIN = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

interface DonorProfile {
  id: string;
  available: boolean;
  documentPath?: string;
  donorImages: { id: string; imagePath: string }[];
  height: number;
  mainImagePath?: string;
  weight: number;
  age: number;
  hairColor?: string;
  eyeColor?: string;
  relationshipStatus?: string;
  livingSituation?: string;
  children?: string;
}

interface DonorCardProps {
  donorType: "egg-donors" | "surrogate-donors" | "sperm-donors";
}

const profileCopy = {
  "egg-donors": {
    label: "Egg donor profile",
    directory: "Egg donor directory",
    backPath: "/find-egg-donor",
    intro: "A private overview of this donor’s characteristics and supporting profile information.",
  },
  "surrogate-donors": {
    label: "Surrogate profile",
    directory: "Surrogate directory",
    backPath: "/find-surrogate-donor",
    intro: "A private overview of this surrogate’s characteristics and supporting profile information.",
  },
  "sperm-donors": {
    label: "Sperm donor profile",
    directory: "Sperm donor directory",
    backPath: "/find-sperm-donor",
    intro: "A private overview of this donor’s characteristics and supporting profile information.",
  },
} as const;

function getImageUrl(path?: string) {
  if (!path || !CLOUDFRONT_DOMAIN) return null;
  return `${CLOUDFRONT_DOMAIN}/${path}`;
}

function profileCode(id: string) {
  return id.replace(/-/g, "").slice(0, 8).toUpperCase();
}

export default function DonorCard({ donorType }: DonorCardProps) {
  const [donor, setDonor] = useState<DonorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const params = useParams<{ id: string }>();
  const id = params.id;
  const copy = profileCopy[donorType];

  const fetchDonor = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/${donorType}/${id}`, { credentials: "include" });
      if (!response.ok) throw new Error("Unable to load profile");
      const data = await response.json();
      if (!data?.databaseUser) throw new Error("Profile data is unavailable");
      setDonor(data.databaseUser as DonorProfile);
      setCurrentImageIndex(0);
    } catch (fetchError) {
      console.error(fetchError);
      setError("We couldn’t load this profile right now. Please return to the directory or try again.");
    } finally {
      setLoading(false);
    }
  }, [donorType, id]);

  useEffect(() => {
    fetchDonor();
  }, [fetchDonor]);

  if (loading) {
    return <main className={styles.statePage}><LoadingSpinner size="large" /><p>Preparing profile…</p></main>;
  }

  if (!donor || error) {
    return (
      <main className={styles.statePage}>
        <span className={styles.stateIcon}>!</span>
        <h1>Profile unavailable</h1>
        <p>{error || "This profile is no longer available."}</p>
        <div className={styles.stateActions}>
          <button type="button" onClick={fetchDonor}>Try again</button>
          <Link href={copy.backPath}>Return to directory</Link>
        </div>
      </main>
    );
  }

  const allImages = [donor.mainImagePath, ...donor.donorImages.map((image) => image.imagePath)].filter((path): path is string => Boolean(path));
  const currentImage = getImageUrl(allImages[currentImageIndex]);
  const code = profileCode(id);
  const details = [
    { label: "Hair color", value: donor.hairColor || "Not provided" },
    { label: "Eye color", value: donor.eyeColor || "Not provided" },
    { label: "Relationship status", value: donor.relationshipStatus || "Not provided" },
    { label: "Living situation", value: donor.livingSituation || "Not provided" },
    { label: "Children", value: donor.children || "None provided" },
  ];

  const selectPreviousImage = () => setCurrentImageIndex((index) => (index - 1 + allImages.length) % allImages.length);
  const selectNextImage = () => setCurrentImageIndex((index) => (index + 1) % allImages.length);

  return (
    <main className={styles.profilePage}>
      <div className={styles.profileShell}>
        <div className={styles.breadcrumbs}>
          <Link href={copy.backPath}><span aria-hidden="true">←</span> {copy.directory}</Link>
          <span aria-hidden="true">/</span>
          <span>Profile {code}</span>
        </div>

        <div className={styles.profileLayout}>
          <section className={styles.gallery} aria-label="Profile images">
            <div className={styles.mainImageContainer}>
              {currentImage ? (
                <Image src={currentImage} alt={`${copy.label} ${code}`} className={styles.mainImage} fill priority sizes="(max-width: 900px) 100vw, 52vw" />
              ) : (
                <div className={styles.imagePlaceholder}><span>HF</span><p>Profile image unavailable</p></div>
              )}
              <span className={`${styles.availabilityBadge} ${donor.available ? styles.available : styles.notAvailable}`}>
                {donor.available ? "Available now" : "Currently unavailable"}
              </span>
              {allImages.length > 1 && (
                <>
                  <button className={`${styles.navButton} ${styles.prevButton}`} onClick={selectPreviousImage} aria-label="Previous image"><MdArrowBackIos /></button>
                  <button className={`${styles.navButton} ${styles.nextButton}`} onClick={selectNextImage} aria-label="Next image"><MdArrowForwardIos /></button>
                  <span className={styles.imageCounter}>{currentImageIndex + 1} / {allImages.length}</span>
                </>
              )}
            </div>

            {allImages.length > 1 && (
              <div className={styles.thumbnailGallery}>
                {allImages.map((imagePath, index) => {
                  const imageUrl = getImageUrl(imagePath);
                  return imageUrl ? (
                    <button key={`${imagePath}-${index}`} type="button" className={`${styles.thumbnailButton} ${currentImageIndex === index ? styles.activeThumbnail : ""}`} onClick={() => setCurrentImageIndex(index)} aria-label={`View image ${index + 1}`} aria-pressed={currentImageIndex === index}>
                      <Image src={imageUrl} alt="" fill sizes="96px" className={styles.thumbnail} />
                    </button>
                  ) : null;
                })}
              </div>
            )}
          </section>

          <section className={styles.profileContent}>
            <span className={styles.eyebrow}>Private profile · {code}</span>
            <h1>{copy.label}</h1>
            <p className={styles.intro}>{copy.intro}</p>

            <dl className={styles.primaryStats}>
              <div><dt>Age</dt><dd>{donor.age}<span>years</span></dd></div>
              <div><dt>Height</dt><dd>{donor.height}<span>cm</span></dd></div>
              <div><dt>Weight</dt><dd>{donor.weight}<span>kg</span></dd></div>
            </dl>

            <div className={styles.detailsSection}>
              <div className={styles.sectionHeading}><span>Profile details</span><i /></div>
              <dl className={styles.detailsGrid}>
                {details.map((detail) => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}
              </dl>
            </div>

            {donor.documentPath && (
              <a className={styles.documentLink} href={getImageUrl(donor.documentPath) || "#"} target="_blank" rel="noopener noreferrer">
                <span className={styles.documentIcon}><CiFileOn /></span>
                <span><strong>View supporting document</strong><small>Opens securely in a new tab</small></span>
                <b aria-hidden="true">↗</b>
              </a>
            )}

            <aside className={styles.privacyNote}>
              <span aria-hidden="true">✓</span>
              <p><strong>Confidential profile</strong>This information is provided for your private review. Our coordinator can answer questions and guide your next step.</p>
            </aside>
          </section>
        </div>
      </div>
    </main>
  );
}
