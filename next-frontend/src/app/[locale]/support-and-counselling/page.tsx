import type { Metadata } from "next";
import SupportAndCounselling from "@/components/Parents/SupportAndCounselling";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Support & Counselling - Miracle Makers",
  description:
    "Comprehensive emotional support, counselling, and guidance for intended parents, surrogates, and donors—before, during, and after the journey.",
  keywords: [
    "surrogacy counselling",
    "emotional support",
    "intended parent support",
    "surrogate support",
    "donor support",
    "fertility counselling",
    "mental health",
    "guidance",
  ],
  path: "/support-and-counselling",
  ogImage: {
    url: "/img/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Miracle Makers - Support & Counselling",
  },
});

function SupportAndCounsellingPage() {
  return <SupportAndCounselling />;
}

export default SupportAndCounsellingPage;
