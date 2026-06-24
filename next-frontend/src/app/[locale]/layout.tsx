import { notFound } from "next/navigation";
import I18nProvider from "@/components/I18nProvider";
import type { Metadata } from "next";
const supportedLocales = ["en", "he", "zh", "ru", "es", "ka"] as const;
function getDir(locale: string): "rtl" | "ltr" {
    return locale === "he" ? "rtl" : "ltr";
}
export function generateStaticParams() {
    return supportedLocales.map((locale) => ({ locale }));
}
export const dynamicParams = false;
export async function generateMetadata({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return {
        other: {
            "content-language": locale,
        },
    };
}
export default async function LocaleLayout({ children, params, }: Readonly<{
    children: React.ReactNode;
    params: Promise<{
        locale: string;
    }>;
}>) {
    const { locale } = await params;
    if (!supportedLocales.includes(locale as (typeof supportedLocales)[number])) {
        notFound();
    }
    const dir = getDir(locale);
    return (<div lang={locale} dir={dir}>
      <script
        dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang=${JSON.stringify(locale)};document.documentElement.dir=${JSON.stringify(dir)};`,
        }}
      />
      <I18nProvider locale={locale}>{children}</I18nProvider>
    </div>);
}
