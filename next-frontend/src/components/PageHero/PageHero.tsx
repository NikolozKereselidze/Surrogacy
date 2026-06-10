"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
import styles from "@/styles/PageHero/PageHero.module.css";

export type PageHeroHighlight = { title: string; description: string };

export type PageHeroProps = {
  /** Used for aria-labelledby on the section and as the h1 id */
  id: string;
  /** i18n prefix  reads .tag, .title, .description, .primaryCta, .secondaryCta */
  translationKey: string;
  /** Simple bullet list (cardTitle + cardPoints) or detailed highlights with descriptions */
  sidebarVariant?: "simple" | "detailed";
  /** id for the sidebar heading; defaults to `${id}-sidebar` */
  sidebarId?: string;
  primaryOnClick?: () => void;
  primaryHref?: string;
  secondaryHref?: string;
  secondaryOnClick?: () => void;
  className?: string;
};

const PageHero = ({
  id,
  translationKey,
  sidebarVariant = "simple",
  sidebarId,
  primaryOnClick,
  primaryHref,
  secondaryHref,
  secondaryOnClick,
  className,
}: PageHeroProps) => {
  const { t } = useTranslation();
  const resolvedSidebarId = sidebarId ?? `${id}-sidebar`;

  const cardPoints = useMemo(() => {
    if (sidebarVariant !== "simple") return [];
    return t(`${translationKey}.cardPoints`, {
      returnObjects: true,
      defaultValue: [],
    }) as string[];
  }, [sidebarVariant, translationKey, t]);

  const highlights = useMemo(() => {
    if (sidebarVariant !== "detailed") return [];
    return t(`${translationKey}.highlights`, {
      returnObjects: true,
      defaultValue: [],
    }) as PageHeroHighlight[];
  }, [sidebarVariant, translationKey, t]);

  const secondaryLabel = t(`${translationKey}.secondaryCta`, {
    defaultValue: "",
  });

  const sidebarTitle =
    sidebarVariant === "detailed"
      ? t(`${translationKey}.highlightsTitle`)
      : t(`${translationKey}.cardTitle`);

  const renderSecondaryCta = () => {
    if (!secondaryLabel) return null;

    if (secondaryHref) {
      return (
        <Link href={secondaryHref} className={styles.secondaryBtn}>
          {secondaryLabel}
        </Link>
      );
    }

    return (
      <button
        type="button"
        className={styles.secondaryBtn}
        onClick={secondaryOnClick}
      >
        {secondaryLabel}
      </button>
    );
  };

  return (
    <section
      className={`${styles.hero} ${className ?? ""}`.trim()}
      aria-labelledby={id}
    >
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>{t(`${translationKey}.tag`)}</span>
          <h1 id={id} className="title">
            {t(`${translationKey}.title`)}
          </h1>
          <p className="description">{t(`${translationKey}.description`)}</p>
          <div className={styles.heroActions}>
            {primaryHref ? (
              <Button href={primaryHref}>
                {t(`${translationKey}.primaryCta`)}
              </Button>
            ) : (
              <Button onClick={primaryOnClick}>
                {t(`${translationKey}.primaryCta`)}
              </Button>
            )}
            {renderSecondaryCta()}
          </div>
        </div>

        <aside
          className={styles.sidebarCard}
          aria-labelledby={resolvedSidebarId}
        >
          <h2 id={resolvedSidebarId} className={styles.sidebarTitle}>
            {sidebarTitle}
          </h2>

          {sidebarVariant === "simple" ? (
            <ul className={styles.simpleList}>
              {cardPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : (
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
          )}
        </aside>
      </div>
    </section>
  );
};

export default PageHero;
