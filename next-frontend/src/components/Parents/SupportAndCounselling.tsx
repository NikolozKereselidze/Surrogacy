"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { FaHeart, FaUsers, FaShieldAlt, FaComments, FaDollarSign, FaClock, } from "react-icons/fa";
import FaqSection from "@/components/FaqSection/FaqSection";
import PageHero from "@/components/PageHero/PageHero";
import PageCtaSection from "@/components/PageCtaSection/PageCtaSection";
import ProcessStep from "@/components/ProcessStep";
import RequirementsCard from "@/components/RequirementsCard";
import styles from "@/styles/Parents/SupportAndCounselling.module.css";
type ServiceCard = {
    icon: string;
    title: string;
    description: string;
};
type JourneyStep = {
    title: string;
    description: string;
};
const ICON_MAP = {
    heart: <FaHeart />,
    community: <FaUsers />,
    legal: <FaShieldAlt />,
    counselling: <FaComments />,
    financial: <FaDollarSign />,
    clock: <FaClock />,
} as const;
const SupportAndCounselling = () => {
    const { t, i18n } = useTranslation();
    const { locale } = useParams();
    const isRTL = i18n.language === "he";
    const localePrefix = `/${locale ?? "en"}`;
    const serviceCards = useMemo(() => t("supportAndCounselling.services.cards", {
        returnObjects: true,
    }) as ServiceCard[], [t]);
    const journeySteps = useMemo(() => t("supportAndCounselling.journey.steps", {
        returnObjects: true,
    }) as JourneyStep[], [t]);
    const scrollToContact = () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };
    return (<div className={styles.page} dir={isRTL ? "rtl" : "ltr"}>
      <PageHero id="sac-hero-title" sidebarId="sac-hero-card" translationKey="supportAndCounselling.hero" sidebarVariant="simple" primaryOnClick={scrollToContact} secondaryHref={`${localePrefix}/surrogacy-in-georgia`}/>

      <section className="section" aria-labelledby="sac-services-title">
        <div className="content">
          <span className="eyebrow">
            {t("supportAndCounselling.services.eyebrow")}
          </span>
          <h2 id="sac-services-title" className="title">
            {t("supportAndCounselling.services.title")}
          </h2>
          <p className="subtitle">
            {t("supportAndCounselling.services.subtitle")}
          </p>
        </div>

        <div className={styles.cards}>
          {serviceCards.map((card) => (<RequirementsCard key={card.title} iconContent={<span aria-hidden>
                  {ICON_MAP[card.icon as keyof typeof ICON_MAP] ?? (<FaHeart />)}
                </span>} title={card.title} description={card.description}/>))}
        </div>
      </section>

      <section className="section" aria-labelledby="sac-journey-title">
        <div className="content">
          <span className="eyebrow">
            {t("supportAndCounselling.journey.eyebrow")}
          </span>
          <h2 id="sac-journey-title" className="title">
            {t("supportAndCounselling.journey.title")}
          </h2>
          <p className="subtitle">
            {t("supportAndCounselling.journey.subtitle")}
          </p>
        </div>

        <div className="processTimeline">
          {journeySteps.map((step, index) => (<ProcessStep key={step.title} stepNumber={index + 1} stepTitle={step.title} stepContent={step.description}/>))}
        </div>
      </section>

      <FaqSection id="sac-faq-title" idPrefix="sac-faq" translationKey="supportAndCounselling.faq"/>

      <PageCtaSection id="sac-cta-title" translationKey="supportAndCounselling.cta" localePrefix={localePrefix} onPrimaryClick={scrollToContact}/>
    </div>);
};
export default SupportAndCounselling;
