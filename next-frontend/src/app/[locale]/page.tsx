import Home from "@/components/Home/Home";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

const HomePage = () => {
  return <Home />;
};

export default HomePage;

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  const { locale } = await params;

  const localized = {
    en: {
      title: "Surrogacy in Georgia - Miracle Makers",
      description:
        "Compassionate surrogacy and egg donation services in Georgia. Expert guidance for intended parents, surrogates, and donors. Start your family journey in Tbilisi.",
      keywords: [
        "surrogacy in Georgia",
        "egg donation Georgia",
        "Tbilisi surrogacy",
        "Georgia fertility clinic",
        "gestational surrogacy Georgia",
      ],
    },
    ka: {
      title: "სუროგაცია საქართველოში - Miracle Makers",
      description:
        "ზრუნვით სუროგაციისა და კვერცხუჯრედის დონაციის სერვისები საქართველოში. ექსპერტული მხარდაჭერა მშობლობის გზაზე თბილისში.",
      keywords: [
        "სუროგაცია საქართველოში",
        "დონაცია საქართველო",
        "თბილისი სუროგაცია",
        "ფერტილობის კლინიკა საქართველო",
      ],
    },
    es: {
      title: "Subrogación en Georgia - Miracle Makers",
      description:
        "Servicios de subrogación y donación de óvulos en Georgia. Acompañamiento experto en Tbilisi para tu camino hacia la paternidad.",
      keywords: [
        "subrogación en Georgia",
        "donación de óvulos Georgia",
        "subrogación Tiflis",
      ],
    },
    ru: {
      title: "Суррогатное материнство в Грузии - Miracle Makers",
      description:
        "Сервисы суррогатного материнства и донорства яйцеклеток в Грузии. Экспертное сопровождение в Тбилиси.",
      keywords: [
        "суррогатное материнство в Грузии",
        "донорство яйцеклеток Грузия",
        "суррогатная программа Тбилиси",
      ],
    },
    he: {
      title: "פונדקאות בגאורגיה - Miracle Makers",
      description:
        "שירותי פונדקאות ותרומת ביצית בגאורגיה. ליווי מקצועי בדרך להורות בטביליסי.",
      keywords: [
        "פונדקאות בגאורגיה",
        "תרומת ביצית גאורגיה",
        "פונדקאות טביליסי",
      ],
    },
    zh: {
      title: "格鲁吉亚代孕 - Miracle Makers",
      description:
        "在格鲁吉亚提供贴心的代孕与供卵服务。第比利斯专业团队，助您开启成家之旅。",
      keywords: ["格鲁吉亚代孕", "格鲁吉亚供卵", "第比利斯 代孕"],
    },
  } as const;

  const fallback = localized.en;
  const content = localized[locale as keyof typeof localized] || fallback;

  return buildPageMetadata({
    title: content.title,
    description: content.description,
    keywords: [...content.keywords],
    path: "/",
  });
}
