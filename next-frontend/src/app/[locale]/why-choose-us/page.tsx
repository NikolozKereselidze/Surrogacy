import type { Metadata } from "next";
import WhyChooseUs from "@/components/About/WhyChooseUs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
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
  path: "/why-choose-us",
  ogImage: {
    url: "/img/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Miracle Makers - Why Choose Us",
  },
});

export default function WhyChooseUsPage() {
  return <WhyChooseUs />;
}
