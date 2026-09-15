import type { Metadata } from "next";
import SurrogacyProcess from "@/components/Surrogates/SurrogacyProcess";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";
const localizedMeta = {
    en: {
        title: "Surrogacy Process in Georgia | Gestational Surrogacy Steps",
        description: "Step-by-step gestational surrogacy process in Georgia for international intended parents, from Tbilisi consultation and IVF to surrogate matching, pregnancy coordination, birth, and post-birth family support.",
        keywords: [
            ...getMetaKeywords("en"),
            "surrogacy process in georgia",
            "what is the surrogacy process in georgia",
            "gestational surrogacy process georgia",
            "georgia surrogacy timeline",
            "surrogacy steps tbilisi",
        ],
    },
    ka: {
        title: "სუროგაციის პროცესი საქართველოში | გესტაციური სუროგაცია",
        description: "გესტაციური სუროგაციის ეტაპები საქართველოში: კონსულტაცია, IVF, სუროგატის შერჩევა, ორსულობის კოორდინაცია, მშობიარობა და ოჯახური მხარდაჭერა.",
        keywords: [
            ...getMetaKeywords("ka"),
            "როგორ ხდება სუროგაცია",
            "სუროგაციის პროცესი",
            "გესტაციური სუროგაცია",
            "სუროგაცია თბილისში",
        ],
    },
    es: {
        title: "Proceso de Subrogación en Georgia | Gestación Subrogada",
        description: "Proceso de gestación subrogada en Georgia: consulta, FIV, selección de subrogada, coordinación del embarazo, nacimiento y apoyo familiar postnatal.",
        keywords: [
            ...getMetaKeywords("es"),
            "proceso subrogación georgia",
            "gestación subrogada pasos",
            "subrogación tbilisi proceso",
        ],
    },
    ru: {
        title: "Процесс Суррогатного Материнства в Грузии | Этапы Программы",
        description: "Этапы суррогатного материнства в Грузии: консультация, ЭКО, подбор суррогатной матери, сопровождение беременности, роды и поддержка семьи.",
        keywords: [
            ...getMetaKeywords("ru"),
            "процесс суррогатного материнства в грузии",
            "этапы суррогатного материнства",
            "суррогатная программа тбилиси",
        ],
    },
    he: {
        title: "תהליך פונדקאות בגאורגיה | פונדקאות גסטציונלית",
        description: "שלבי פונדקאות בגאורגיה: ייעוץ, IVF, התאמת פונדקאית, תיאום הריון, לידה ותמיכה משפחתית לאחר הלידה.",
        keywords: [
            ...getMetaKeywords("he"),
            "תהליך פונדקאות בגאורגיה",
            "פונדקאות גסטציונלית שלבים",
            "פונדקאות טביליסי",
        ],
    },
    zh: {
        title: "格鲁吉亚代孕流程 | 妊娠代孕步骤指南",
        description: "格鲁吉亚妊娠代孕流程：咨询、试管婴儿、代孕妈妈匹配、孕期协调、分娩及产后家庭支持。",
        keywords: [
            ...getMetaKeywords("zh"),
            "格鲁吉亚代孕流程",
            "格鲁吉亚代孕步骤",
            "第比利斯代孕过程",
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
        path: "/surrogacy-process",
        locale: locale || "en",
    });
}
export default function SurrogacyProcessPage() {
    return <SurrogacyProcess />;
}
