"use client";

import styles from "@/styles/Navigation/DonorsNavigation.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

const DonorsNavigation = () => {
  const router = useRouter();

  const handleBack = () => {
    // Try going back — but if it leaves the site, go home instead
    const prev = document.referrer;

    if (prev && prev.includes(window.location.origin)) {
      router.back(); // safe internal back
    } else {
      router.push("/"); // fallback
    }
  };

  return (
    <nav className={styles.donorsNavigation}>
      <div className={styles.donorsNavigationContainer}>
        <div className={styles.donorsNavigationLogo}>
          <Link href="/">Miracle Makers</Link>
        </div>
        <div className={styles.donorsNavigationLinks}>
          <button
            className={styles.backButton}
            onClick={handleBack}
            aria-label="Go back"
          >
            <IoArrowBack />
            Back
          </button>
          <div className={styles.donorsNavigationLink}>
            <Link href="/">Home</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DonorsNavigation;
