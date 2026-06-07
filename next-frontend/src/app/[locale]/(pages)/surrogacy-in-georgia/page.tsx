import type { Metadata } from "next";
import SurrogacyInGeorgia from "@/components/SurrogacyInGeorgia/SurrogacyInGeorgia";
import { buildPageMetadata } from "@/lib/seo";

const localizedMeta = {
  en: {
    title:
      "Surrogacy in Georgia | Gestational Surrogacy for International Parents",
    description:
      "Gestational surrogacy in Georgia for international intended parents. Legally protected since 1997, transparent packages from $40,000, world-class IVF in Tbilisi, and fast birth certificate registration.",
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
      "გესტაციური სუროგაცია საქართველოში საერთაშორისო მშობლებისთვის. იურიდული დაცვა 1997 წლიდან, გამჭვირვალე პაკეტები $40,000-დან.",
    keywords: [
      "სუროგაცია საქართველოში",
      "გესტაციური სუროგაცია",
      "სუროგაციის ღირებულება",
    ],
  },
  es: {
    title: "Subrogación en Georgia | Gestación Subrogada Internacional",
    description:
      "Gestación subrogada en Georgia para padres internacionales. Marco legal desde 1997, paquetes transparentes desde $40,000 y clínicas de FIV en Tiflis.",
    keywords: [
      "subrogación en georgia",
      "gestación subrogada georgia",
      "costo subrogación georgia",
    ],
  },
  ru: {
    title: "Суррогатное материнство в Грузии | Гестационная суррогатность",
    description:
      "Гестационное суррогатное материнство в Грузии для иностранных родителей. Правовая защита с 1997 года, прозрачные программы от $40,000.",
    keywords: [
      "суррогатное материнство в грузии",
      "суррогатность грузия",
      "стоимость суррогатности грузия",
    ],
  },
  he: {
    title: "פונדקאות בגאורגיה | פונדקאות גסטציונלית",
    description:
      "פונדקאות גסטציונלית בגאורגיה להורים בינלאומיים. מסגרת משפטית מאז 1997, חבילות שקופות החל מ-$40,000.",
    keywords: [
      "פונדקאות בגאורגיה",
      "פונדקאות גסטציונלית",
      "עלות פונדקאות גאורגיה",
    ],
  },
  zh: {
    title: "格鲁吉亚代孕 | 妊娠代孕国际服务",
    description:
      "格鲁吉亚妊娠代孕，面向国际准父母。自1997年起受法律保护，套餐透明，起价约4万美元，第比利斯顶级试管婴儿诊所。",
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
  params: Promise<{ locale?: string }>;
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
