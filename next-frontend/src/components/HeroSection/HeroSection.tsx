"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "@/styles/HeroSection.module.css";

const STATS = [
  { value: "500+", key: "homepage.stats.babiesBorn", fallback: "Babies Born" },
  { value: "98%", key: "homepage.stats.successRate", fallback: "Success Rate" },
  {
    value: "10+",
    key: "homepage.stats.yearsExperience",
    fallback: "Years Experience",
  },
  {
    value: "30+",
    key: "homepage.stats.countriesServed",
    fallback: "Countries Served",
  },
];

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.eyebrowBadge}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          <span className={styles.eyebrowText}>
            {t("homepage.eyebrow", "Trusted Surrogacy Agency Since 2014")}
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
        {STATS.map((stat, index) => (
          <div key={stat.fallback} className={styles.statGroup}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>
                {t(stat.key, stat.fallback)}
              </span>
            </div>
            {index < STATS.length - 1 && (
              <div className={styles.statDivider} aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
