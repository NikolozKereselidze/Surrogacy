import type { Metadata } from "next";
import OurMission from "@/components/About/OurMission";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
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
  path: "/our-mission",
});

export default function OurMissionPage() {
  return <OurMission />;
}
