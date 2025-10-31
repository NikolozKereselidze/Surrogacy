import type { Metadata } from "next";
import WhoWeAre from "@/components/About/WhoWeAre";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
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
  path: "/who-we-are",
});

export default function WhoWeArePage() {
  return <WhoWeAre />;
}
