"use client";

import { useTranslation } from "react-i18next";
import { FaDna, FaEgg, FaSnowflake, FaCrown } from "react-icons/fa";
import Button from "@/components/Button";
import styles from "@/styles/ProgramsOverviewSection.module.css";

const ProgramsOverviewSection = () => {
  const { t } = useTranslation();

  const programs = [
    {
      icon: <FaDna className={styles.programIcon} />,
      title: t("programsOverview.program1.title"),
      description: t("programsOverview.program1.description"),
      features: t("programsOverview.program1.features", {
        returnObjects: true,
      }) as string[],
      href: "/surrogacy-with-own-gametes",
      buttonText: t("programsOverview.program1.buttonText"),
    },
    {
      icon: <FaEgg className={styles.programIcon} />,
      title: t("programsOverview.program2.title"),
      description: t("programsOverview.program2.description"),
      features: t("programsOverview.program2.features", {
        returnObjects: true,
      }) as string[],
      href: "/surrogacy-with-egg-donor",
      buttonText: t("programsOverview.program2.buttonText"),
    },
    {
      icon: <FaSnowflake className={styles.programIcon} />,
      title: t("programsOverview.program3.title"),
      description: t("programsOverview.program3.description"),
      features: t("programsOverview.program3.features", {
        returnObjects: true,
      }) as string[],
      href: "/egg-freezing-preservation",
      buttonText: t("programsOverview.program3.buttonText"),
    },
    {
      icon: <FaCrown className={styles.programIcon} />,
      title: t("programsOverview.program4.title"),
      description: t("programsOverview.program4.description"),
      features: t("programsOverview.program4.features", {
        returnObjects: true,
      }) as string[],
      href: "/vip-concierge-services",
      buttonText: t("programsOverview.program4.buttonText"),
    },
  ];

  return (
    <section id="programs" className={`${styles.programsSection} section`}>
      <div className="content">
        <h2 className="title">{t("programsOverview.title")}</h2>
        <p className="subtitle">{t("programsOverview.subtitle")}</p>
      </div>

      <div className={styles.programsGrid}>
        {programs.map((program, index) => (
          <div key={index} className={styles.programCard}>
            <div className={styles.programHeader}>
              <div className={styles.programIconContainer}>{program.icon}</div>
              <h3 className={styles.programTitle}>{program.title}</h3>
            </div>

            <p className={styles.programDescription}>{program.description}</p>

            <ul className={styles.programFeatures}>
              {program.features.map((feature, featureIndex) => (
                <li key={featureIndex} className={styles.programFeature}>
                  <span className={styles.featureBullet}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className={styles.programFooter}>
              <Button href={program.href} className={styles.programButton}>
                {program.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h3 className={styles.ctaTitle}>{t("programsOverview.ctaTitle")}</h3>
          <p className={styles.ctaText}>{t("programsOverview.ctaText")}</p>
          <Button href="#contact" className={styles.ctaButton}>
            {t("programsOverview.contactUs")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsOverviewSection;
