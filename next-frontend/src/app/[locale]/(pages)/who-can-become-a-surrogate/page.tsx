import type { Metadata } from "next";
import WhoCanBecomeASurrogate from "@/components/Surrogates/WhoCanBecomeSurrogate";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return generatePageMetadata(params, {
    title: "Who Can Become a Surrogate - Miracle Makers",
    description:
      "Eligibility and requirements to become a surrogate: health criteria, screening, legal considerations, and the support we provide throughout the journey.",
    keywords: [
      "who can become a surrogate",
      "surrogate requirements",
      "surrogacy eligibility",
      "health criteria",
      "surrogate screening",
      "legal considerations",
      "surrogacy process",
    ],
    path: "/who-can-become-a-surrogate",
  });
}

function WhoCanBecomeASurrogatePage() {
  return <WhoCanBecomeASurrogate />;
}

export default WhoCanBecomeASurrogatePage;
