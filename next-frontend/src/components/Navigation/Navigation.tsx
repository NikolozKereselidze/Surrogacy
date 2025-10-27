"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "@/styles/Navigation/Navigation.module.css";
import MobileNavigation from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";
import { useLocale } from "@/hooks/useLocale";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [isMobile, setIsMobile] = useState(false);
  const { i18n } = useTranslation();
  const locale = useLocale();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1248); // adjust breakpoint as needed
    };

    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <nav
      className={styles.navigation}
      dir={i18n.language === "he" ? "rtl" : "ltr"}
    >
      <div>
        <Link href={`/${locale}`} className={styles.logo}>
          Miracle Makers
        </Link>
      </div>
      {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
    </nav>
  );
}
