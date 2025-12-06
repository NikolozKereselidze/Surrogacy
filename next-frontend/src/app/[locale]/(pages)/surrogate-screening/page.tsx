import type { Metadata } from "next";
import SurrogateScreening from "@/components/Surrogates/SurrogateScreening";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return generatePageMetadata(params, {
    title: "Surrogate Screening - Miracle Makers",
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
}

function SurrogateScreeningPage() {
  return <SurrogateScreening />;
}

export default SurrogateScreeningPage;
