import type { Metadata } from "next";

const BASE_URL = "https://www.surrogationcenter.com";

export interface PageSeoInput {
  title: string;
  description: string;
  keywords?: string[];
  path: string; // must start with "/"
  ogImage?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  twitterCard?: "summary" | "summary_large_image";
  openGraphType?: "website" | "article" | "profile";
}

export function buildPageMetadata({
  title,
  description,
  keywords = [],
  path,
  ogImage,
  twitterCard = "summary_large_image",
  openGraphType = "website",
}: PageSeoInput): Metadata {
  const finalOgImage = ogImage ?? {
    url: "/img/og-image.jpg",
    width: 1200,
    height: 630,
    alt: `Miracle Makers - ${title}`,
  };

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${path}`,
      type: openGraphType,
      images: [finalOgImage],
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [finalOgImage.url],
    },
    alternates: {
      canonical: path,
      languages: {
        "en-US": `/en${path}`,
        he: `/he${path}`,
        es: `/es${path}`,
        ru: `/ru${path}`,
        zh: `/zh${path}`,
        ka: `/ge${path}`,
      },
    },
  };
}

export { BASE_URL };
