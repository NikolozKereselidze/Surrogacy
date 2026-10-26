import Home from "@/components/Home/Home";
import HomeHero from "@/components/Home/HomeHero";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";
import { fetchTeamMembers } from "@/lib/teamMembers";
import TeamCard from "@/components/TeamCard";
const localizedMeta = {
    en: {
        title: "Surrogacy in Georgia | IVF & Egg Donation",
        description: "Happy Family supports international intended parents exploring surrogacy, egg donation, and IVF in Tbilisi, Georgia, with program information and practical coordination.",
        keywords: getMetaKeywords("en"),
    },
    ka: {
        title: "სუროგაცია საქართველოში | IVF, ინ ვიტრო და კვერცხუჯრედის დონაცია",
        description: "Happy Family საერთაშორისო მომავალ მშობლებს ეხმარება თბილისში სუროგაციის, კვერცხუჯრედის დონაციისა და IVF-ის ვარიანტების გაცნობაში, ინფორმაციის მიწოდებითა და პრაქტიკული კოორდინაციით.",
        keywords: getMetaKeywords("ka"),
    },
    es: {
        title: "Subrogación en Georgia País | FIV y Donación de Óvulos en Tiflis",
        description: "Happy Family acompaña a futuros padres internacionales que exploran la gestación subrogada, la donación de óvulos y la FIV en Tiflis, Georgia, con información y coordinación práctica.",
        keywords: getMetaKeywords("es"),
    },
    ru: {
        title: "Суррогатное материнство в Грузии | ЭКО и Донорство в Тбилиси",
        description: "Happy Family помогает будущим родителям из разных стран изучить программы суррогатного материнства, донорства яйцеклеток и ЭКО в Тбилиси, предоставляя информацию и практическую координацию.",
        keywords: getMetaKeywords("ru"),
    },
    he: {
        title: "פונדקאות בגאורגיה | IVF ותרומת ביצית בטביליסי",
        description: "Happy Family מסייעת להורים מיועדים ממדינות שונות לבחון אפשרויות לפונדקאות, תרומת ביציות ו-IVF בטביליסי, גאורגיה, באמצעות מידע ותיאום מעשי.",
        keywords: getMetaKeywords("he"),
    },
    zh: {
        title: "格鲁吉亚代孕 | 第比利斯试管婴儿与供卵服务",
        description: "Happy Family 为考虑在格鲁吉亚第比利斯进行代孕、卵子捐赠及试管婴儿治疗的国际准父母提供项目信息与实际协调。",
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
const HomePage = async ({ params }: {
    params: Promise<{ locale: string }>;
}) => {
    const { locale } = await params;
    const members = await fetchTeamMembers(locale, true);
    return (<>
      <HomeHero />
      <Home teamRoster={members.map((member) => (
          <div key={member.id} style={{ flex: "1 1 23rem" }}>
              <TeamCard member={member} locale={locale} />
          </div>
      ))} />
    </>);
};
export default HomePage;
