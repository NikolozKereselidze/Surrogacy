import type { Metadata } from "next";
import WhoWeAre from "@/components/About/WhoWeAre";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";
const localizedMeta = {
    en: {
        title: "Who We Are | Happy Family Surrogacy Agency in Georgia",
        description: "Learn about Happy Family — a Tbilisi-based surrogacy and egg donation agency serving international parents in Georgia country with compassionate, ethical family-building support.",
        keywords: [
            ...getMetaKeywords("en"),
            "who we are",
            "surrogacy agency georgia",
            "happy family surrogacy",
            "international surrogacy georgia",
        ],
    },
    ka: {
        title: "ვინ ვართ ჩვენ | Happy Family სუროგაციის ცენტრი საქართველოში",
        description: "გაიგეთ Happy Family-ის შესახებ — თბილისში დაფუძნებული სუროგაციისა და კვერცხუჯრედის დონაციის ცენტრი საერთაშორისო მშობლებისთვის საქართველოში.",
        keywords: [
            ...getMetaKeywords("ka"),
            "ვინ ვართ ჩვენ",
            "სუროგაციის ცენტრი",
            "სუროგაცია საქართველოში",
        ],
    },
    es: {
        title: "Quiénes Somos | Agencia de Subrogación en Georgia",
        description: "Conozca Happy Family — agencia de subrogación y donación de óvulos en Tiflis que atiende a padres internacionales en Georgia país con apoyo ético y compasivo.",
        keywords: [
            ...getMetaKeywords("es"),
            "quiénes somos",
            "agencia subrogación georgia",
            "subrogación en georgia",
        ],
    },
    ru: {
        title: "Кто Мы | Агентство Суррогатного Материнства Happy Family",
        description: "Узнайте о Happy Family — агентстве суррогатного материнства и донорства яйцеклеток в Тбилиси, обслуживающем международных родителей в Грузии.",
        keywords: [
            ...getMetaKeywords("ru"),
            "кто мы",
            "центр суррогатного материнства в грузии",
            "суррогатное материнство в грузии",
        ],
    },
    he: {
        title: "מי אנחנו | סוכנות פונדקאות Happy Family בגאורגיה",
        description: "הכירו את Happy Family — סוכנות פונדקאות ותרומת ביציות בטביליסי המשרתת הורים בינלאומיים בגאורגיה בליווי אתי ותומך.",
        keywords: [
            ...getMetaKeywords("he"),
            "מי אנחנו",
            "פונדקאות בגאורגיה",
            "פונדקאות ישראלי בגאורגיה",
        ],
    },
    zh: {
        title: "关于我们 | Happy Family 格鲁吉亚代孕机构",
        description: "了解 Happy Family——位于第比利斯的格鲁吉亚代孕与供卵机构，以富有同情心且合乎道德的方式为国际意向父母提供家庭建设支持。",
        keywords: [
            ...getMetaKeywords("zh"),
            "关于我们",
            "格鲁吉亚代孕机构",
            "格鲁吉亚代孕",
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
        path: "/who-we-are",
        locale: locale || "en",
    });
}
export default function WhoWeArePage() {
    return <WhoWeAre />;
}
