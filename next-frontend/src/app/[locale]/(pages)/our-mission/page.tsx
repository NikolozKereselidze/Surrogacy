import type { Metadata } from "next";
import OurMission from "@/components/About/OurMission";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";

const localizedMeta = {
  en: {
    title: "Our Mission | Ethical Surrogacy in Georgia Country",
    description:
      "Happy Family's mission: ethical, supportive, and personalized surrogacy and egg donation journeys for every family in Georgia country and worldwide.",
    keywords: [
      ...getMetaKeywords("en"),
      "surrogacy mission",
      "ethical surrogacy georgia",
      "family building georgia",
      "compassionate surrogacy",
    ],
  },
  ka: {
    title: "ჩვენი მისია | ეთიკური სუროგაცია საქართველოში",
    description:
      "Happy Family-ის მისია: ეთიკური, მხარდამჭერი და პერსონალიზებული სუროგაციისა და კვერცხუჯრედის დონაციის გზები ყველა ოჯახისთვის საქართველოში და მსოფლიოში.",
    keywords: [
      ...getMetaKeywords("ka"),
      "სუროგაციის მისია",
      "სუროგაცია საქართველოში",
      "სუროგაციის ცენტრი",
    ],
  },
  es: {
    title: "Nuestra Misión | Subrogación Ética en Georgia País",
    description:
      "La misión de Happy Family: recorridos éticos, solidarios y personalizados de subrogación y donación de óvulos para cada familia en Georgia país y en todo el mundo.",
    keywords: [
      ...getMetaKeywords("es"),
      "misión subrogación",
      "subrogación ética georgia",
      "subrogación en georgia",
    ],
  },
  ru: {
    title: "Наша Миссия | Этичное Суррогатное Материнство в Грузии",
    description:
      "Миссия Happy Family: этичные, поддерживающие и персонализированные программы суррогатного материнства и донорства яйцеклеток для семей в Грузии и по всему миру.",
    keywords: [
      ...getMetaKeywords("ru"),
      "миссия суррогатного материнства",
      "суррогатное материнство в грузии",
      "этичная суррогатность",
    ],
  },
  he: {
    title: "המשימה שלנו | פונדקאות אתית בגאורגיה",
    description:
      "משימת Happy Family: מסעות פונדקאות ותרומת ביציות אתיים, תומכים ומותאמים אישית לכל משפחה בגאורגיה וברחבי העולם.",
    keywords: [
      ...getMetaKeywords("he"),
      "משימת פונדקאות",
      "פונדקאות בגאורגיה",
      "פונדקאות אתית",
    ],
  },
  zh: {
    title: "我们的使命 | 格鲁吉亚合规代孕服务",
    description:
      "Happy Family 的使命：为格鲁吉亚及全球每个家庭提供合乎道德、贴心且个性化的代孕与供卵服务。",
    keywords: [
      ...getMetaKeywords("zh"),
      "代孕使命",
      "格鲁吉亚代孕",
      "格鲁吉亚代孕机构",
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
    path: "/our-mission",
    locale: locale || "en",
  });
}

export default function OurMissionPage() {
  return <OurMission />;
}
