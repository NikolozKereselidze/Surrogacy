import type { Metadata } from "next";
import WhyChooseUs from "@/components/About/WhyChooseUs";

export const metadata: Metadata = {
  title: "Why Choose Us - Miracle Makers",
  description:
    "Discover what sets Miracle Makers apart. Learn about our proven track record, expert team, comprehensive care, and personalized approach to surrogacy and egg donation services.",
  keywords: [
    "why choose us",
    "surrogacy benefits",
    "fertility clinic advantages",
    "surrogacy agency comparison",
    "egg donation benefits",
    "family building services",
    "reproductive medicine expertise",
  ],
  openGraph: {
    title: "Why Choose Us - Miracle Makers",
    description:
      "Discover what sets Miracle Makers apart. Learn about our proven track record, expert team, and comprehensive care.",
    url: "https://www.surrogationcenter.com/why-choose-us",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Miracle Makers - Why Choose Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Choose Us - Miracle Makers",
    description:
      "Discover what sets Miracle Makers apart. Learn about our proven track record, expert team, and comprehensive care.",
    images: ["/img/og-image.jpg"],
  },
  alternates: {
    canonical: "/why-choose-us",
    languages: {
      "en-US": "/en/why-choose-us",
      he: "/he/why-choose-us",
      es: "/es/why-choose-us",
      ru: "/ru/why-choose-us",
      zh: "/zh/why-choose-us",
      ka: "/ge/why-choose-us",
    },
  },
};

export default function WhyChooseUsPage() {
  return <WhyChooseUs />;
}
