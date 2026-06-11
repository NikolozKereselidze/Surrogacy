import type { Metadata } from "next";
import Programs from "@/components/Programs/Programs";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";

const localizedMeta = {
  en: {
    title: "Surrogacy with Egg Donor in Georgia | Gestational Program",
    description:
      "Surrogacy with an egg donor in Georgia country for international intended parents. Donor matching, IVF in Tbilisi, embryo transfer, timelines, and end-to-end support from Happy Family.",
    keywords: [
      ...getMetaKeywords("en"),
      "surrogacy with egg donor",
      "egg donor surrogacy georgia",
      "donor egg IVF georgia",
      "gestational surrogacy egg donor",
    ],
  },
  ka: {
    title: "სუროგაცია კვერცხუჯრედის დონორით საქართველოში",
    description:
      "სუროგაცია კვერცხუჯრედის დონორით საქართველოში საერთაშორისო მშობლებისთვის. დონორის შერჩევა, ივფ თბილისში, ემბრიონის გადატანა და სრული მხარდაჭერა.",
    keywords: [
      ...getMetaKeywords("ka"),
      "სუროგაცია და დონაცია",
      "სუროგაცია და დონაცია საქართველოში",
      "კვერცხუჯრედის დონაცია",
      "გესტაციური სუროგაცია",
    ],
  },
  es: {
    title: "Subrogación con Donante de Óvulos en Georgia | Programa Gestacional",
    description:
      "Gestación subrogada con donante de óvulos en Georgia país para padres internacionales. Emparejamiento de donante, FIV en Tiflis, transferencia de embriones y apoyo integral.",
    keywords: [
      ...getMetaKeywords("es"),
      "subrogación con donante de óvulos",
      "donación de óvulos georgia",
      "gestación subrogada donante",
    ],
  },
  ru: {
    title: "Суррогатное Материнство с Донором Яйцеклеток в Грузии",
    description:
      "Суррогатное материнство с донором яйцеклеток в Грузии для иностранных родителей. Подбор донора, ЭКО в Тбилиси, перенос эмбрионов и комплексная поддержка.",
    keywords: [
      ...getMetaKeywords("ru"),
      "суррогатное материнство с донором",
      "донорство яйцеклеток грузия",
      "суррогатная программа тбилиси",
    ],
  },
  he: {
    title: "פונדקאות עם תורמת ביציות בגאורגיה | תוכנית גסטציונלית",
    description:
      "פונדקאות עם תורמת ביציות בגאורגיה להורים בינלאומיים. התאמת תורמת, IVF בטביליסי, העברת עוברים וליווי מקיף מ-Happy Family.",
    keywords: [
      ...getMetaKeywords("he"),
      "פונדקאות עם תורמת ביציות",
      "תרומת ביצית גאורגיה",
      "פונדקאות גסטציונלית בגאורגיה",
    ],
  },
  zh: {
    title: "格鲁吉亚供卵代孕 | 妊娠代孕项目",
    description:
      "格鲁吉亚供卵代孕，面向国际意向父母。供卵者匹配、第比利斯试管婴儿、胚胎移植及全程支持服务。",
    keywords: [
      ...getMetaKeywords("zh"),
      "格鲁吉亚供卵",
      "格鲁吉亚供卵代孕",
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
    path: "/surrogacy-with-egg-donor",
    locale: locale || "en",
  });
}

const SurrogacyWithEggDonor = () => {
  return <Programs programType="surrogacyWithEggDonor" />;
};

export default SurrogacyWithEggDonor;
