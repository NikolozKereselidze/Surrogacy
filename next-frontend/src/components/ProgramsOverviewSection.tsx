"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
import styles from "@/styles/ProgramsOverviewSection.module.css";
import { useLocale } from "@/hooks/useLocale";
import { PROGRAMS_CONFIG } from "@/config/programsOverviewConfig";

const ProgramsOverviewSection = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  // Memoize translation-heavy data
  const programs = useMemo(
    () =>
      PROGRAMS_CONFIG.map((item) => ({
        ...item,
        title: t(item.titleKey),
        description: t(item.descriptionKey),
        features: t(item.featuresKey, { returnObjects: true }) as string[],
        buttonText: t(item.buttonTextKey),
      })),
    [t]
  );

  const cta = useMemo(
    () => ({
      title: t("programsOverview.ctaTitle"),
      text: t("programsOverview.ctaText"),
      button: t("programsOverview.contactUs"),
    }),
    [t]
  );

  return (
    <section id="programs" className={`${styles.programsSection} section`}>
      <div className="content">
        <h2 className="title">{t("programsOverview.title")}</h2>
        <p className="subtitle">{t("programsOverview.subtitle")}</p>
      </div>

      <div className={styles.programsGrid}>
        {programs.map((program) => {
          const Icon = program.icon;

          return (
            <div key={program.href} className={styles.programCard}>
              <div className={styles.programHeader}>
                <div className={styles.programIconContainer}>
                  <Icon className={styles.programIcon} />
                </div>
                <h3 className={styles.programTitle}>{program.title}</h3>
              </div>

              <p className={styles.programDescription}>{program.description}</p>

              <ul className={styles.programFeatures}>
                {program.features.map((feature) => (
                  <li key={feature} className={styles.programFeature}>
                    <span className={styles.featureBullet}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className={styles.programFooter}>
                <Button
                  href={`/${locale}${program.href}`}
                  className={styles.programButton}
                >
                  {program.buttonText}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h3 className={styles.ctaTitle}>{cta.title}</h3>
          <p className={styles.ctaText}>{cta.text}</p>
          <Button
            className={styles.ctaButton}
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            {cta.button}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsOverviewSection;
