import type { Metadata } from "next";
import WhoCanBecomeASurrogate from "@/components/Surrogates/WhoCanBecomeSurrogate";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";

const localizedMeta = {
  en: {
    title: "Who Can Become a Surrogate | Requirements in Georgia",
    description:
      "Surrogate eligibility and requirements in Georgia country: health criteria, screening, legal considerations, compensation overview, and support throughout the surrogacy journey.",
    keywords: [
      ...getMetaKeywords("en"),
      "who can become a surrogate",
      "surrogate requirements georgia",
      "surrogate screening georgia",
      "gestational surrogate georgia",
    ],
  },
  ka: {
    title: "ვინ შეიძლება გახდეს სუროგატი | მოთხოვნები საქართველოში",
    description:
      "სუროგატის უფლებამოსილება და მოთხოვნები საქართველოში: ჯანმრთელობის კრიტერიუმები, სკრინინგი, იურიდიული ასპექტები და მხარდაჭერა მთელი პროცესის განმავლობაში.",
    keywords: [
      ...getMetaKeywords("ka"),
      "ვინ შეიძლება გახდეს სუროგატი",
      "სუროგატი",
      "სუროგატი დედები",
      "სუროგაციის ცენტრი",
    ],
  },
  es: {
    title: "¿Quién Puede Ser Gestante? | Requisitos en Georgia",
    description:
      "Elegibilidad y requisitos para gestantes en Georgia país: criterios de salud, evaluación, consideraciones legales y apoyo durante todo el proceso de subrogación.",
    keywords: [
      ...getMetaKeywords("es"),
      "quién puede ser gestante",
      "requisitos subrogada georgia",
      "gestación subrogada georgia",
    ],
  },
  ru: {
    title: "Кто Может Стать Суррогатной Матерью | Требования в Грузии",
    description:
      "Требования к суррогатным матерям в Грузии: медицинские критерии, скрининг, юридические аспекты и поддержка на всех этапах суррогатной программы.",
    keywords: [
      ...getMetaKeywords("ru"),
      "кто может стать суррогатной матерью",
      "требования к суррогатной матери",
      "суррогатное материнство в грузии",
    ],
  },
  he: {
    title: "מי יכולה להיות פונדקאית | דרישות בגאורגיה",
    description:
      "זכאות ודרישות לפונדקאיות בגאורגיה: קריטריוני בריאות, סינון, שיקולים משפטיים ותמיכה לאורך כל תהליך הפונדקאות.",
    keywords: [
      ...getMetaKeywords("he"),
      "מי יכולה להיות פונדקאית",
      "דרישות פונדקאית גאורגיה",
      "פונדקאות בגאורגיה",
    ],
  },
  zh: {
    title: "谁可以成为代孕妈妈 | 格鲁吉亚代孕要求",
    description:
      "格鲁吉亚代孕妈妈资格与要求：健康标准、筛查流程、法律考量及代孕全程支持服务。",
    keywords: [
      ...getMetaKeywords("zh"),
      "格鲁吉亚代孕妈妈要求",
      "格鲁吉亚代孕",
      "第比利斯代孕",
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
    path: "/who-can-become-a-surrogate",
    locale: locale || "en",
  });
}

function WhoCanBecomeASurrogatePage() {
  return <WhoCanBecomeASurrogate />;
}

export default WhoCanBecomeASurrogatePage;
