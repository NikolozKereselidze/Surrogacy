import type { Metadata } from "next";
const BASE_URL = "https://www.ivftourgeorgia.com";
export interface PageSeoInput {
    title: string;
    description: string;
    keywords?: string[];
    path: string;
    locale?: string;
    image?: string;
}
export function buildPageMetadata({ title, description, keywords = [], path, locale = "en", image = `${BASE_URL}/img/og-image.jpg`, }: PageSeoInput): Metadata {
    const normalizedPath = path === "/" ? "" : path;
    const fullCanonicalUrl = `${BASE_URL}/${locale}${normalizedPath}`;
    return {
        title,
        description,
        keywords,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        alternates: {
            canonical: fullCanonicalUrl,
            languages: {
                en: `${BASE_URL}/en${normalizedPath}`,
                he: `${BASE_URL}/he${normalizedPath}`,
                es: `${BASE_URL}/es${normalizedPath}`,
                ru: `${BASE_URL}/ru${normalizedPath}`,
                zh: `${BASE_URL}/zh${normalizedPath}`,
                ka: `${BASE_URL}/ka${normalizedPath}`,
                "x-default": `${BASE_URL}/en${normalizedPath}`,
            },
        },
        openGraph: {
            title,
            description,
            url: fullCanonicalUrl,
            siteName: "Happy Family - Surrogacy & Egg Donation Services",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: locale === "en"
                ? "en_US"
                : locale === "he"
                    ? "he_IL"
                    : locale === "zh"
                        ? "zh_CN"
                        : locale === "ru"
                            ? "ru_RU"
                            : locale === "es"
                                ? "es_ES"
                                : locale === "ka"
                                    ? "ka_GE"
                                    : "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@happyfamily",
            site: "@happyfamily",
        },
    };
}
export async function generatePageMetadata(params: Promise<{
    locale?: string;
}>, seoInput: Omit<PageSeoInput, "locale">): Promise<Metadata> {
    const { locale } = await params;
    return buildPageMetadata({
        ...seoInput,
        locale: locale || "en",
    });
}
export { BASE_URL };
