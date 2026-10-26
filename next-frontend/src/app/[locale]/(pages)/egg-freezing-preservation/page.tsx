import type { Metadata } from "next";
import Programs from "@/components/Programs/Programs";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";
const localizedMeta = {
    en: {
        title: "Egg Freezing in Georgia | Fertility Preservation Tbilisi",
        description: "Egg freezing offers an option for people considering future fertility treatment. A clinic can explain the process, its limitations, and the factors that may affect your individual chances.",
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
        description: "კვერცხუჯრედების გაყინვა ერთ-ერთი ვარიანტია მათთვის, ვინც მომავალში ფერტილობის მკურნალობას განიხილავს. კლინიკა განმარტავს პროცესს, მის შეზღუდვებსა და ინდივიდუალურ შანსებზე მოქმედ ფაქტორებს.",
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
        description: "La congelación de óvulos es una opción para quienes consideran un tratamiento de fertilidad en el futuro. Una clínica puede explicar el proceso, sus limitaciones y los factores que influyen en las posibilidades individuales.",
        keywords: [
            ...getMetaKeywords("es"),
            "congelación de óvulos georgia",
            "preservación de fertilidad",
            "fiv georgia",
        ],
    },
    ru: {
        title: "Заморозка Яйцеклеток в Грузии | Сохранение Фертильности",
        description: "Замораживание яйцеклеток — один из вариантов для тех, кто рассматривает лечение бесплодия в будущем. Клиника может объяснить процесс, ограничения и факторы, влияющие на индивидуальные шансы.",
        keywords: [
            ...getMetaKeywords("ru"),
            "заморозка яйцеклеток грузия",
            "сохранение фертильности",
            "эко в грузии",
        ],
    },
    he: {
        title: "הקפאת ביציות בגאורגיה | שימור פוריות",
        description: "הקפאת ביציות היא אפשרות למי ששוקלות טיפול פוריות בעתיד. המרפאה יכולה להסביר את התהליך, מגבלותיו והגורמים המשפיעים על הסיכויים האישיים.",
        keywords: [
            ...getMetaKeywords("he"),
            "הקפאת ביציות גאורגיה",
            "שימור פוריות",
            "תרומת ביצית גאורגיה",
        ],
    },
    zh: {
        title: "格鲁吉亚冻卵 | 生育力保存",
        description: "冻卵是考虑未来生育治疗的人士可了解的选项。诊所可以解释流程、局限性以及影响个人机会的因素。",
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
