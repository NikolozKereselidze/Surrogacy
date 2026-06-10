import type { Metadata } from "next";
import SurrogateScreening from "@/components/Surrogates/SurrogateScreening";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";

const localizedMeta = {
  en: {
    title: "Surrogate Screening | Georgia Surrogacy",
    description:
      "Rigorous surrogate screening for gestational surrogacy in Georgia country. Medical, psychological, and background evaluations at accredited Tbilisi clinics  protecting international intended parents and surrogates throughout every Georgia surrogacy program.",
    keywords: [
      ...getMetaKeywords("en"),
      "surrogate screening georgia",
      "surrogate requirements georgia",
      "gestational surrogate screening",
      "surrogate medical evaluation",
      "georgia surrogacy program screening",
    ],
  },
  ka: {
    title: "სუროგატის სკრინინგი | გესტაციური სუროგაცია საქართველოში",
    description:
      "სრული სუროგატის სკრინინგი გესტაციური სუროგაციისთვის საქართველოში. სამედიცინო, ფსიქოლოგიური და ფონური შეფასება აკრედიტებულ კლინიკებში თბილისში  საერთაშორისო მშობლებისა და სუროგატების დაცვა.",
    keywords: [
      ...getMetaKeywords("ka"),
      "სუროგატის სკრინინგი",
      "სუროგატის მოთხოვნები",
      "სუროგატი დედები",
    ],
  },
  es: {
    title: "Evaluación de Subrogadas | Gestación Subrogada en Georgia",
    description:
      "Evaluación rigurosa de subrogadas para gestación subrogada en Georgia país. Exámenes médicos, psicológicos y de antecedentes en clínicas acreditadas de Tiflis  protegiendo a padres internacionales y subrogadas en cada programa.",
    keywords: [
      ...getMetaKeywords("es"),
      "evaluación subrogada georgia",
      "requisitos subrogada georgia",
      "cribado subrogada gestacional",
    ],
  },
  ru: {
    title: "Скрининг суррогатных матерей | Суррогатное материнство в Грузии",
    description:
      "Тщательный скрининг суррогатных матерей для суррогатного материнства в Грузии. Медицинская, психологическая и проверка биографии в аккредитованных клиниках Тбилиси  защита международных родителей и суррогатных матерей.",
    keywords: [
      ...getMetaKeywords("ru"),
      "скрининг суррогатной матери",
      "требования суррогатная мать грузия",
      "суррогатная программа тбилиси",
    ],
  },
  he: {
    title: "סינון פונדקאית | פונדקאות גסטציונלית בגאורגיה",
    description:
      "סינון מקיף לפונדקאיות בפונדקאות גסטציונלית בגאורגיה. הערכות רפואיות, פסיכולוגיות ורקע בקליניקות מוסמכות בטביליסי  להגנה על הורים בינלאומיים ופונדקאיות בכל שלב.",
    keywords: [
      ...getMetaKeywords("he"),
      "סינון פונדקאית גאורגיה",
      "דרישות פונדקאית",
      "פונדקאות גסטציונלית בגאורגיה",
    ],
  },
  zh: {
    title: "代孕妈妈筛查 | 格鲁吉亚妊娠代孕评估",
    description:
      "为格鲁吉亚妊娠代孕项目提供严格的代孕妈妈筛查。在第比利斯认证诊所完成医疗、心理及背景评估全程保护国际意向父母与代孕妈妈的权益。",
    keywords: [
      ...getMetaKeywords("zh"),
      "格鲁吉亚代孕妈妈要求",
      "代孕妈妈筛查",
      "妊娠代孕评估",
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
    path: "/surrogate-screening",
    locale: locale || "en",
  });
}

export default function SurrogateScreeningPage() {
  return <SurrogateScreening />;
}
