"use client";

import Button from "@/components/Button";
import styles from "@/styles/Home.module.css";
import { useTranslation } from "react-i18next";

const HomeHeroContent = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "he";

  return (
    <div className={styles.heroContent} dir={isRTL ? "rtl" : "ltr"}>
      <div className={styles.heroContentPanel}>
        <div className={styles.heroHeader}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleMain}>
              {t("homepage.heroTitle.main")}
            </span>
            <span className={styles.heroTitleHighlight}>
              {t("homepage.heroTitle.highlight")}
            </span>
          </h1>
          <p className={styles.heroSubtitle}>{t("homepage.heroSubtitle")}</p>
        </div>
        <p className={styles.heroDescription}>{t("homepage.heroDescription")}</p>
        <Button
          className={styles.heroButton}
          onClick={() => {
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          {t("homepage.startJourneyButton")}
        </Button>
      </div>
    </div>
  );
};

export default HomeHeroContent;
