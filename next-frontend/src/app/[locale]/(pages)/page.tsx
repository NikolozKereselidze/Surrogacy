import Home from "@/components/Home/Home";
import HomeHero from "@/components/Home/HomeHero";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";
const localizedMeta = {
    en: {
        title: "Surrogacy in Georgia | IVF & Egg Donation",
        description: "Gestational surrogacy and egg donation in Georgia (country) for international parents. Trusted surrogacy agency in Tbilisi with IVF, legal protection since 2011, and 24/7 support.",
        keywords: getMetaKeywords("en"),
    },
    ka: {
        title: "სუროგაცია საქართველოში | IVF, ინ ვიტრო და კვერცხუჯრედის დონაცია",
        description: "სუროგაცია, IVF და კვერცხუჯრედის დონაცია საქართველოში თბილისში. სუროგაციის ცენტრი საერთაშორისო მშობლებისთვის  იურიდული დაცვა 2011 წლიდან.",
        keywords: getMetaKeywords("ka"),
    },
    es: {
        title: "Subrogación en Georgia País | FIV y Donación de Óvulos en Tiflis",
        description: "Gestación subrogada y donación de óvulos en Georgia (país) para padres internacionales. Agencia en Tiflis con FIV, protección legal desde 2011 y apoyo 24/7.",
        keywords: getMetaKeywords("es"),
    },
    ru: {
        title: "Суррогатное материнство в Грузии | ЭКО и Донорство в Тбилиси",
        description: "Суррогатное материнство и донорство яйцеклеток в Грузии для иностранных родителей. Агентство в Тбилиси, ЭКО, правовая защита с 2011 года и поддержка 24/7.",
        keywords: getMetaKeywords("ru"),
    },
    he: {
        title: "פונדקאות בגאורגיה | IVF ותרומת ביצית בטביליסי",
        description: "פונדקאות גסטציונלית ותרומת ביצית בגאורגיה (המדינה) להורים בינלאומיים. סוכנות בטביליסי, IVF, הגנה משפטית מאז 2011 ותמיכה 24/7.",
        keywords: getMetaKeywords("he"),
    },
    zh: {
        title: "格鲁吉亚代孕 | 第比利斯试管婴儿与供卵服务",
        description: "格鲁吉亚（国家）妊娠代孕与供卵服务，面向国际准父母。第比利斯代孕机构，试管婴儿（IVF），自2011年起法律保护，全天候支持。",
        keywords: getMetaKeywords("zh"),
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
        path: "/",
        locale: locale || "en",
    });
}
const HomePage = () => {
    return (<>
      <HomeHero />
      <Home />
    </>);
};
export default HomePage;
