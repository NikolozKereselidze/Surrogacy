"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "@/styles/Navigation/Navigation.module.css";
import MobileNavigation from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";
import { useLocale } from "@/hooks/useLocale";
export default function Navigation() {
    const { i18n } = useTranslation();
    const locale = useLocale();
    return (<nav className={styles.navigation} dir={i18n.language === "he" ? "rtl" : "ltr"}>
      <Link href={`/${locale}`} className={styles.logo} aria-label="Happy Family home">
        <Image
          src="/img/navbar-logo.webp"
          alt="Happy Family"
          width={300}
          height={100}
          priority
          className={styles.logoImage}
        />
      </Link>

      <div className={styles.desktopOnly}>
        <DesktopNavigation />
      </div>

      <div className={styles.mobileOnly}>
        <MobileNavigation />
      </div>
    </nav>);
}
