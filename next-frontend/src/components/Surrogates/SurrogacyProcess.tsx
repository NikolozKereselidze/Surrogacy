"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { FaUserCheck, FaFileAlt, FaHandshake, FaBaby, FaCalendarAlt, FaPhone, FaEnvelope, FaUsers, } from "react-icons/fa";
import FaqSection from "@/components/FaqSection/FaqSection";
import PageHero from "@/components/PageHero/PageHero";
import PageCtaSection from "@/components/PageCtaSection/PageCtaSection";
import ProcessStep from "@/components/ProcessStep";
import SupportCard from "@/components/SupportCard";
import styles from "@/styles/Surrogates/SurrogacyProcess.module.css";
type ProcessStepItem = {
    title: string;
    description: string;
};
type TimelinePhase = {
    title: string;
    description: string;
};
type SupportCardItem = {
    title: string;
    text: string;
};
const STEP_ICONS = [
    <FaUserCheck key="consult"/>,
    <FaFileAlt key="legal"/>,
    <FaHandshake key="match"/>,
    <FaBaby key="birth"/>,
];
const TIMELINE_ICONS = [
    <FaCalendarAlt key="phase1"/>,
    <FaFileAlt key="phase2"/>,
    <FaBaby key="phase3"/>,
];
const SUPPORT_ICONS = [
    <FaUsers key="coordinator"/>,
    <FaPhone key="medical"/>,
    <FaEnvelope key="travel"/>,
];
const SurrogacyProcess = () => {
    const { t, i18n } = useTranslation();
    const { locale } = useParams();
    const isRTL = i18n.language === "he";
    const localePrefix = `/${locale ?? "en"}`;
    const processSteps = useMemo(() => t("surrogacyProcess.process.steps", {
        returnObjects: true,
    }) as ProcessStepItem[], [t]);
    const timelinePhases = useMemo(() => t("surrogacyProcess.timeline.phases", {
        returnObjects: true,
    }) as TimelinePhase[], [t]);
    const supportCards = useMemo(() => t("surrogacyProcess.support.cards", {
        returnObjects: true,
    }) as SupportCardItem[], [t]);
    const scrollToContact = () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };
    return (<div className={styles.page} dir={isRTL ? "rtl" : "ltr"}>
      <PageHero id="sp-hero-title" sidebarId="sp-hero-card" translationKey="surrogacyProcess.hero" sidebarVariant="simple" primaryOnClick={scrollToContact} secondaryHref={`${localePrefix}/surrogacy-in-georgia`}/>

      <section className="section" aria-labelledby="sp-process-title">
        <div className="content">
          <span className="eyebrow">
            {t("surrogacyProcess.process.eyebrow")}
          </span>
          <h2 id="sp-process-title" className="title">
            {t("surrogacyProcess.process.title")}
          </h2>
          <p className="subtitle">{t("surrogacyProcess.process.subtitle")}</p>
        </div>

        <div className="processTimeline">
          {processSteps.map((step, index) => (<ProcessStep key={step.title} stepNumber={index + 1} stepTitle={step.title} stepContent={step.description} stepIcon={STEP_ICONS[index]}/>))}
        </div>
      </section>

      <section className="section" aria-labelledby="sp-timeline-title">
        <div className="content">
          <span className="eyebrow">
            {t("surrogacyProcess.timeline.eyebrow")}
          </span>
          <h2 id="sp-timeline-title" className="title">
            {t("surrogacyProcess.timeline.title")}
          </h2>
          <p className="subtitle">{t("surrogacyProcess.timeline.subtitle")}</p>
        </div>

        <div className={styles.timeline}>
          {timelinePhases.map((phase, index) => (<div key={phase.title} className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                {TIMELINE_ICONS[index]}
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>{phase.title}</h3>
                <p className={styles.timelineText}>{phase.description}</p>
              </div>
            </div>))}
        </div>
      </section>

      <section className="section" aria-labelledby="sp-support-title">
        <div className="content">
          <span className="eyebrow">
            {t("surrogacyProcess.support.eyebrow")}
          </span>
          <h2 id="sp-support-title" className="title">
            {t("surrogacyProcess.support.title")}
          </h2>
          <p className="subtitle">{t("surrogacyProcess.support.subtitle")}</p>
        </div>

        <div className={styles.supportGrid}>
          {supportCards.map((card, index) => (<SupportCard key={card.title} title={card.title} text={card.text} icon={SUPPORT_ICONS[index]}/>))}
        </div>
      </section>

      <FaqSection id="sp-faq-title" idPrefix="sp-faq" translationKey="surrogacyProcess.faq"/>

      <PageCtaSection id="sp-cta-title" translationKey="surrogacyProcess.cta" localePrefix={localePrefix} onPrimaryClick={scrollToContact}/>
    </div>);
};
export default SurrogacyProcess;
