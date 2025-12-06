import type { Metadata } from "next";

const BASE_URL = "https://www.ivftourgeorgia.com";

export interface PageSeoInput {
  title: string;
  description: string;
  keywords?: string[];
  path: string; // must start with "/"
  locale?: string; // Current locale (en, he, zh, etc.)
  image?: string; // OG image URL
}

export function buildPageMetadata({
  title,
  description,
  keywords = [],
  path,
  locale = "en",
  image = `${BASE_URL}/img/og-image.jpg`,
}: PageSeoInput): Metadata {
  // Ensure path ends correctly for canonical URL
  const fullCanonicalUrl = `${BASE_URL}/${locale}${path}`;

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
        en: `${BASE_URL}/en${path}`,
        he: `${BASE_URL}/he${path}`,
        es: `${BASE_URL}/es${path}`,
        ru: `${BASE_URL}/ru${path}`,
        zh: `${BASE_URL}/zh${path}`,
        ka: `${BASE_URL}/ka${path}`,
        "x-default": `${BASE_URL}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: fullCanonicalUrl,
      siteName: "Miracle Makers - Surrogacy & Egg Donation Services",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale:
        locale === "en"
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
      creator: "@miraclemakers",
      site: "@miraclemakers",
    },
  };
}

/**
 * Helper function to generate metadata with locale support
 * Use this for pages that need dynamic metadata based on locale
 */
export async function generatePageMetadata(
  params: Promise<{ locale?: string }>,
  seoInput: Omit<PageSeoInput, "locale">
): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    ...seoInput,
    locale: locale || "en",
  });
}

export { BASE_URL };
