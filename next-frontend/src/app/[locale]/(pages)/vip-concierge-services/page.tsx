import type { Metadata } from "next";
import Programs from "@/components/Programs/Programs";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";
const localizedMeta = {
    en: {
        title: "VIP Concierge Services | International Surrogacy in Georgia",
        description: "VIP concierge for international intended parents in Georgia country: premium housing, translation, transportation, and 24/7 white-glove support throughout your surrogacy journey in Tbilisi.",
        keywords: [
            ...getMetaKeywords("en"),
            "VIP concierge surrogacy georgia",
            "international surrogacy georgia",
            "surrogacy travel support tbilisi",
            "fertility concierge georgia",
        ],
    },
    ka: {
        title: "VIP კონსიერჟის სერვისები | საერთაშორისო სუროგაცია საქართველოში",
        description: "VIP კონსიერჟი საერთაშორისო მშობლებისთვის საქართველოში: პრემიუმ საცხოვრებელი, თარგმანი, ტრანსპორტირება და 24/7 მხარდაჭერა თბილისში.",
        keywords: [
            ...getMetaKeywords("ka"),
            "VIP კონსიერჟი",
            "სუროგაცია საქართველოში",
            "სუროგაცია თბილისში",
        ],
    },
    es: {
        title: "Servicios VIP de Conserjería | Subrogación Internacional en Georgia",
        description: "Conserjería VIP para padres internacionales en Georgia país: alojamiento premium, traducción, transporte y apoyo 24/7 durante su viaje de subrogación en Tiflis.",
        keywords: [
            ...getMetaKeywords("es"),
            "conserjería VIP subrogación",
            "subrogación internacional georgia",
            "subrogación tbilisi",
        ],
    },
    ru: {
        title: "VIP Консьерж-Сервис | Международное Суррогатное Материнство",
        description: "VIP-консьерж для иностранных родителей в Грузии: премиальное жильё, перевод, транспорт и круглосуточная поддержка на протяжении суррогатной программы в Тбилиси.",
        keywords: [
            ...getMetaKeywords("ru"),
            "VIP консьерж суррогатность",
            "суррогатное материнство в грузии",
            "суррогатная программа тбилиси",
        ],
    },
    he: {
        title: "שירותי קונסיירז' VIP | פונדקאות בינלאומית בגאורגיה",
        description: "קונסיירז' VIP להורים בינלאומיים בגאורגיה: לינה פרימיום, תרגום, הסעות ותמיכה 24/7 לאורך מסע הפונדקאות בטביליסי.",
        keywords: [
            ...getMetaKeywords("he"),
            "קונסיירז' VIP פונדקאות",
            "פונדקאות בגאורגיה",
            "פונדקאות טביליסי",
        ],
    },
    zh: {
        title: "VIP礼宾服务 | 格鲁吉亚国际代孕全程协助",
        description: "为格鲁吉亚国际意向父母提供VIP礼宾服务：优质住宿、翻译、交通及24/7全程协助，覆盖第比利斯代孕之旅的每个环节。",
        keywords: [
            ...getMetaKeywords("zh"),
            "格鲁吉亚代孕礼宾",
            "格鲁吉亚代孕",
            "第比利斯代孕",
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
        path: "/vip-concierge-services",
        locale: locale || "en",
    });
}
const VIPConciergeServices = () => {
    return <Programs programType="vipConciergeServices"/>;
};
export default VIPConciergeServices;
