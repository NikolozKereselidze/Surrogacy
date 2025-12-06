import type { Metadata } from "next";
import OurMission from "@/components/About/OurMission";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return generatePageMetadata(params, {
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
}

export default function OurMissionPage() {
  return <OurMission />;
}
