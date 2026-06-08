import type { Metadata } from "next";
import WhyBecomeDonor from "@/components/Donors/WhyBecomeDonor";
import { buildPageMetadata } from "@/lib/seo";

const localizedMeta = {
  en: {
    title: "Why Become an Egg Donor in Georgia | Help Families, Get Support",
    description:
      "Learn why to become an egg donor in Georgia: meaningful impact, safe medical care, thorough screening, and supportive guidance from start to finish.",
    keywords: [
      "why become an egg donor",
      "egg donation georgia",
      "egg donor",
      "donating eggs",
      "egg donor process",
      "egg donor requirements",
      "egg donation screening",
    ],
  },
  ka: {
    title: "რატომ გახდეთ კვერცხუჯრედის დონორი საქართველოში",
    description:
      "გაიგეთ რატომ ღირს კვერცხუჯრედის დონორობა საქართველოში: უსაფრთხო პროცესი, საფუძვლიანი სკრინინგი და მხარდაჭერა ყველა ეტაპზე.",
    keywords: [
      "კვერცხუჯრედის დონორი",
      "კვერცხუჯრედის დონაცია",
      "დონაცია",
      "კვერცხუჯრედის დონორობა",
      "კვერცხუჯრედის დონაციის პროცესი",
    ],
  },
  es: {
    title: "¿Por qué convertirse en donante de óvulos en Georgia? | Ayude a familias",
    description:
      "Descubra por qué convertirse en donante de óvulos en Georgia: impacto significativo, atención médica segura, evaluación exhaustiva y orientación de apoyo.",
    keywords: [
      "por qué ser donante de óvulos",
      "donación de óvulos georgia",
      "donante de óvulos",
      "donar óvulos",
      "proceso de donación de óvulos",
      "requisitos para donar óvulos",
    ],
  },
  he: {
    title: "למה להפוך לתורמת ביציות בגאורגיה | עזרי למשפחות, קבלי תמיכה",
    description:
      "למדי למה להפוך לתורמת ביציות בגאורגיה: השפעה משמעותית, טיפול רפואי בטוח, סינון מקיף וליווי תומך מתחילת הדרך ועד סופה.",
    keywords: [
      "למה לתרום ביציות",
      "תרומת ביציות גאורגיה",
      "תורמת ביציות",
      "תרומת ביציות",
      "תהליך תרומת ביציות",
      "דרישות לתרומת ביציות",
    ],
  },
  ru: {
    title: "Почему стоит стать донором яйцеклеток в Грузии | Помощь семьям",
    description:
      "Узнайте, почему стоит стать донором яйцеклеток в Грузии: значимый вклад, безопасная медицинская помощь, тщательный скрининг и поддержка на каждом этапе.",
    keywords: [
      "почему стать донором яйцеклеток",
      "донорство яйцеклеток грузия",
      "донор яйцеклеток",
      "донорство яйцеклеток",
      "процесс донорства яйцеклеток",
      "требования к донорам яйцеклеток",
    ],
  },
  zh: {
    title: "为什么在格鲁吉亚成为卵子捐赠者 | 帮助家庭，获得支持",
    description:
      "了解为什么在格鲁吉亚成为卵子捐赠者：意义深远的影响、安全的医疗护理、彻底的筛查以及全程的支持与指导。",
    keywords: [
      "为什么成为卵子捐赠者",
      "格鲁吉亚卵子捐赠",
      "卵子捐赠者",
      "捐赠卵子",
      "卵子捐赠过程",
      "卵子捐赠要求",
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
    path: "/why-become-a-donor",
    locale: locale || "en",
  });
}

export default function WhyBecomeADonorPage() {
  return <WhyBecomeDonor />;
}

