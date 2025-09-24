import styles from "../styles/Navigation.module.css";
import { useTranslation } from "react-i18next";
import MobileNavigation from "./Navigation/MobileNavigation";
import DesktopNavigation from "./Navigation/DesktopNavigation";
import { useEffect, useState } from "react";

const Navigation = () => {
  const { i18n } = useTranslation();
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 1279px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
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
        <a href="/" className={styles.logo}>
          Miracle Makers
        </a>
      </div>
      {isMobileViewport ? <MobileNavigation /> : <DesktopNavigation />}
    </nav>
  );
};

export default Navigation;
