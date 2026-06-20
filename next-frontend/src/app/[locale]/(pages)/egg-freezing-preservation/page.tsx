import type { Metadata } from "next";
import Programs from "@/components/Programs/Programs";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";
const localizedMeta = {
    en: {
        title: "Egg Freezing in Georgia | Fertility Preservation Tbilisi",
        description: "Egg freezing and fertility preservation in Georgia country. Oocyte cryopreservation, ideal candidates, success rates, and support from consultation through storage at partner clinics in Tbilisi.",
        keywords: [
            ...getMetaKeywords("en"),
            "egg freezing georgia",
            "fertility preservation georgia",
            "oocyte cryopreservation",
            "ivf georgia",
            "egg freezing tbilisi",
        ],
    },
    ka: {
        title: "კვერცხუჯრედის გაყინვა საქართველოში | ფერტილობის შენახვა",
        description: "კვერცხუჯრედის გაყინვა და ფერტილობის შენახვა საქართველოში. ოვოციტის კრიოკონსერვაცია, კანდიდატების შეფასება და მხარდაჭერა თბილისის პარტნიორ კლინიკებში.",
        keywords: [
            ...getMetaKeywords("ka"),
            "კვერცხუჯრედის გაყინვა",
            "ფერტილობის შენახვა",
            "ინ ვიტრო",
            "ინ ვიტრო კლინიკა",
        ],
    },
    es: {
        title: "Congelación de Óvulos en Georgia | Preservación de Fertilidad",
        description: "Congelación de óvulos y preservación de fertilidad en Georgia país. Criopreservación de ovocitos, candidatas ideales y apoyo en clínicas asociadas en Tiflis.",
        keywords: [
            ...getMetaKeywords("es"),
            "congelación de óvulos georgia",
            "preservación de fertilidad",
            "fiv georgia",
        ],
    },
    ru: {
        title: "Заморозка Яйцеклеток в Грузии | Сохранение Фертильности",
        description: "Заморозка яйцеклеток и сохранение фертильности в Грузии. Криоконсервация ооцитов, оценка кандидатов и поддержка в партнёрских клиниках Тбилиси.",
        keywords: [
            ...getMetaKeywords("ru"),
            "заморозка яйцеклеток грузия",
            "сохранение фертильности",
            "эко в грузии",
        ],
    },
    he: {
        title: "הקפאת ביציות בגאורגיה | שימור פוריות",
        description: "הקפאת ביציות ושימור פוריות בגאורגיה. קריוקונסרבציה של ביציות, הערכת מועמדות וליווי בקליניקות שותפות בטביליסי.",
        keywords: [
            ...getMetaKeywords("he"),
            "הקפאת ביציות גאורגיה",
            "שימור פוריות",
            "תרומת ביצית גאורגיה",
        ],
    },
    zh: {
        title: "格鲁吉亚冻卵 | 生育力保存",
        description: "格鲁吉亚冻卵与生育力保存服务。卵子冷冻、适合人群评估、成功率说明，以及第比利斯合作诊所全程支持。",
        keywords: [
            ...getMetaKeywords("zh"),
            "格鲁吉亚冻卵",
            "格鲁吉亚试管婴儿",
            "生育力保存",
        ],
    },
} as const;
export async function generateMetadata({ params, }: {
    params: Promise<{
        locale?: string;
    }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const content = localizedMeta[locale as keyof typeof localizedMeta] || localizedMeta.en;
    return buildPageMetadata({
        title: content.title,
        description: content.description,
        keywords: [...content.keywords],
        path: "/egg-freezing-preservation",
        locale: locale || "en",
    });
}
const EggFreezingPreservation = () => {
    return <Programs programType="eggFreezing"/>;
};
export default EggFreezingPreservation;
