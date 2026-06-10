import type { Metadata } from "next";
import ParentScreening from "@/components/Parents/ParentScreening";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";

const localizedMeta = {
  en: {
    title: "Intended Parent Screening | Georgia Surrogacy",
    description:
      "Thorough intended parent screening for international families pursuing gestational surrogacy in Georgia country. Medical review, psychological assessment, and legal eligibility under Georgia surrogacy laws  coordinated in Tbilisi from first consultation to program start.",
    keywords: [
      ...getMetaKeywords("en"),
      "intended parent screening",
      "parent screening surrogacy georgia",
      "surrogacy eligibility georgia",
      "intended parent requirements",
      "georgia surrogacy program screening",
    ],
  },
  ka: {
    title: "მშობლების სკრინინგი | სუროგაცია საქართველოში",
    description:
      "საერთაშორისო მშობლების სრული სკრინინგი გესტაციური სუროგაციისთვის საქართველოში. სამედიცინო, ფსიქოლოგიური და იურიდიული შეფასება თბილისში  პირველი კონსულტაციიდან პროგრამის დაწყებამდე.",
    keywords: [
      ...getMetaKeywords("ka"),
      "მშობლების სკრინინგი",
      "სუროგაციის ელიგიბილობა",
      "სუროგაციის ცენტრი",
    ],
  },
  es: {
    title: "Evaluación de Padres | Subrogación en Georgia País",
    description:
      "Evaluación exhaustiva de padres intencionales para familias internacionales que buscan gestación subrogada en Georgia país. Revisión médica, evaluación psicológica y elegibilidad legal bajo las leyes de subrogación en Tiflis.",
    keywords: [
      ...getMetaKeywords("es"),
      "evaluación padres intencionales georgia",
      "requisitos subrogación georgia",
      "elegibilidad subrogación georgia",
    ],
  },
  ru: {
    title: "Скрининг родителей | Суррогатное материнство в Грузии",
    description:
      "Тщательный скрининг предполагаемых родителей для международных семей, выбирающих суррогатное материнство в Грузии. Медицинская, психологическая и юридическая оценка в Тбилиси  от первой консультации до начала программы.",
    keywords: [
      ...getMetaKeywords("ru"),
      "скрининг предполагаемых родителей",
      "требования суррогатное материнство грузия",
      "программа суррогатного материнства",
    ],
  },
  he: {
    title: "סינון הורים מיועדים | פונדקאות בגאורגיה",
    description:
      "סינון מקיף להורים מיועדים בינלאומיים המתחילים פונדקאות גסטציונלית בגאורגיה. הערכה רפואית, פסיכולוגית ומשפטית בטביליסי  מהייעוץ הראשון ועד תחילת התוכנית.",
    keywords: [
      ...getMetaKeywords("he"),
      "סינון הורים מיועדים",
      "זכאות לפונדקאות בגאורגיה",
      "דרישות פונדקאות גאורגיה",
    ],
  },
  zh: {
    title: "意向父母筛查 | 格鲁吉亚代孕资格评估",
    description:
      "为选择格鲁吉亚妊娠代孕的国际家庭提供全面的意向父母筛查。在第比利斯完成医疗审查、心理评估及格鲁吉亚代孕法律下的资格确认从首次咨询到项目启动。",
    keywords: [
      ...getMetaKeywords("zh"),
      "格鲁吉亚代孕资格",
      "意向父母筛查",
      "代孕父母要求",
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
    path: "/parent-screening",
    locale: locale || "en",
  });
}

export default function ParentScreeningPage() {
  return <ParentScreening />;
}
