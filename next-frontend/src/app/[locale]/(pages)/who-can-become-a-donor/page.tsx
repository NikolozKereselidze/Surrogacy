import type { Metadata } from "next";
import WhoCanBecomeDonor from "@/components/Donors/WhoCanBecomeDonor";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";

const localizedMeta = {
  en: {
    title: "Who Can Become an Egg Donor | Requirements in Georgia",
    description:
      "Egg donor eligibility in Georgia country: age and health criteria, screening steps, commitment overview, and supportive guidance from application through donation.",
    keywords: [
      ...getMetaKeywords("en"),
      "who can become an egg donor",
      "egg donor requirements georgia",
      "egg donation georgia",
      "egg donor screening",
    ],
  },
  ka: {
    title: "ვინ შეიძლება გახდეს კვერცხუჯრედის დონორი | მოთხოვნები",
    description:
      "კვერცხუჯრედის დონორის უფლებამოსილება საქართველოში: ასაკი და ჯანმრთელობის კრიტერიუმები, სკრინინგი და მხარდაჭერა განაცხადიდან დონაციამდე.",
    keywords: [
      ...getMetaKeywords("ka"),
      "ვინ შეიძლება გახდეს კვერცხუჯრედის დონორი",
      "კვერცხუჯრედის დონორი",
      "კვერცხუჯრედის დონაცია",
      "დონაცია საქართველო",
    ],
  },
  es: {
    title: "¿Quién Puede Ser Donante de Óvulos? | Requisitos en Georgia",
    description:
      "Elegibilidad para donantes de óvulos en Georgia país: criterios de edad y salud, evaluación, compromiso y orientación de apoyo desde la solicitud hasta la donación.",
    keywords: [
      ...getMetaKeywords("es"),
      "quién puede ser donante de óvulos",
      "donación de óvulos georgia",
      "requisitos donante óvulos",
    ],
  },
  ru: {
    title: "Кто Может Стать Донором Яйцеклеток | Требования в Грузии",
    description:
      "Требования к донорам яйцеклеток в Грузии: возраст и здоровье, этапы скрининга, обязательства и поддержка от заявки до донации.",
    keywords: [
      ...getMetaKeywords("ru"),
      "кто может стать донором яйцеклеток",
      "донорство яйцеклеток грузия",
      "требования к донорам яйцеклеток",
    ],
  },
  he: {
    title: "מי יכולה להיות תורמת ביציות | דרישות בגאורגיה",
    description:
      "זכאות לתורמות ביציות בגאורגיה: קריטריוני גיל ובריאות, שלבי סינון, התחייבות וליווי תומך מהגשת הבקשה ועד התרומה.",
    keywords: [
      ...getMetaKeywords("he"),
      "מי יכולה להיות תורמת ביציות",
      "תרומת ביצית גאורגיה",
      "דרישות תורמת ביציות",
    ],
  },
  zh: {
    title: "谁可以成为卵子捐赠者 | 格鲁吉亚供卵要求",
    description:
      "格鲁吉亚卵子捐赠者资格要求：年龄与健康标准、筛查步骤、承诺说明及从申请到捐赠的全程支持。",
    keywords: [
      ...getMetaKeywords("zh"),
      "格鲁吉亚供卵要求",
      "格鲁吉亚供卵",
      "卵子捐赠者资格",
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
    path: "/who-can-become-a-donor",
    locale: locale || "en",
  });
}

function WhoCanBecomeADonorPage() {
  return <WhoCanBecomeDonor />;
}

export default WhoCanBecomeADonorPage;
