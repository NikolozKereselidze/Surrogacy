import type { Metadata } from "next";
import OurTeam from "@/components/About/OurTeam";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
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
  path: "/our-team",
});

export default function OurTeamPage() {
  return <OurTeam />;
}
