"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FaqSection, {
  type FaqSectionItem,
} from "@/components/FaqSection/FaqSection";

export type FAQItem = FaqSectionItem;

interface FAQProps {
  items?: FAQItem[];
  categories?: string[];
}

const FAQ = ({ items, categories }: FAQProps) => {
  const { t } = useTranslation();

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
    [t],
  );

  const resolvedItems = items?.length ? items : defaultItems;

  return (
    <FaqSection
      id="faq-page-title"
      idPrefix="faq"
      headingLevel="h1"
      title={t("faq.title")}
      subtitle={t("faq.subtitle")}
      items={resolvedItems}
      showCategories
      categories={categories}
      wide
    />
  );
};

export default FAQ;
