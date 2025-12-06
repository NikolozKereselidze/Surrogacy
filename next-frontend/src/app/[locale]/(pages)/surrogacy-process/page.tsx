import type { Metadata } from "next";
import SurrogacyProcess from "@/components/Surrogates/SurrogacyProcess";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return generatePageMetadata(params, {
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
    path: "/surrogacy-process",
  });
}

export default function SurrogacyProcessPage() {
  return <SurrogacyProcess />;
}
