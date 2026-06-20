import type { Metadata } from "next";
import WhyChooseUs from "@/components/About/WhyChooseUs";
import { buildPageMetadata } from "@/lib/seo";
const localizedMeta = {
  en: {
    title: "Why Choose Us | Surrogacy Agency Georgia",
    description:
      "Learn how to choose a surrogacy agency and why international families trust Happy Family. Transparent pricing, accredited Tbilisi clinics, legal protection since 2011, and 24/7 support.",
    keywords: [
      "how to choose a surrogacy agency",
      "reputable surrogacy agency",
      "best surrogacy agency",
      "surrogacy in georgia",
      "international surrogacy",
      "surrogacy agency georgia",
      "top surrogacy agencies",
    ],
  },
  ka: {
    title: "რატომ აგვირჩიოთ | სანდო სუროგაციის სააგენტო საქართველოში",
    description:
      "გაიგეთ, როგორ აირჩიოთ სუროგაციის სააგენტო და რატომ ენდობიან Happy Family-ს საერთაშორისო ოჯახები. გამჭვირვალე ფასები, აკრედიტებული კლინიკები და 24/7 მხარდაჭერა.",
    keywords: [
      "სუროგაციის სააგენტო",
      "სუროგაცია საქართველოში",
      "საუკეთესო სუროგაციის სააგენტო",
    ],
  },
  es: {
    title: "Por Qué Elegirnos | Agencia de Subrogación de Confianza en Georgia",
    description:
      "Aprenda cómo elegir una agencia de subrogación y por qué las familias internacionales confían en Happy Family. Precios transparentes, clínicas acreditadas y apoyo 24/7.",
    keywords: [
      "cómo elegir agencia de subrogación",
      "agencia de subrogación georgia",
      "mejor agencia de subrogación",
    ],
  },
  ru: {
    title: "Почему мы | Надёжное агентство суррогатного материнства в Грузии",
    description:
      "Узнайте, как выбрать агентство суррогатного материнства и почему международные семьи доверяют Happy Family. Прозрачные цены, аккредитованные клиники и поддержка 24/7.",
    keywords: [
      "как выбрать агентство суррогатного материнства",
      "суррогатное материнство грузия",
      "лучшее агентство суррогатности",
    ],
  },
  he: {
    title: "למה לבחור בנו | סוכנות פונדקאות מהימנה בגאורגיה",
    description:
      "למדו כיצד לבחור סוכנות פונדקאות ומדוע משפחות בינלאומיות סומכות על Happy Family. תמחור שקוף, מרפאות מוסמכות ותמיכה 24/7.",
    keywords: [
      "איך לבחור סוכנות פונדקאות",
      "פונדקאות בגאורגיה",
      "סוכנות פונדקאות מומלצת",
    ],
  },
  zh: {
    title: "为什么选择我们 | 格鲁吉亚值得信赖的代孕机构",
    description:
      "了解如何选择代孕机构，以及为什么国际家庭信赖 Happy Family。透明定价、认证诊所和全天候支持。",
    keywords: ["如何选择代孕机构", "格鲁吉亚代孕", "最佳代孕机构"],
  },
} as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale?: string;
  }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content =
    localizedMeta[locale as keyof typeof localizedMeta] || localizedMeta.en;
  return buildPageMetadata({
    title: content.title,
    description: content.description,
    keywords: [...content.keywords],
    path: "/why-choose-us",
    locale: locale || "en",
  });
}
export default function WhyChooseUsPage() {
  return <WhyChooseUs />;
}
