"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { FaHandshake, FaClipboardCheck, FaFileSignature } from "react-icons/fa";
import FaqSection from "@/components/FaqSection/FaqSection";
import PageHero from "@/components/PageHero/PageHero";
import PageCtaSection from "@/components/PageCtaSection/PageCtaSection";
import ProcessStep from "@/components/ProcessStep";
import styles from "@/styles/Screening/ScreeningPage.module.css";

type ProcessStepItem = { title: string; description: string };

const STEP_ICONS = [<FaHandshake key="consultation" />, <FaClipboardCheck key="review" />, <FaFileSignature key="legal" />];

const ParentScreening = () => {
  const { t, i18n } = useTranslation();
  const { locale } = useParams();
  const isRTL = i18n.language === "he";
  const localePrefix = `/${locale ?? "en"}`;

  const processSteps = useMemo(
    () =>
      t("parentScreening.process.steps", {
        returnObjects: true,
      }) as ProcessStepItem[],
    [t],
  );

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.page} dir={isRTL ? "rtl" : "ltr"}>
      <PageHero
        id="ps-hero-title"
        sidebarId="ps-hero-card"
        translationKey="parentScreening.hero"
        sidebarVariant="simple"
        primaryOnClick={scrollToContact}
        secondaryHref={`${localePrefix}/surrogacy-in-georgia`}
      />

      <section className="section" aria-labelledby="ps-process-title">
        <div className="content">
          <span className="eyebrow">
            {t("parentScreening.process.eyebrow")}
          </span>
          <h2 id="ps-process-title" className="title">
            {t("parentScreening.process.title")}
          </h2>
          <p className="subtitle">{t("parentScreening.process.subtitle")}</p>
        </div>

        <div className="processTimeline">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={step.title}
              stepNumber={index + 1}
              stepTitle={step.title}
              stepContent={step.description}
              stepIcon={STEP_ICONS[index]}
            />
          ))}
        </div>
      </section>

      <FaqSection
        id="ps-faq-title"
        idPrefix="ps-faq"
        translationKey="parentScreening.faq"
      />

      <PageCtaSection
        id="ps-cta-title"
        translationKey="parentScreening.cta"
        localePrefix={localePrefix}
        onPrimaryClick={scrollToContact}
      />
    </div>
  );
};

export default ParentScreening;
