import type { Metadata } from "next";
import OurTeam from "@/components/About/OurTeam";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";
const localizedMeta = {
    en: {
        title: "Our Team | Surrogacy & IVF Experts in Tbilisi, Georgia",
        description: "Meet the Happy Family team in Tbilisi, Georgia country — fertility specialists, coordinators, and support staff guiding international parents through surrogacy and egg donation.",
        keywords: [
            ...getMetaKeywords("en"),
            "surrogacy team georgia",
            "fertility specialists tbilisi",
            "georgia surrogacy agency",
            "egg donation team",
        ],
    },
    ka: {
        title: "ჩვენი გუნდი | სუროგაციისა და ივფ ექსპერტები თბილისში",
        description: "გაიცანით Happy Family-ის გუნდი თბილისში — ფერტილობის სპეციალისტები, კოორდინატორები და მხარდაჭერის პერსონალი საერთაშორისო მშობლებისთვის.",
        keywords: [
            ...getMetaKeywords("ka"),
            "სუროგაციის ცენტრი",
            "ინ ვიტრო კლინიკა",
            "სუროგაცია თბილისში",
        ],
    },
    es: {
        title: "Nuestro Equipo | Expertos en Subrogación en Tiflis, Georgia",
        description: "Conozca al equipo de Happy Family en Tiflis, Georgia país — especialistas en fertilidad, coordinadores y personal de apoyo para padres internacionales.",
        keywords: [
            ...getMetaKeywords("es"),
            "equipo subrogación georgia",
            "agencia subrogación georgia",
            "fiv georgia",
        ],
    },
    ru: {
        title: "Наша Команда | Эксперты по Суррогатному Материнству в Тбилиси",
        description: "Познакомьтесь с командой Happy Family в Тбилиси — специалисты по фертильности, координаторы и сотрудники поддержки для международных родителей.",
        keywords: [
            ...getMetaKeywords("ru"),
            "центр суррогатного материнства в грузии",
            "суррогатная программа тбилиси",
            "эко в грузии",
        ],
    },
    he: {
        title: "הצוות שלנו | מומחי פונדקאות ו-IVF בטביליסי",
        description: "הכירו את צוות Happy Family בטביליסי, גאורגיה — מומחי פוריות, מתאמים וצוות תמיכה להורים בינלאומיים בתהליכי פונדקאות ותרומת ביציות.",
        keywords: [
            ...getMetaKeywords("he"),
            "צוות פונדקאות גאורגיה",
            "פונדקאות טביליסי",
            "פונדקאות בגאורגיה",
        ],
    },
    zh: {
        title: "我们的团队 | 第比利斯代孕与试管婴儿专家",
        description: "认识 Happy Family 位于格鲁吉亚第比利斯的团队——生育专家、协调员和支持人员，为国际意向父母提供代孕与供卵服务。",
        keywords: [
            ...getMetaKeywords("zh"),
            "格鲁吉亚代孕机构",
            "第比利斯代孕",
            "格鲁吉亚试管婴儿",
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
        path: "/our-team",
        locale: locale || "en",
    });
}
export default function OurTeamPage() {
    return <OurTeam />;
}
