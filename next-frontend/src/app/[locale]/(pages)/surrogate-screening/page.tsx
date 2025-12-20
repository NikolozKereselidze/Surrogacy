import type { Metadata } from "next";
import SurrogateScreening from "@/components/Surrogates/SurrogateScreening";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Surrogate Screening",
  description:
    "Discover our comprehensive surrogate screening process: medical, psychological, and legal evaluations to ensure safety, ethics, and positive outcomes.",
  keywords: [
    "surrogate screening",
    "surrogate requirements",
    "surrogacy evaluation",
    "medical screening",
    "psychological screening",
    "legal screening",
    "surrogacy eligibility",
  ],
  path: "/surrogate-screening",
});

function SurrogateScreeningPage() {
  return <SurrogateScreening />;
}

export default SurrogateScreeningPage;
