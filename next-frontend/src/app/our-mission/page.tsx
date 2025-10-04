import type { Metadata } from "next";
import OurMission from "@/components/About/OurMission";

export const metadata: Metadata = {
  title: "Our Mission - Miracle Makers",
  description:
    "Ethical, supportive, and personalized fertility journeys for every family. Learn about our mission to empower dreams and build families through compassionate surrogacy and egg donation services.",
  keywords: [
    "surrogacy mission",
    "fertility services mission",
    "ethical surrogacy",
    "compassionate care",
    "family building",
    "surrogacy values",
    "egg donation mission",
  ],
  openGraph: {
    title: "Our Mission - Miracle Makers",
    description:
      "Ethical, supportive, and personalized fertility journeys for every family. Learn about our mission to empower dreams and build families.",
    url: "https://www.surrogationcenter.com/our-mission",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Miracle Makers - Our Mission",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Mission - Miracle Makers",
    description:
      "Ethical, supportive, and personalized fertility journeys for every family. Learn about our mission to empower dreams and build families.",
    images: ["/img/og-image.jpg"],
  },
  alternates: {
    canonical: "/our-mission",
    languages: {
      "en-US": "/en/our-mission",
      he: "/he/our-mission",
      es: "/es/our-mission",
      ru: "/ru/our-mission",
      zh: "/zh/our-mission",
      ka: "/ge/our-mission",
    },
  },
};

export default function OurMissionPage() {
  return <OurMission />;
}
