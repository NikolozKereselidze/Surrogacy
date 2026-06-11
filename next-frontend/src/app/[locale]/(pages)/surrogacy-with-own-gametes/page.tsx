import type { Metadata } from "next";
import Programs from "@/components/Programs/Programs";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";

const localizedMeta = {
  en: {
    title: "Surrogacy with Own Gametes in Georgia | IVF & Embryo Transfer",
    description:
      "Gestational surrogacy using your own eggs and sperm in Georgia country. Eligibility, IVF in Tbilisi, embryo creation and transfer, timelines, and comprehensive support for international intended parents.",
    keywords: [
      ...getMetaKeywords("en"),
      "surrogacy with own gametes",
      "own eggs and sperm surrogacy georgia",
      "gestational surrogacy own gametes",
      "IVF surrogacy georgia",
    ],
  },
  ka: {
    title: "სუროგაცია საკუთარი გამეტებით საქართველოში | ივფ და ემბრიონის გადატანა",
    description:
      "გესტაციური სუროგაცია საკუთარი კვერცხუჯრედებითა და სპერმით საქართველოში. უფლებამოსილება, ივფ თბილისში, ემბრიონის შექმნა და გადატანა საერთაშორისო მშობლებისთვის.",
    keywords: [
      ...getMetaKeywords("ka"),
      "სუროგაცია საკუთარი გამეტებით",
      "ინ ვიტრო განაყოფიერება",
      "გესტაციური სუროგაცია",
      "ემბრიონი",
    ],
  },
  es: {
    title: "Subrogación con Gametos Propios en Georgia | FIV y Transferencia",
    description:
      "Gestación subrogada con óvulos y esperma propios en Georgia país. Elegibilidad, FIV en Tiflis, creación y transferencia de embriones para padres internacionales.",
    keywords: [
      ...getMetaKeywords("es"),
      "subrogación con gametos propios",
      "gestación subrogada FIV georgia",
      "fiv georgia",
    ],
  },
  ru: {
    title: "Суррогатное Материнство с Собственными Гаметами в Грузии",
    description:
      "Гестационное суррогатное материнство с собственными яйцеклетками и спермой в Грузии. ЭКО в Тбилиси, создание и перенос эмбрионов для международных родителей.",
    keywords: [
      ...getMetaKeywords("ru"),
      "суррогатное материнство с собственными гаметами",
      "эко в грузии",
      "суррогатная программа тбилиси",
    ],
  },
  he: {
    title: "פונדקאות עם גמטות עצמיות בגאורגיה | IVF והעברת עוברים",
    description:
      "פונדקאות גסטציונלית עם ביציות וזרע עצמיים בגאורגיה. זכאות, IVF בטביליסי, יצירת והעברת עוברים וליווי מקיף להורים בינלאומיים.",
    keywords: [
      ...getMetaKeywords("he"),
      "פונדקאות עם גמטות עצמיות",
      "פונדקאות גסטציונלית בגאורגיה",
      "פונדקאות טביליסי",
    ],
  },
  zh: {
    title: "格鲁吉亚自卵代孕 | 试管婴儿与胚胎移植",
    description:
      "格鲁吉亚自卵自精妊娠代孕。资格评估、第比利斯试管婴儿、胚胎创建与移植，为国际意向父母提供全程支持。",
    keywords: [
      ...getMetaKeywords("zh"),
      "格鲁吉亚自卵代孕",
      "格鲁吉亚试管婴儿",
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
    path: "/surrogacy-with-own-gametes",
    locale: locale || "en",
  });
}

const SurrogacyWithOwnGametes = () => {
  return <Programs programType="surrogacyWithOwnGametes" />;
};

export default SurrogacyWithOwnGametes;
