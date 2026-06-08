"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  FaHeart,
  FaShieldAlt,
  FaUserCheck,
  FaHandshake,
  FaDna,
  FaClock,
} from "react-icons/fa";
import Button from "@/components/Button";
import FAQAccordion from "@/components/FAQ/FAQAccordion";
import ProcessStep from "@/components/ProcessStep";
import RequirementsCard from "@/components/RequirementsCard";
import styles from "@/styles/Donors/WhyBecomeDonor.module.css";
import { useParams } from "next/navigation";

type Benefit = { icon: string; title: string; description: string };
type Step = { title: string; description: string };
type FaqItem = { question: string; answer: string };

const WhyBecomeDonor = () => {
  const { t } = useTranslation();
  const { locale } = useParams();

  const benefits = useMemo(
    () =>
      t("whyBecomeDonor.benefits.cards", {
        returnObjects: true,
      }) as Benefit[],
    [t],
  );

  const steps = useMemo(
    () =>
      t("whyBecomeDonor.process.steps", {
        returnObjects: true,
      }) as Step[],
    [t],
  );

  const faqItems = useMemo(
    () =>
      t("whyBecomeDonor.faq.items", {
        returnObjects: true,
      }) as FaqItem[],
    [t],
  );

  const iconMap = {
    heart: <FaHeart />,
    safety: <FaShieldAlt />,
    screening: <FaUserCheck />,
    support: <FaHandshake />,
    genetics: <FaDna />,
    time: <FaClock />,
  } as const;

  return (
    <div className={styles.page}>
      <section className={`${styles.hero} section`} aria-labelledby="wbd-title">
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>
              {t("whyBecomeDonor.hero.tag")}
            </span>
            <h1 id="wbd-title" className="title">
              {t("whyBecomeDonor.hero.title")}
            </h1>
            <p className="description">
              {t("whyBecomeDonor.hero.description")}
            </p>

            <div className={styles.heroActions}>
              <Button href="#contact">
                {t("whyBecomeDonor.hero.primaryCta")}
              </Button>
              <Button
                href={`/${locale}/who-can-become-a-donor`}
                className={styles.secondaryBtn}
              >
                {t("whyBecomeDonor.hero.secondaryCta")}
              </Button>
            </div>
          </div>

          <aside className={styles.heroCard} aria-labelledby="wbd-hero-card">
            <h2 id="wbd-hero-card" className={styles.heroCardTitle}>
              {t("whyBecomeDonor.hero.cardTitle")}
            </h2>
            <ul className={styles.heroCardList}>
              <li>{t("whyBecomeDonor.hero.cardPoints.0")}</li>
              <li>{t("whyBecomeDonor.hero.cardPoints.1")}</li>
              <li>{t("whyBecomeDonor.hero.cardPoints.2")}</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="wbd-benefits-title">
        <div className="content">
          <span className="eyebrow">
            {t("whyBecomeDonor.benefits.eyebrow")}
          </span>
          <h2 id="wbd-benefits-title" className="title">
            {t("whyBecomeDonor.benefits.title")}
          </h2>
          <p className="subtitle">{t("whyBecomeDonor.benefits.subtitle")}</p>
        </div>

        <div className={styles.benefitsGrid}>
          {benefits.map((card) => (
            <RequirementsCard
              key={card.title}
              iconContent={
                <span aria-hidden>
                  {iconMap[card.icon as keyof typeof iconMap] ?? <FaHeart />}
                </span>
              }
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="wbd-process-title">
        <div className="content">
          <span className="eyebrow">{t("whyBecomeDonor.process.eyebrow")}</span>
          <h2 id="wbd-process-title" className="title">
            {t("whyBecomeDonor.process.title")}
          </h2>
          <p className="subtitle">{t("whyBecomeDonor.process.subtitle")}</p>
        </div>

        <div className="processTimeline">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.title}
              stepNumber={index + 1}
              stepTitle={step.title}
              stepContent={step.description}
            />
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="wbd-faq-title">
        <div className="content">
          <span className="eyebrow">{t("whyBecomeDonor.faq.eyebrow")}</span>
          <h2 id="wbd-faq-title" className="title">
            {t("whyBecomeDonor.faq.title")}
          </h2>
          <p className="subtitle">{t("whyBecomeDonor.faq.subtitle")}</p>
        </div>

        <div className={styles.faq}>
          <FAQAccordion items={faqItems} idPrefix="wbd-faq" />
        </div>
      </section>
    </div>
  );
};

export default WhyBecomeDonor;
