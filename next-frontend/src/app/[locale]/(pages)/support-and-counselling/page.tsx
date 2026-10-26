import type { Metadata } from "next";
import SupportAndCounselling from "@/components/Parents/SupportAndCounselling";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";
const localizedMeta = {
    en: {
        title: "Support & Counselling | Georgia Surrogacy",
        description: "A team to help you navigate your program and ask questions.",
        keywords: [
            ...getMetaKeywords("en"),
            "surrogacy counselling",
            "intended parent support",
            "international surrogacy support",
            "surrogacy case manager",
            "fertility counselling georgia",
        ],
    },
    ka: {
        title: "მხარდაჭერა და კონსულტაცია | სუროგაცია საქართველოში",
        description: "გუნდი, რომელიც გეხმარებათ პროგრამაში გარკვევასა და კითხვების დასმაში.",
        keywords: [
            ...getMetaKeywords("ka"),
            "სუროგაციის მხარდაჭერა",
            "მშობლების კონსულტაცია",
            "სუროგაციის ცენტრი",
        ],
    },
    es: {
        title: "Apoyo y Asesoramiento | Subrogación en Georgia para Padres",
        description: "Un equipo que te ayuda a orientarte durante el programa y a plantear preguntas.",
        keywords: [
            ...getMetaKeywords("es"),
            "apoyo subrogación georgia",
            "asesoramiento padres intencionales",
            "gestión caso subrogación",
        ],
    },
    ru: {
        title: "Поддержка и консультирование | Суррогатное материнство в Грузии",
        description: "Команда, которая помогает ориентироваться в программе и задавать вопросы.",
        keywords: [
            ...getMetaKeywords("ru"),
            "поддержка суррогатное материнство",
            "консультирование предполагаемых родителей",
            "сопровождение суррогатной программы",
        ],
    },
    he: {
        title: "תמיכה וייעוץ | פונדקאות בגאורגיה להורים מיועדים",
        description: "צוות שעוזר לכם להתמצא בתוכנית ולשאול שאלות.",
        keywords: [
            ...getMetaKeywords("he"),
            "תמיכה בפונדקאות",
            "ייעוץ להורים מיועדים",
            "ליווי פונדקאות בגאורגיה",
        ],
    },
    zh: {
        title: "支持与咨询 | 格鲁吉亚代孕意向父母全程服务",
        description: "团队帮助您了解项目，并在各阶段提出问题。",
        keywords: [
            ...getMetaKeywords("zh"),
            "格鲁吉亚代孕支持",
            "意向父母咨询",
            "代孕全程服务",
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
        path: "/support-and-counselling",
        locale: locale || "en",
    });
}
export default function SupportAndCounsellingPage() {
    return <SupportAndCounselling />;
}
