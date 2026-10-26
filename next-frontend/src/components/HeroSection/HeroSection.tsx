"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "@/styles/HeroSection.module.css";
import StatisticsSection from "@/components/StatisticsSection";
const HeroSection = () => {
    const { t } = useTranslation();
    return (<section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.eyebrowBadge}>
          <span className={styles.eyebrowDot} aria-hidden="true"/>
          <span className={styles.eyebrowText}>
            {t("homepage.experienceSection.eyebrow")}
          </span>
        </div>

        <div className={styles.headline}>
          <p className={styles.headlineLine1}>
            {t("homepage.heroTitle.together")}, {t("homepage.heroTitle.weMake")}
          </p>
          <p className={styles.headlineGradient}>
            {t("homepage.heroTitle.miracles")}
          </p>
        </div>

        <p className={styles.subtitle}>
          {t("homepage.heroSubtitle.compassionate")}
          {t("homepage.heroSubtitle.tailored")}
          {t("homepage.heroSubtitle.journey")}
        </p>

        <div className={styles.ctaRow}>
          <Link href="/contact" className={styles.primaryBtn}>
            {t("homepage.startJourneyButton")}
          </Link>
          <Link href="/about" className={styles.secondaryBtn}>
            {t("homepage.learnMoreButton", "Learn More")}
          </Link>
        </div>
      </div>

      <div className={styles.statsStrip}>
        <StatisticsSection />
      </div>
    </section>);
};
export default HeroSection;
