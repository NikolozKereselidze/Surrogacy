import type { Metadata } from "next";
import WhoCanBecomeParent from "@/components/Parents/WhoCanBecomeParent";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";

const localizedMeta = {
  en: {
    title: "Who Can Become a Parent | Surrogacy in Georgia Country",
    description:
      "Eligibility for intended parents pursuing surrogacy in Georgia country. Documentation, screening, legal requirements, and steps to begin your family-building journey in Tbilisi.",
    keywords: [
      ...getMetaKeywords("en"),
      "who can become a parent",
      "intended parent eligibility georgia",
      "surrogacy eligibility georgia",
      "international surrogacy georgia",
    ],
  },
  ka: {
    title: "ვინ შეიძლება გახდეს მშობელი | სუროგაცია საქართველოში",
    description:
      "მშობლობის კანდიდატების უფლებამოსილება სუროგაციის პროგრამაში საქართველოში. დოკუმენტაცია, სკრინინგი, იურიდიული მოთხოვნები და პირველი ნაბიჯები.",
    keywords: [
      ...getMetaKeywords("ka"),
      "ვინ შეიძლება გახდეს მშობელი",
      "სუროგაცია საქართველოში",
      "სუროგაციის ცენტრი",
    ],
  },
  es: {
    title: "¿Quién Puede Ser Padre? | Subrogación en Georgia País",
    description:
      "Elegibilidad para padres de intención en programas de subrogación en Georgia país. Documentación, evaluación, requisitos legales y primeros pasos en Tiflis.",
    keywords: [
      ...getMetaKeywords("es"),
      "quién puede ser padre subrogación",
      "subrogación en georgia",
      "padres internacionales georgia",
    ],
  },
  ru: {
    title: "Кто Может Стать Родителем | Суррогатное Материнство в Грузии",
    description:
      "Требования для будущих родителей в программах суррогатного материнства в Грузии. Документы, скрининг, юридические требования и первые шаги в Тбилиси.",
    keywords: [
      ...getMetaKeywords("ru"),
      "кто может стать родителем суррогатность",
      "суррогатное материнство в грузии",
      "суррогатная программа тбилиси",
    ],
  },
  he: {
    title: "מי יכול להיות הורה | פונדקאות בגאורגיה",
    description:
      "זכאות להורים מיועדים בתוכניות פונדקאות בגאורגיה. מסמכים, סינון, דרישות משפטיות והצעדים הראשונים בדרך לבניית משפחה בטביליסי.",
    keywords: [
      ...getMetaKeywords("he"),
      "מי יכול להיות הורה פונדקאות",
      "פונדקאות בגאורגיה",
      "פונדקאות ישראלי בגאורגיה",
    ],
  },
  zh: {
    title: "谁可以成为父母 | 格鲁吉亚代孕资格",
    description:
      "格鲁吉亚代孕项目中意向父母的资格要求。文件准备、筛查流程、法律要求及在第比利斯开启家庭之旅的第一步。",
    keywords: [
      ...getMetaKeywords("zh"),
      "格鲁吉亚代孕资格",
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
    path: "/who-can-become-a-parent",
    locale: locale || "en",
  });
}

function WhoCanBecomeAParentPage() {
  return <WhoCanBecomeParent />;
}

export default WhoCanBecomeAParentPage;
