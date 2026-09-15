import type { Metadata } from "next";
import SurrogacyInGeorgia from "@/components/SurrogacyInGeorgia/SurrogacyInGeorgia";
import { buildPageMetadata } from "@/lib/seo";
const localizedMeta = {
  en: {
    title: "Surrogacy in Georgia | Gestational Surrogacy",
    description:
      "Gestational surrogacy in Georgia for international intended parents, with transparent packages, IVF coordination in Tbilisi, surrogate matching, and dedicated family support.",
    keywords: [
      "surrogacy in georgia",
      "gestational surrogacy georgia",
      "surrogacy georgia cost",
      "surrogacy georgia legal",
      "surrogacy tbilisi",
      "international surrogacy georgia",
      "egg donation georgia",
      "affordable surrogacy abroad",
    ],
  },
  ka: {
    title: "სუროგაცია საქართველოში | გესტაციური სუროგაცია",
    description:
      "გესტაციური სუროგაცია საქართველოში საერთაშორისო მშობლებისთვის, IVF-ის კოორდინაციით, სუროგატის შერჩევითა და ოჯახური მხარდაჭერით.",
    keywords: [
      "სუროგაცია საქართველოში",
      "გესტაციური სუროგაცია",
      "სუროგაციის ღირებულება",
    ],
  },
  es: {
    title: "Subrogación en Georgia | Gestación Subrogada Internacional",
    description:
      "Gestación subrogada en Georgia para padres internacionales, con coordinación de FIV, selección de subrogada y apoyo familiar dedicado.",
    keywords: [
      "subrogación en georgia",
      "gestación subrogada georgia",
      "costo subrogación georgia",
    ],
  },
  ru: {
    title: "Суррогатное материнство в Грузии | Гестационная суррогатность",
    description:
      "Гестационное суррогатное материнство в Грузии для иностранных родителей: координация ЭКО, подбор суррогатной матери и поддержка семьи.",
    keywords: [
      "суррогатное материнство в грузии",
      "суррогатность грузия",
      "стоимость суррогатности грузия",
    ],
  },
  he: {
    title: "פונדקאות בגאורגיה | פונדקאות גסטציונלית",
    description:
      "פונדקאות גסטציונלית בגאורגיה להורים בינלאומיים, עם תיאום IVF, התאמת פונדקאית ותמיכה משפחתית ייעודית.",
    keywords: [
      "פונדקאות בגאורגיה",
      "פונדקאות גסטציונלית",
      "עלות פונדקאות גאורגיה",
    ],
  },
  zh: {
    title: "格鲁吉亚代孕 | 妊娠代孕国际服务",
    description:
      "面向国际准父母的格鲁吉亚妊娠代孕协调服务，包括试管婴儿、代孕妈妈匹配及专属家庭支持。",
    keywords: [
      "格鲁吉亚代孕",
      "妊娠代孕",
      "格鲁吉亚代孕费用",
      "格鲁吉亚代孕合法",
    ],
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
    path: "/surrogacy-in-georgia",
    locale: locale || "en",
  });
}
export default function SurrogacyInGeorgiaPage() {
  return <SurrogacyInGeorgia />;
}
