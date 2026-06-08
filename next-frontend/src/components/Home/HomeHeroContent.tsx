"use client";

import Button from "@/components/Button";
import styles from "@/styles/Home.module.css";
import { useTranslation } from "react-i18next";

const HomeHeroContent = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "he";

  return (
    <div className={styles.heroContent} dir={isRTL ? "rtl" : "ltr"}>
      <div className={styles.heroHeader}>
        <h1 className={styles.heroTitle}>
          <span className={styles.highlight}>
            {t("homepage.heroTitle.together")}
          </span>
          , {t("homepage.heroTitle.weMake")}{" "}
          {t("homepage.heroTitle.miracles")}
        </h1>
        <h2 className={styles.heroSubtitle}>
          {t("homepage.heroSubtitle.compassionate")} <br />
          <span className={styles.highlight}>
            {t("homepage.heroSubtitle.tailored")}
          </span>{" "}
          {t("homepage.heroSubtitle.journey")}
        </h2>
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
  );
};

export default HomeHeroContent;
