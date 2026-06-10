"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import FAQAccordion, {
  type FAQAccordionItem,
} from "@/components/FAQ/FAQAccordion";
import styles from "@/styles/FaqSection/FaqSection.module.css";

export type FaqSectionItem = FAQAccordionItem & {
  category?: string;
};

export type FaqSectionProps = {
  /** Used for aria-labelledby on the section heading */
  id: string;
  /** Prefix for accordion button/panel ids */
  idPrefix: string;
  headingLevel?: "h1" | "h2";
  /** i18n prefix  reads .eyebrow, .title, .subtitle, .items */
  translationKey?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: FaqSectionItem[];
  showCategories?: boolean;
  categories?: string[];
  /** i18n prefix for category labels, default "faq.categories" */
  categoryLabelsPrefix?: string;
  allCategoryLabel?: string;
  emptyMessage?: string;
  defaultOpenIndex?: number | null;
  /** Wider layout for the dedicated FAQ page */
  wide?: boolean;
};

const FaqSection = ({
  id,
  idPrefix,
  headingLevel = "h2",
  translationKey,
  eyebrow,
  title,
  subtitle,
  items,
  showCategories = false,
  categories,
  categoryLabelsPrefix = "faq.categories",
  allCategoryLabel,
  emptyMessage,
  defaultOpenIndex = 0,
  wide = false,
}: FaqSectionProps) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");

  const resolvedEyebrow =
    eyebrow ??
    (translationKey
      ? t(`${translationKey}.eyebrow`, { defaultValue: "" })
      : "");

  const resolvedTitle =
    title ?? (translationKey ? t(`${translationKey}.title`) : "");

  const resolvedSubtitle =
    subtitle ??
    (translationKey
      ? t(`${translationKey}.subtitle`, { defaultValue: "" })
      : "");

  const resolvedItems = useMemo(() => {
    if (items) return items;
    if (translationKey) {
      return t(`${translationKey}.items`, {
        returnObjects: true,
      }) as FaqSectionItem[];
    }
    return [];
  }, [items, translationKey, t]);

  const availableCategories = useMemo(() => {
    if (categories?.length) return categories;
    const set = new Set<string>();
    resolvedItems.forEach((item) => item.category && set.add(item.category));
    return Array.from(set);
  }, [categories, resolvedItems]);

  const filteredItems = useMemo(() => {
    if (!showCategories || activeCategory === "all") return resolvedItems;
    return resolvedItems.filter((item) => item.category === activeCategory);
  }, [resolvedItems, showCategories, activeCategory]);

  const resolvedEmptyMessage =
    emptyMessage ??
    (filteredItems.length === 0
      ? t("faq.noResults", { defaultValue: "No results found." })
      : undefined);

  const Heading = headingLevel;
  const bodyClass = wide ? `${styles.body} ${styles.bodyWide}` : styles.body;

  return (
    <section className="section" aria-labelledby={id}>
      <div className="content">
        {resolvedEyebrow ? (
          <span className="eyebrow">{resolvedEyebrow}</span>
        ) : null}
        <Heading id={id} className="title">
          {resolvedTitle}
        </Heading>
        {resolvedSubtitle ? (
          <p className="subtitle">{resolvedSubtitle}</p>
        ) : null}
      </div>
      <div className={bodyClass}>
        {showCategories && availableCategories.length > 0 ? (
          <div className={styles.categories}>
            <button
              type="button"
              className={`${styles.categoryBtn} ${
                activeCategory === "all" ? styles.active : ""
              }`}
              onClick={() => setActiveCategory("all")}
            >
              {allCategoryLabel ?? t("faq.all", { defaultValue: "All" })}
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`${styles.categoryBtn} ${
                  activeCategory === cat ? styles.active : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {t(`${categoryLabelsPrefix}.${cat}`, { defaultValue: cat })}
              </button>
            ))}
          </div>
        ) : null}
        <FAQAccordion
          items={filteredItems}
          idPrefix={idPrefix}
          defaultOpenIndex={defaultOpenIndex}
          emptyMessage={resolvedEmptyMessage}
        />
      </div>
    </section>
  );
};

export default FaqSection;
