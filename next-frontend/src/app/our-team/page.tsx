import type { Metadata } from "next";
import OurTeam from "@/components/About/OurTeam";

export const metadata: Metadata = {
  title: "Our Team - Miracle Makers",
  description:
    "Meet our expert team of fertility specialists, medical professionals, and support staff. Learn about the experienced professionals who make miracles happen through compassionate surrogacy and egg donation services.",
  keywords: [
    "surrogacy team",
    "fertility specialists",
    "medical team",
    "surrogacy doctors",
    "egg donation team",
    "reproductive medicine",
    "family building experts",
  ],
  openGraph: {
    title: "Our Team - Miracle Makers",
    description:
      "Meet our expert team of fertility specialists, medical professionals, and support staff. Learn about the experienced professionals who make miracles happen.",
    url: "https://www.surrogationcenter.com/our-team",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Miracle Makers - Our Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team - Miracle Makers",
    description:
      "Meet our expert team of fertility specialists, medical professionals, and support staff. Learn about the experienced professionals who make miracles happen.",
    images: ["/img/og-image.jpg"],
  },
  alternates: {
    canonical: "/our-team",
    languages: {
      "en-US": "/en/our-team",
      he: "/he/our-team",
      es: "/es/our-team",
      ru: "/ru/our-team",
      zh: "/zh/our-team",
      ka: "/ge/our-team",
    },
  },
};

export default function OurTeamPage() {
  return <OurTeam />;
}
