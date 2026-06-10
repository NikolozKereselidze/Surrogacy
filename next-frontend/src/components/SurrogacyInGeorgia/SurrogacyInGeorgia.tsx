"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
import FaqSection from "@/components/FaqSection/FaqSection";
import ProcessStep from "@/components/ProcessStep";
import RequirementsCard from "@/components/RequirementsCard";
import styles from "@/styles/SurrogacyInGeorgia/SurrogacyInGeorgia.module.css";

type Highlight = { title: string; description: string };
type Benefit = { icon: string; title: string; description: string };
type Protection = { title: string; description: string };
type Requirement = { title: string; description: string };
type Step = { title: string; description: string };
type Inclusion = { title: string; description: string };
type Feature = string;

const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) => (
  <div className="content">
    <span className="eyebrow">{eyebrow}</span>
    <h2 className="title">{title}</h2>
    <p className="subtitle">{subtitle}</p>
  </div>
);

const SurrogacyInGeorgia = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "he";

  const highlights = useMemo(
    () =>
      t("surrogacyInGeorgia.hero.highlights", {
        returnObjects: true,
      }) as Highlight[],
    [t],
  );

  const benefits = useMemo(
    () =>
      t("surrogacyInGeorgia.benefits.cards", {
        returnObjects: true,
      }) as Benefit[],
    [t],
  );

  const protections = useMemo(
    () =>
      t("surrogacyInGeorgia.legal.protections", {
        returnObjects: true,
      }) as Protection[],
    [t],
  );

  const requirements = useMemo(
    () =>
      t("surrogacyInGeorgia.legal.requirements", {
        returnObjects: true,
      }) as Requirement[],
    [t],
  );

  const steps = useMemo(
    () =>
      t("surrogacyInGeorgia.process.steps", { returnObjects: true }) as Step[],
    [t],
  );

  const inclusions = useMemo(
    () =>
      t("surrogacyInGeorgia.pricing.inclusions", {
        returnObjects: true,
      }) as Inclusion[],
    [t],
  );

  const features = useMemo(
    () =>
      t("surrogacyInGeorgia.pricing.features", {
        returnObjects: true,
      }) as Feature[],
    [t],
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.page} dir={isRTL ? "rtl" : "ltr"}>
      <section className={styles.hero} aria-labelledby="sig-hero-title">
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>
              {t("surrogacyInGeorgia.hero.tag")}
            </span>
            <h1 id="sig-hero-title" className="title">
              {t("surrogacyInGeorgia.hero.title")}
            </h1>
            <p className="description">
              {t("surrogacyInGeorgia.hero.description")}
            </p>
            <div className={styles.heroActions}>
              <Button onClick={() => scrollTo("contact")}>
                {t("surrogacyInGeorgia.hero.primaryCta")}
              </Button>
              <button type="button" className={styles.secondaryBtn}>
                {t("surrogacyInGeorgia.hero.secondaryCta")}
              </button>
            </div>
          </div>

          <aside
            className={styles.highlightCard}
            aria-labelledby="sig-highlights-title"
          >
            <h2 id="sig-highlights-title" className={styles.highlightCardTitle}>
              {t("surrogacyInGeorgia.hero.highlightsTitle")}
            </h2>
            <ul className={styles.highlightList}>
              {highlights.map((item) => (
                <li key={item.title} className={styles.highlightItem}>
                  <p className={styles.highlightItemTitle}>
                    <span className={styles.checkIcon} aria-hidden>
                      ✓
                    </span>
                    {item.title}
                  </p>
                  <p className={styles.highlightItemDesc}>{item.description}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="sig-benefits-title">
        <SectionHeader
          eyebrow={t("surrogacyInGeorgia.benefits.eyebrow")}
          title={t("surrogacyInGeorgia.benefits.title")}
          subtitle={t("surrogacyInGeorgia.benefits.subtitle")}
        />
        <div className={styles.benefitsGrid}>
          {benefits.map((card) => (
            <RequirementsCard
              key={card.title}
              iconContent={<span aria-hidden>{card.icon}</span>}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="sig-legal-title">
        <SectionHeader
          eyebrow={t("surrogacyInGeorgia.legal.eyebrow")}
          title={t("surrogacyInGeorgia.legal.title")}
          subtitle={t("surrogacyInGeorgia.legal.subtitle")}
        />
        <div className={styles.twoColumn}>
          <div>
            <p className="description">
              {t("surrogacyInGeorgia.legal.overview")}
            </p>
            <h3 className={styles.blockTitle}>
              {t("surrogacyInGeorgia.legal.protectionsTitle")}
            </h3>
            <div className={styles.itemList}>
              {protections.map((item) => (
                <div key={item.title}>
                  <p className={styles.itemTitle}>• {item.title}</p>
                  <p className="description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <aside
            className={styles.infoCard}
            aria-labelledby="sig-eligible-title"
          >
            <h3 id="sig-eligible-title" className={styles.cardTitle}>
              {t("surrogacyInGeorgia.legal.eligibleTitle")}
            </h3>
            <div className={styles.itemList}>
              {requirements.map((item) => (
                <div key={item.title}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className="description">{item.description}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="sig-process-title">
        <SectionHeader
          eyebrow={t("surrogacyInGeorgia.process.eyebrow")}
          title={t("surrogacyInGeorgia.process.title")}
          subtitle={t("surrogacyInGeorgia.process.subtitle")}
        />
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

      <section className="section" aria-labelledby="sig-pricing-title">
        <SectionHeader
          eyebrow={t("surrogacyInGeorgia.pricing.eyebrow")}
          title={t("surrogacyInGeorgia.pricing.title")}
          subtitle={t("surrogacyInGeorgia.pricing.subtitle")}
        />
        <div className={styles.twoColumn}>
          <div>
            <p className="description">
              {t("surrogacyInGeorgia.pricing.overview")}
            </p>
            <h3 className={styles.blockTitle}>
              {t("surrogacyInGeorgia.pricing.inclusionsTitle")}
            </h3>
            <div className={styles.itemList}>
              {inclusions.map((item) => (
                <div key={item.title}>
                  <p className={styles.itemTitle}>• {item.title}</p>
                  <p className="description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <aside
            className={styles.pricingCard}
            aria-labelledby="sig-program-title"
          >
            <h3 id="sig-program-title" className={styles.cardTitle}>
              {t("surrogacyInGeorgia.pricing.programTitle")}
            </h3>
            <div>
              <p className={styles.priceValue}>
                {t("surrogacyInGeorgia.pricing.price")}
              </p>
              <p className={styles.priceNote}>
                {t("surrogacyInGeorgia.pricing.priceNote")}
              </p>
            </div>
            <hr className={styles.pricingDivider} />
            <ul className={styles.featureList}>
              {features.map((feature) => (
                <li key={feature} className={styles.featureItem}>
                  <span className={styles.checkIcon} aria-hidden>
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button onClick={() => scrollTo("contact")}>
              {t("surrogacyInGeorgia.pricing.cta")}
            </Button>
          </aside>
        </div>
      </section>

      <FaqSection
        id="sig-faq-title"
        idPrefix="sig-faq"
        translationKey="surrogacyInGeorgia.faq"
      />
    </div>
  );
};

export default SurrogacyInGeorgia;
