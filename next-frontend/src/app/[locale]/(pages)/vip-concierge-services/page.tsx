import type { Metadata } from "next";
import Programs from "@/components/Programs/Programs";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";
const localizedMeta = {
    en: {
        title: "VIP Concierge Services | International Surrogacy in Georgia",
        description: "A team to help you navigate your program and ask questions.",
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
        description: "გუნდი, რომელიც გეხმარებათ პროგრამაში გარკვევასა და კითხვების დასმაში.",
        keywords: [
            ...getMetaKeywords("ka"),
            "VIP კონსიერჟი",
            "სუროგაცია საქართველოში",
            "სუროგაცია თბილისში",
        ],
    },
    es: {
        title: "Servicios VIP de Conserjería | Subrogación Internacional en Georgia",
        description: "Un equipo que te ayuda a orientarte durante el programa y a plantear preguntas.",
        keywords: [
            ...getMetaKeywords("es"),
            "conserjería VIP subrogación",
            "subrogación internacional georgia",
            "subrogación tbilisi",
        ],
    },
    ru: {
        title: "VIP Консьерж-Сервис | Международное Суррогатное Материнство",
        description: "Команда, которая помогает ориентироваться в программе и задавать вопросы.",
        keywords: [
            ...getMetaKeywords("ru"),
            "VIP консьерж суррогатность",
            "суррогатное материнство в грузии",
            "суррогатная программа тбилиси",
        ],
    },
    he: {
        title: "שירותי קונסיירז' VIP | פונדקאות בינלאומית בגאורגיה",
        description: "צוות שעוזר לכם להתמצא בתוכנית ולשאול שאלות.",
        keywords: [
            ...getMetaKeywords("he"),
            "קונסיירז' VIP פונדקאות",
            "פונדקאות בגאורגיה",
            "פונדקאות טביליסי",
        ],
    },
    zh: {
        title: "VIP礼宾服务 | 格鲁吉亚国际代孕全程协助",
        description: "团队帮助您了解项目，并在各阶段提出问题。",
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
