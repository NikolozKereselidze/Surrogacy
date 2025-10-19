"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "@/styles/Navigation/Navigation.module.css";
import MobileNavigation from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";
import { useLocale } from "@/hooks/useLocale";

export default function Navigation() {
  const { i18n } = useTranslation();
  const locale = useLocale();
  return (
    <nav
      className={styles.navigation}
      dir={i18n.language === "he" ? "rtl" : "ltr"}
    >
      <div className={styles.logoContainer}>
        <Link href={`/${locale}`} className={styles.logo}>
          Miracle Makers
        </Link>
      </div>

      {/* Render both, CSS handles which is visible */}
      <div className={styles.desktopOnly}>
        <DesktopNavigation />
      </div>

      <div className={styles.mobileOnly}>
        <MobileNavigation />
      </div>
    </nav>
  );
}
