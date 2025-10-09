import type { Metadata } from "next";
import SurrogacyProcess from "@/components/Surrogates/SurrogacyProcess";

export const metadata: Metadata = {
  title: "Surrogacy Process - Miracle Makers",
  description:
    "Learn about our comprehensive surrogacy process. From initial consultation to birth, discover the step-by-step journey to building your family through surrogacy with expert guidance and support.",
  keywords: [
    "surrogacy process",
    "surrogacy journey",
    "surrogacy steps",
    "surrogacy timeline",
    "surrogacy consultation",
    "surrogacy matching",
    "surrogacy support",
  ],
  openGraph: {
    title: "Surrogacy Process - Miracle Makers",
    description:
      "Learn about our comprehensive surrogacy process. From initial consultation to birth, discover the step-by-step journey to building your family.",
    url: "https://www.surrogationcenter.com/surrogacy-process",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Miracle Makers - Surrogacy Process",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surrogacy Process - Miracle Makers",
    description:
      "Learn about our comprehensive surrogacy process. From initial consultation to birth, discover the step-by-step journey to building your family.",
    images: ["/img/og-image.jpg"],
  },
  alternates: {
    canonical: "/surrogacy-process",
    languages: {
      "en-US": "/en/surrogacy-process",
      he: "/he/surrogacy-process",
      es: "/es/surrogacy-process",
      ru: "/ru/surrogacy-process",
      zh: "/zh/surrogacy-process",
      ka: "/ge/surrogacy-process",
    },
  },
};

export default function SurrogacyProcessPage() {
  return <SurrogacyProcess />;
}
