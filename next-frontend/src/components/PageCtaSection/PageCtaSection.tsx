"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
import styles from "@/styles/PageCtaSection/PageCtaSection.module.css";

export type CtaRelatedLink = {
  label: string;
  path: string;
};

export type PageCtaSectionProps = {
  /** Used for aria-labelledby on the section */
  id?: string;
  /** i18n prefix, e.g. "whyChooseUs.cta" or "homepage.cta" */
  translationKey: string;
  localePrefix: string;
  onPrimaryClick?: () => void;
  primaryHref?: string;
};

const PageCtaSection = ({
  id = "page-cta-title",
  translationKey,
  localePrefix,
  onPrimaryClick,
  primaryHref,
}: PageCtaSectionProps) => {
  const { t } = useTranslation();

  const relatedLinks = useMemo(
    () =>
      t(`${translationKey}.relatedLinks`, {
        returnObjects: true,
      }) as CtaRelatedLink[],
    [t, translationKey],
  );

  const primaryCta = t(`${translationKey}.primaryCta`);

  return (
    <section className={styles.section} aria-labelledby={id}>
      <div className={styles.inner}>
        <h2 id={id} className={styles.title}>
          {t(`${translationKey}.title`)}
        </h2>
        <p className={styles.description}>
          {t(`${translationKey}.description`)}
        </p>
        {primaryHref ? (
          <Button href={primaryHref}>{primaryCta}</Button>
        ) : (
          <Button onClick={onPrimaryClick}>{primaryCta}</Button>
        )}
        {relatedLinks.length > 0 && (
          <div className={styles.relatedLinks}>
            <p className={styles.relatedTitle}>
              {t(`${translationKey}.relatedTitle`)}
            </p>
            <ul className={styles.relatedList}>
              {relatedLinks.map((link) => (
                <li key={link.path}>
                  <Link href={`${localePrefix}${link.path}`}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default PageCtaSection;
