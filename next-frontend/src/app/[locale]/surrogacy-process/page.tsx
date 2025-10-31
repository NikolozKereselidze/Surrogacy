import type { Metadata } from "next";
import SurrogacyProcess from "@/components/Surrogates/SurrogacyProcess";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
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

export default function SurrogacyProcessPage() {
  return <SurrogacyProcess />;
}
