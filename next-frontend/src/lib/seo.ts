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
        en: `${BASE_URL}/en${path}`,
        he: `${BASE_URL}/he${path}`,
        es: `${BASE_URL}/es${path}`,
        ru: `${BASE_URL}/ru${path}`,
        zh: `${BASE_URL}/zh${path}`,
        ka: `${BASE_URL}/ka${path}`,
        "x-default": `${BASE_URL}/en${path}`, 
      },
    },
  };
}

export { BASE_URL };
