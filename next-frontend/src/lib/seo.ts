import type { Metadata } from "next";

const BASE_URL = "https://www.ivftourgeorgia.com";

export interface PageSeoInput {
  title: string;
  description: string;
  keywords?: string[];
  path: string; // must start with "/"
}

export function buildPageMetadata({
  title,
  description,
  keywords = [],
  path,
}: PageSeoInput): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
      languages: {
        "en-US": `/en${path}`,
        he: `/he${path}`,
        es: `/es${path}`,
        ru: `/ru${path}`,
        zh: `/zh${path}`,
        ka: `/ka${path}`,
      },
    },
  };
}

export { BASE_URL };
