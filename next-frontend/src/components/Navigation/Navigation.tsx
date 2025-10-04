import styles from "@/styles/Navigation/Navigation.module.css";
import { useTranslation } from "react-i18next";
import MobileNavigation from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const Navigation = () => {
  const { i18n } = useTranslation();
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia("(max-width: 1279px)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobileViewport(e.matches);
    };

    // Initial sync and subscribe
    setIsMobileViewport(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Set RTL for Hebrew
  const isRTL = i18n.language === "he";

  return (
    <nav className={styles.navigation} dir={isRTL ? "rtl" : "ltr"}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          Miracle Makers
        </Link>
      </div>
      {isClient && isMobileViewport ? (
        <MobileNavigation />
      ) : (
        <DesktopNavigation />
      )}
    </nav>
  );
};

export default Navigation;
