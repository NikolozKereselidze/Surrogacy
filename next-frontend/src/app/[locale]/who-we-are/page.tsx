import type { Metadata } from "next";
import WhoWeAre from "@/components/About/WhoWeAre";

export const metadata: Metadata = {
  title: "Who We Are - Miracle Makers",
  description:
    "Meet the dedicated team behind Miracle Makers. Learn about our story, values, and commitment to making dreams come true through compassionate surrogacy and egg donation services.",
  keywords: [
    "who we are",
    "surrogacy team",
    "fertility specialists",
    "surrogacy agency",
    "egg donation team",
    "family building experts",
    "reproductive medicine",
  ],
  openGraph: {
    title: "Who We Are - Miracle Makers",
    description:
      "Meet the dedicated team behind Miracle Makers. Learn about our story, values, and commitment to making dreams come true.",
    url: "https://www.surrogationcenter.com/who-we-are",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Miracle Makers - Who We Are",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Who We Are - Miracle Makers",
    description:
      "Meet the dedicated team behind Miracle Makers. Learn about our story, values, and commitment to making dreams come true.",
    images: ["/img/og-image.jpg"],
  },
  alternates: {
    canonical: "/who-we-are",
    languages: {
      "en-US": "/en/who-we-are",
      he: "/he/who-we-are",
      es: "/es/who-we-are",
      ru: "/ru/who-we-are",
      zh: "/zh/who-we-are",
      ka: "/ge/who-we-are",
    },
  },
};

export default function WhoWeArePage() {
  return <WhoWeAre />;
}
