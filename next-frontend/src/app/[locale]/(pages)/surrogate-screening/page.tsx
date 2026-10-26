import type { Metadata } from "next";
import SurrogateScreening from "@/components/Surrogates/SurrogateScreening";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";
const localizedMeta = {
    en: {
        title: "Surrogate Screening | Georgia Surrogacy",
        description: "Screening helps clinicians assess suitability and identify relevant risks. Your clinic explains the assessments appropriate to your circumstances; screening does not guarantee a successful outcome.",
        keywords: [
            ...getMetaKeywords("en"),
            "surrogate screening georgia",
            "surrogate requirements georgia",
            "gestational surrogate screening",
            "surrogate medical evaluation",
            "georgia surrogacy program screening",
        ],
    },
    ka: {
        title: "სუროგატის სკრინინგი | გესტაციური სუროგაცია საქართველოში",
        description: "სკრინინგი კლინიცისტებს ეხმარება შესაბამისობის შეფასებასა და რისკების გამოვლენაში. კლინიკა განმარტავს თქვენი გარემოებებისთვის შესაფერის შეფასებებს; სკრინინგი წარმატებულ შედეგს არ იძლევა გარანტირებულად.",
        keywords: [
            ...getMetaKeywords("ka"),
            "სუროგატის სკრინინგი",
            "სუროგატის მოთხოვნები",
            "სუროგატი დედები",
        ],
    },
    es: {
        title: "Evaluación de Subrogadas | Gestación Subrogada en Georgia",
        description: "La evaluación ayuda a los profesionales clínicos a valorar la idoneidad e identificar riesgos. Tu clínica explica las pruebas adecuadas a tu situación; la evaluación no garantiza un resultado favorable.",
        keywords: [
            ...getMetaKeywords("es"),
            "evaluación subrogada georgia",
            "requisitos subrogada georgia",
            "cribado subrogada gestacional",
        ],
    },
    ru: {
        title: "Скрининг суррогатных матерей | Суррогатное материнство в Грузии",
        description: "Обследование помогает врачам оценить возможность участия и выявить риски. Клиника объясняет, какие обследования подходят в вашей ситуации; обследование не гарантирует успешного результата.",
        keywords: [
            ...getMetaKeywords("ru"),
            "скрининг суррогатной матери",
            "требования суррогатная мать грузия",
            "суррогатная программа тбилиси",
        ],
    },
    he: {
        title: "סינון פונדקאית | פונדקאות גסטציונלית בגאורגיה",
        description: "הבדיקות מסייעות לצוות הרפואי להעריך התאמה ולזהות סיכונים. המרפאה מסבירה אילו הערכות מתאימות לנסיבות שלכם; הבדיקות אינן מבטיחות תוצאה מוצלחת.",
        keywords: [
            ...getMetaKeywords("he"),
            "סינון פונדקאית גאורגיה",
            "דרישות פונדקאית",
            "פונדקאות גסטציונלית בגאורגיה",
        ],
    },
    zh: {
        title: "代孕妈妈筛查 | 格鲁吉亚妊娠代孕评估",
        description: "筛查帮助临床医生评估适合性并识别相关风险。诊所会解释适合您情况的评估；筛查不能保证治疗成功。",
        keywords: [
            ...getMetaKeywords("zh"),
            "格鲁吉亚代孕妈妈要求",
            "代孕妈妈筛查",
            "妊娠代孕评估",
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
        path: "/surrogate-screening",
        locale: locale || "en",
    });
}
export default function SurrogateScreeningPage() {
    return <SurrogateScreening />;
}
