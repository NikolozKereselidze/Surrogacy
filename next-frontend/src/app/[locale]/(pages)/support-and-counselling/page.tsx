import type { Metadata } from "next";
import SupportAndCounselling from "@/components/Parents/SupportAndCounselling";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";

const localizedMeta = {
  en: {
    title: "Support & Counselling | Surrogacy in Georgia for Intended Parents",
    description:
      "Comprehensive emotional support, counselling, and case management for international intended parents pursuing gestational surrogacy in Georgia country. Dedicated coordinators, legal guidance, financial planning, and 24/7 assistance in Tbilisi.",
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
    description:
      "ემოციური მხარდაჭერა, კონსულტაცია და პერსონალური კოორდინატორი საერთაშორისო მშობლებისთვის, რომლებიც სუროგაციას საქართველოში ირჩევენ. იურიდიული და ფინანსური გზამკვლევი, 24/7 დახმარება თბილისში.",
    keywords: [
      ...getMetaKeywords("ka"),
      "სუროგაციის მხარდაჭერა",
      "მშობლების კონსულტაცია",
      "სუროგაციის ცენტრი",
    ],
  },
  es: {
    title: "Apoyo y Asesoramiento | Subrogación en Georgia para Padres",
    description:
      "Apoyo emocional, asesoramiento y gestión de casos para padres internacionales que buscan gestación subrogada en Georgia país. Coordinadores dedicados, orientación legal, planificación financiera y asistencia 24/7 en Tiflis.",
    keywords: [
      ...getMetaKeywords("es"),
      "apoyo subrogación georgia",
      "asesoramiento padres intencionales",
      "gestión caso subrogación",
    ],
  },
  ru: {
    title: "Поддержка и консультирование | Суррогатное материнство в Грузии",
    description:
      "Эмоциональная поддержка, консультирование и ведение программы для международных родителей, выбирающих суррогатное материнство в Грузии. Персональный координатор, юридическая и финансовая помощь, круглосуточная поддержка в Тбилиси.",
    keywords: [
      ...getMetaKeywords("ru"),
      "поддержка суррогатное материнство",
      "консультирование предполагаемых родителей",
      "сопровождение суррогатной программы",
    ],
  },
  he: {
    title: "תמיכה וייעוץ | פונדקאות בגאורגיה להורים מיועדים",
    description:
      "תמיכה רגשית, ייעוץ וניהול תיק אישי להורים בינלאומיים המתחילים פונדקאות גסטציונלית בגאורגיה. רכז ייעודי, ליווי משפטי ופיננסי, וסיוע 24/7 בטביליסי.",
    keywords: [
      ...getMetaKeywords("he"),
      "תמיכה בפונדקאות",
      "ייעוץ להורים מיועדים",
      "ליווי פונדקאות בגאורגיה",
    ],
  },
  zh: {
    title: "支持与咨询 | 格鲁吉亚代孕意向父母全程服务",
    description:
      "为选择格鲁吉亚妊娠代孕的国际意向父母提供情感支持、咨询和专属个案管理。专属协调员、法律与财务指导，以及第比利斯全天候协助。",
    keywords: [
      ...getMetaKeywords("zh"),
      "格鲁吉亚代孕支持",
      "意向父母咨询",
      "代孕全程服务",
    ],
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content =
    localizedMeta[locale as keyof typeof localizedMeta] || localizedMeta.en;

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
