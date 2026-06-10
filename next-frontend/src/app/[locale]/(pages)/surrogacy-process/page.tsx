import type { Metadata } from "next";
import SurrogacyProcess from "@/components/Surrogates/SurrogacyProcess";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";

const localizedMeta = {
  en: {
    title: "Surrogacy Process in Georgia | Gestational Surrogacy Steps",
    description:
      "Step-by-step gestational surrogacy process in Georgia country for international intended parents. From Tbilisi consultation and IVF to surrogate matching, birth, and birth certificate registration under Georgia surrogacy laws.",
    keywords: [
      ...getMetaKeywords("en"),
      "surrogacy process in georgia",
      "what is the surrogacy process in georgia",
      "gestational surrogacy process georgia",
      "georgia surrogacy timeline",
      "surrogacy steps tbilisi",
    ],
  },
  ka: {
    title: "სუროგაციის პროცესი საქართველოში | გესტაციური სუროგაცია",
    description:
      "გესტაციური სუროგაციის ნაბიჯ-ნაბიჯ პროცესი საქართველოში საერთაშორისო მშობლებისთვის. კონსულტაციიდან ივფ-მდე თბილისში, სუროგატის შერჩევიდან დაბადებამდე და დაბადების მოწმობის რეგისტრაციამდე.",
    keywords: [
      ...getMetaKeywords("ka"),
      "როგორ ხდება სუროგაცია",
      "სუროგაციის პროცესი",
      "გესტაციური სუროგაცია",
      "სუროგაცია თბილისში",
    ],
  },
  es: {
    title: "Proceso de Subrogación en Georgia | Gestación Subrogada",
    description:
      "Proceso paso a paso de gestación subrogada en Georgia país para padres internacionales. Desde consulta e FIV en Tiflis hasta emparejamiento con subrogada, nacimiento y registro del certificado de nacimiento bajo las leyes de subrogación en Georgia.",
    keywords: [
      ...getMetaKeywords("es"),
      "proceso subrogación georgia",
      "gestación subrogada pasos",
      "subrogación tbilisi proceso",
    ],
  },
  ru: {
    title: "Процесс Суррогатного Материнства в Грузии | Этапы Программы",
    description:
      "Пошаговый процесс суррогатного материнства в Грузии для международных родителей. От консультации и ЭКО в Тбилиси до подбора суррогатной матери, родов и регистрации свидетельства о рождении по законам Грузии.",
    keywords: [
      ...getMetaKeywords("ru"),
      "процесс суррогатного материнства в грузии",
      "этапы суррогатного материнства",
      "суррогатная программа тбилиси",
    ],
  },
  he: {
    title: "תהליך פונדקאות בגאורגיה | פונדקאות גסטציונלית",
    description:
      "תהליך פונדקאות גסטציונלית שלב אחר שלב בגאורגיה להורים בינלאומיים. מייעוץ ו-IVF בטביליסי, דרך התאמת פונדקאית, לידה ורישום תעודת לידה לפי חוקי הפונדקאות בגאורגיה.",
    keywords: [
      ...getMetaKeywords("he"),
      "תהליך פונדקאות בגאורגיה",
      "פונדקאות גסטציונלית שלבים",
      "פונדקאות טביליסי",
    ],
  },
  zh: {
    title: "格鲁吉亚代孕流程 | 妊娠代孕步骤指南",
    description:
      "为国际意向父母详解格鲁吉亚妊娠代孕流程。从第比利斯咨询和试管婴儿，到代孕妈妈匹配、分娩及出生证明登记，全程符合格鲁吉亚代孕法律框架。",
    keywords: [
      ...getMetaKeywords("zh"),
      "格鲁吉亚代孕流程",
      "格鲁吉亚代孕步骤",
      "第比利斯代孕过程",
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
    path: "/surrogacy-process",
    locale: locale || "en",
  });
}

export default function SurrogacyProcessPage() {
  return <SurrogacyProcess />;
}
