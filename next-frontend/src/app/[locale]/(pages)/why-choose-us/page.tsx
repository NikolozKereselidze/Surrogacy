import type { Metadata } from "next";
import WhyChooseUs from "@/components/About/WhyChooseUs";
import { buildPageMetadata } from "@/lib/seo";
const localizedMeta = {
  en: {
    title: "Why Choose Us | Surrogacy Agency Georgia",
    description:
      "Choosing a surrogacy agency is a personal decision. Explore how our team can help you understand your options, plan your visits, and stay in touch with the professionals involved in your care.",
    keywords: [
      "how to choose a surrogacy agency",
      "reputable surrogacy agency",
      "best surrogacy agency",
      "surrogacy in georgia",
      "international surrogacy",
      "surrogacy agency georgia",
      "top surrogacy agencies",
    ],
  },
  ka: {
    title: "რატომ აგვირჩიოთ | სანდო სუროგაციის სააგენტო საქართველოში",
    description:
      "სააგენტოს არჩევა პირადი გადაწყვეტილებაა. გაიგეთ, როგორ შეუძლია ჩვენს გუნდს დაგეხმაროთ ვარიანტების გააზრებაში, ვიზიტების დაგეგმვასა და თქვენს მოვლაში ჩართულ პროფესიონალებთან ურთიერთობაში.",
    keywords: [
      "სუროგაციის სააგენტო",
      "სუროგაცია საქართველოში",
      "საუკეთესო სუროგაციის სააგენტო",
    ],
  },
  es: {
    title: "Por Qué Elegirnos | Agencia de Subrogación de Confianza en Georgia",
    description:
      "Elegir una agencia es una decisión personal. Conoce cómo nuestro equipo puede ayudarte a entender las opciones, planificar tus visitas y comunicarte con los profesionales que participan en tu atención.",
    keywords: [
      "cómo elegir agencia de subrogación",
      "agencia de subrogación georgia",
      "mejor agencia de subrogación",
    ],
  },
  ru: {
    title: "Почему мы | Надёжное агентство суррогатного материнства в Грузии",
    description:
      "Выбор агентства — личное решение. Узнайте, как наша команда может помочь разобраться в вариантах, спланировать поездки и поддерживать связь со специалистами, участвующими в вашей программе.",
    keywords: [
      "как выбрать агентство суррогатного материнства",
      "суррогатное материнство грузия",
      "лучшее агентство суррогатности",
    ],
  },
  he: {
    title: "למה לבחור בנו | סוכנות פונדקאות מהימנה בגאורגיה",
    description:
      "בחירת סוכנות היא החלטה אישית. גלו כיצד הצוות שלנו יכול לעזור להבין את האפשרויות, לתכנן ביקורים ולשמור על קשר עם אנשי המקצוע המעורבים בטיפול שלכם.",
    keywords: [
      "איך לבחור סוכנות פונדקאות",
      "פונדקאות בגאורגיה",
      "סוכנות פונדקאות מומלצת",
    ],
  },
  zh: {
    title: "为什么选择我们 | 格鲁吉亚值得信赖的代孕机构",
    description:
      "选择机构是个人决定。了解我们的团队如何协助您理解选项、规划行程，并与参与诊疗的专业人员保持沟通。",
    keywords: ["如何选择代孕机构", "格鲁吉亚代孕", "最佳代孕机构"],
  },
} as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale?: string;
  }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content =
    localizedMeta[locale as keyof typeof localizedMeta] || localizedMeta.en;
  return buildPageMetadata({
    title: content.title,
    description: content.description,
    keywords: [...content.keywords],
    path: "/why-choose-us",
    locale: locale || "en",
  });
}
export default function WhyChooseUsPage() {
  return <WhyChooseUs />;
}
