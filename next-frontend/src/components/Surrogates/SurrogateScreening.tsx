"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { FaStethoscope, FaBrain, FaUserCheck } from "react-icons/fa";
import FaqSection from "@/components/FaqSection/FaqSection";
import PageHero from "@/components/PageHero/PageHero";
import PageCtaSection from "@/components/PageCtaSection/PageCtaSection";
import ProcessStep from "@/components/ProcessStep";
import styles from "@/styles/Screening/ScreeningPage.module.css";

type ProcessStepItem = { title: string; description: string };

const STEP_ICONS = [<FaStethoscope key="medical" />, <FaBrain key="psych" />, <FaUserCheck key="background" />];

const SurrogateScreening = () => {
  const { t, i18n } = useTranslation();
  const { locale } = useParams();
  const isRTL = i18n.language === "he";
  const localePrefix = `/${locale ?? "en"}`;

  const processSteps = useMemo(
    () =>
      t("surrogateScreening.process.steps", {
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
        id="ss-hero-title"
        sidebarId="ss-hero-card"
        translationKey="surrogateScreening.hero"
        sidebarVariant="simple"
        primaryHref={`${localePrefix}/who-can-become-a-surrogate`}
        secondaryHref={`${localePrefix}/surrogacy-in-georgia`}
      />

      <section className="section" aria-labelledby="ss-process-title">
        <div className="content">
          <span className="eyebrow">
            {t("surrogateScreening.process.eyebrow")}
          </span>
          <h2 id="ss-process-title" className="title">
            {t("surrogateScreening.process.title")}
          </h2>
          <p className="subtitle">{t("surrogateScreening.process.subtitle")}</p>
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
        id="ss-faq-title"
        idPrefix="ss-faq"
        translationKey="surrogateScreening.faq"
      />

      <PageCtaSection
        id="ss-cta-title"
        translationKey="surrogateScreening.cta"
        localePrefix={localePrefix}
        onPrimaryClick={scrollToContact}
      />
    </div>
  );
};

export default SurrogateScreening;
