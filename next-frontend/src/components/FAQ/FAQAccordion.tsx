"use client";

import { useState } from "react";
import styles from "@/styles/FAQ/FAQ.module.css";

export type FAQAccordionItem = {
  question: string;
  answer: string;
};

interface FAQAccordionProps {
  items: FAQAccordionItem[];
  idPrefix?: string;
  defaultOpenIndex?: number | null;
  emptyMessage?: string;
}

const FAQAccordion = ({
  items,
  idPrefix = "faq",
  defaultOpenIndex = 0,
  emptyMessage,
}: FAQAccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultOpenIndex);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  if (items.length === 0 && emptyMessage) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <ul className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <li key={`${item.question}-${index}`} className={styles.item}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`${idPrefix}-panel-${index}`}
              id={`${idPrefix}-trigger-${index}`}
              className={`${styles.trigger} ${isOpen ? styles.open : ""}`}
              onClick={() => handleToggle(index)}
            >
              <span className={styles.q}>{item.question}</span>
              <span className={styles.chevron} aria-hidden />
            </button>
            <div
              id={`${idPrefix}-panel-${index}`}
              role="region"
              aria-labelledby={`${idPrefix}-trigger-${index}`}
              className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
            >
              <div className={styles.panelInner}>
                <p className={styles.a}>{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default FAQAccordion;
