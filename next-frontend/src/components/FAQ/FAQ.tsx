"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "@/styles/FAQ/FAQ.module.css";

export type FAQItem = {
  question: string;
  answer: string;
  category?: string; // category id, e.g., 'general', 'logistics'
};

interface FAQProps {
  items?: FAQItem[];
  categories?: string[];
}

const FAQ = ({ items, categories }: FAQProps) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");

  const defaultItems: FAQItem[] = useMemo(
    () => [
      { question: t("faq.q1"), answer: t("faq.a1"), category: "general" },
      { question: t("faq.q2"), answer: t("faq.a2"), category: "logistics" },
      {
        question: t("faq.q3"),
        answer: t("faq.a3"),
        category: "gettingStarted",
      },
      { question: t("faq.q4"), answer: t("faq.a4"), category: "programs" },
      { question: t("faq.q5"), answer: t("faq.a5"), category: "programs" },
      { question: t("faq.q6"), answer: t("faq.a6"), category: "financial" },
      { question: t("faq.q7"), answer: t("faq.a7"), category: "legal" },
      { question: t("faq.q8"), answer: t("faq.a8"), category: "medical" },
      { question: t("faq.q9"), answer: t("faq.a9"), category: "medical" },
      { question: t("faq.q10"), answer: t("faq.a10"), category: "timeline" },
      { question: t("faq.q11"), answer: t("faq.a11"), category: "logistics" },
      { question: t("faq.q12"), answer: t("faq.a12"), category: "support" },
      { question: t("faq.q13"), answer: t("faq.a13"), category: "support" },
    ],
    [t]
  );

  const resolvedItems = items && items.length ? items : defaultItems;

  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    resolvedItems.forEach((i) => i.category && set.add(i.category));
    return categories && categories.length ? categories : Array.from(set);
  }, [resolvedItems, categories]);

  const filtered = useMemo(() => {
    return resolvedItems.filter((item) => {
      return activeCategory === "all" || item.category === activeCategory;
    });
  }, [resolvedItems, activeCategory]);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const allLabel = t("faq.all") || "All";
  const noResults = t("faq.noResults") || "No results. Try a different search.";

  return (
    <section className="section">
      <div className="content">
        <h1 className="title">{t("faq.title")}</h1>
        <p className="subtitle">{t("faq.subtitle")}</p>
      </div>
      <div className="content">
        <div className={styles.faqContainer}>
          {availableCategories.length > 0 && (
            <div className={styles.categories}>
              <button
                type="button"
                className={`${styles.categoryBtn} ${
                  activeCategory === "all" ? styles.active : ""
                }`}
                onClick={() => setActiveCategory("all")}
              >
                {allLabel}
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
                  {t(`faq.categories.${cat}`) || cat}
                </button>
              ))}
            </div>
          )}

          <ul className={styles.accordion}>
            {filtered.map((item, index) => {
              const isOpen = activeIndex === index;
              return (
                <li key={`${item.question}-${index}`} className={styles.item}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-trigger-${index}`}
                    className={`${styles.trigger} ${isOpen ? styles.open : ""}`}
                    onClick={() => handleToggle(index)}
                  >
                    <span className={styles.q}>{item.question}</span>
                    <span className={styles.chevron} aria-hidden>
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${index}`}
                    className={`${styles.panel} ${
                      isOpen ? styles.panelOpen : ""
                    }`}
                  >
                    <p className={styles.a}>{item.answer}</p>
                  </div>
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li className={styles.empty}>{noResults}</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
