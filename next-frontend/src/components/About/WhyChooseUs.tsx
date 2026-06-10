"use client";

import { useMemo, type ReactNode } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  FaAward,
  FaUsers,
  FaShieldAlt,
  FaHeart,
  FaGlobe,
  FaClock,
  FaBalanceScale,
  FaDollarSign,
  FaPassport,
  FaClinicMedical,
} from "react-icons/fa";
import Button from "@/components/Button";
import FaqSection from "@/components/FaqSection/FaqSection";
import PageHero from "@/components/PageHero/PageHero";
import PageCtaSection from "@/components/PageCtaSection/PageCtaSection";
import styles from "@/styles/About/WhyChooseUs.module.css";

type ReasonCard = { icon: string; title: string; description: string };
type Criterion = { title: string; description: string; questions: string[] };
type GeorgiaPoint = { title: string; description: string };
const ICON_MAP: Record<string, ReactNode> = {
  award: <FaAward />,
  users: <FaUsers />,
  shield: <FaShieldAlt />,
  heart: <FaHeart />,
  globe: <FaGlobe />,
  clock: <FaClock />,
};

const GEORGIA_ICONS = [
  FaBalanceScale,
  FaDollarSign,
  FaPassport,
  FaClinicMedical,
] as const;

const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  headingLevel = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  headingLevel?: "h1" | "h2";
}) => {
  const Heading = headingLevel;
  return (
    <div className="content">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading className="title">{title}</Heading>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
};

const WhyChooseUs = () => {
  const { t, i18n } = useTranslation();
  const { locale } = useParams();
  const isRTL = i18n.language === "he";
  const localePrefix = `/${locale ?? "en"}`;

  const reasonCards = useMemo(
    () =>
      t("whyChooseUs.reasons.cards", { returnObjects: true }) as ReasonCard[],
    [t],
  );

  const criteria = useMemo(
    () =>
      t("whyChooseUs.guide.criteria", { returnObjects: true }) as Criterion[],
    [t],
  );

  const georgiaPoints = useMemo(
    () =>
      t("whyChooseUs.georgia.points", {
        returnObjects: true,
      }) as GeorgiaPoint[],
    [t],
  );

  const othersPoints = useMemo(
    () =>
      t("whyChooseUs.comparison.othersPoints", {
        returnObjects: true,
      }) as string[],
    [t],
  );

  const ourPoints = useMemo(
    () =>
      t("whyChooseUs.comparison.ourPoints", {
        returnObjects: true,
      }) as string[],
    [t],
  );

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.page} dir={isRTL ? "rtl" : "ltr"}>
      <PageHero
        id="wcu-hero-title"
        sidebarId="wcu-highlights-title"
        translationKey="whyChooseUs.hero"
        sidebarVariant="detailed"
        primaryOnClick={scrollToContact}
        secondaryHref={`${localePrefix}/surrogacy-in-georgia`}
      />

      <section className="section" aria-labelledby="wcu-reasons-title">
        <SectionHeader
          eyebrow={t("whyChooseUs.reasons.eyebrow")}
          title={t("whyChooseUs.reasons.title")}
          subtitle={t("whyChooseUs.reasons.subtitle")}
        />
        <div className={styles.reasonsGrid}>
          {reasonCards.map((card) => (
            <article key={card.title} className={styles.reasonCard}>
              <div className={styles.reasonIcon}>
                {ICON_MAP[card.icon] ?? <FaAward />}
              </div>
              <h3 className={styles.reasonTitle}>{card.title}</h3>
              <p className={styles.reasonDesc}>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="wcu-guide-title">
        <SectionHeader
          eyebrow={t("whyChooseUs.guide.eyebrow")}
          title={t("whyChooseUs.guide.title")}
          subtitle={t("whyChooseUs.guide.subtitle")}
        />
        <div className={styles.guideGrid}>
          {criteria.map((item) => (
            <article key={item.title} className={styles.guideCard}>
              <h3 className={styles.guideTitle}>{item.title}</h3>
              <p className={styles.guideDesc}>{item.description}</p>
              <div className={styles.questionsBox}>
                <p className={styles.questionsLabel}>
                  {t("whyChooseUs.guide.questionsLabel")}
                </p>
                <ul className={styles.questionsList}>
                  {item.questions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="wcu-georgia-title">
        <SectionHeader
          eyebrow={t("whyChooseUs.georgia.eyebrow")}
          title={t("whyChooseUs.georgia.title")}
          subtitle={t("whyChooseUs.georgia.subtitle")}
        />
        <p className={styles.georgiaOverview}>
          {t("whyChooseUs.georgia.overview")}
        </p>
        <div className={styles.georgiaGrid}>
          {georgiaPoints.map((point, index) => {
            const Icon = GEORGIA_ICONS[index] ?? FaBalanceScale;
            return (
              <article key={point.title} className={styles.georgiaCard}>
                <div className={styles.georgiaIcon}>
                  <Icon />
                </div>
                <h3 className={styles.georgiaPointTitle}>{point.title}</h3>
                <p className={styles.georgiaPointDesc}>{point.description}</p>
              </article>
            );
          })}
        </div>
        <div className={styles.georgiaCta}>
          <Button href={`${localePrefix}/surrogacy-in-georgia`}>
            {t("whyChooseUs.hero.secondaryCta")}
          </Button>
        </div>
      </section>

      <section className="section" aria-labelledby="wcu-comparison-title">
        <SectionHeader
          title={t("whyChooseUs.comparison.title")}
          subtitle={t("whyChooseUs.comparison.subtitle")}
        />
        <div className={styles.comparisonGrid}>
          <div className={styles.comparisonCard}>
            <h3 className={styles.comparisonTitle}>
              {t("whyChooseUs.comparison.othersTitle")}
            </h3>
            <ul className={styles.comparisonList}>
              {othersPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className={`${styles.comparisonCard} ${styles.ourCard}`}>
            <h3 className={styles.comparisonTitle}>
              {t("whyChooseUs.comparison.ourTitle")}
            </h3>
            <ul className={styles.comparisonList}>
              {ourPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FaqSection
        id="wcu-faq-title"
        idPrefix="wcu-faq"
        translationKey="whyChooseUs.faq"
      />

      <PageCtaSection
        id="wcu-cta-title"
        translationKey="whyChooseUs.cta"
        localePrefix={localePrefix}
        onPrimaryClick={scrollToContact}
      />
    </div>
  );
};

export default WhyChooseUs;
