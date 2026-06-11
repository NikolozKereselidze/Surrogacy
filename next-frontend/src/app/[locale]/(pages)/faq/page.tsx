import type { Metadata } from "next";
import FAQ from "@/components/FAQ/FAQ";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";

const localizedMeta = {
  en: {
    title: "Surrogacy FAQ | Georgia Country Programs & Costs",
    description:
      "Answers to common questions about surrogacy in Georgia country, egg donation, legal steps, timelines, costs, and support for international intended parents.",
    keywords: [
      ...getMetaKeywords("en"),
      "how much does surrogacy cost in georgia",
      "is surrogacy legal in georgia",
      "what is the surrogacy process in georgia",
      "surrogacy FAQ",
    ],
  },
  ka: {
    title: "ხშირად დასმული კითხვები | სუროგაცია და ივფ საქართველოში",
    description:
      "პასუხები ხშირ კითხვებზე სუროგაციასა და კვერცხუჯრედის დონაციაზე საქართველოში: პროცესი, ღირებულება, იურიდიული ნაბიჯები და მხარდაჭერა.",
    keywords: [
      ...getMetaKeywords("ka"),
      "როგორ ხდება სუროგაცია",
      "რა ღირს სუროგაცია",
      "რა არის ინ ვიტრო",
      "რა ღირს კვერცხუჯრედის დონაცია",
    ],
  },
  es: {
    title: "Preguntas Frecuentes | Subrogación en Georgia País",
    description:
      "Respuestas sobre subrogación en Georgia país, donación de óvulos, pasos legales, plazos, costos y apoyo para padres internacionales.",
    keywords: [
      ...getMetaKeywords("es"),
      "cuánto cuesta la subrogación en georgia",
      "es legal la subrogación en georgia",
      "subrogación FAQ",
    ],
  },
  ru: {
    title: "Частые Вопросы | Суррогатное Материнство в Грузии",
    description:
      "Ответы на вопросы о суррогатном материнстве в Грузии, донорстве яйцеклеток, юридических шагах, сроках, стоимости и поддержке для иностранных родителей.",
    keywords: [
      ...getMetaKeywords("ru"),
      "законно ли суррогатное материнство в грузии",
      "сколько стоит суррогатное материнство в грузии",
    ],
  },
  he: {
    title: "שאלות נפוצות | פונדקאות בגאורגיה",
    description:
      "תשובות לשאלות נפוצות על פונדקאות בגאורגיה, תרומת ביציות, שלבים משפטיים, לוחות זמנים, עלויות ותמיכה להורים בינלאומיים.",
    keywords: [
      ...getMetaKeywords("he"),
      "האם פונדקאות חוקית בגאורגיה",
      "עלות פונדקאות בגאורגיה",
    ],
  },
  zh: {
    title: "常见问题 | 格鲁吉亚代孕与供卵",
    description:
      "格鲁吉亚代孕、供卵、法律步骤、时间线、费用及国际意向父母支持服务的常见问题解答。",
    keywords: [
      ...getMetaKeywords("zh"),
      "格鲁吉亚代孕多少钱",
      "格鲁吉亚代孕流程",
      "格鲁吉亚代孕合法",
    ],
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content =
    localizedMeta[locale as keyof typeof localizedMeta] || localizedMeta.en;

  return buildPageMetadata({
    title: content.title,
    description: content.description,
    keywords: [...content.keywords],
    path: "/faq",
    locale: locale || "en",
  });
}

const FAQPage = () => {
  return <FAQ />;
};

export default FAQPage;
