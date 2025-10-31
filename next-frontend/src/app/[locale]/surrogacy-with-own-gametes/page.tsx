import type { Metadata } from "next";
import Programs from "@/components/Programs/Programs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Surrogacy with Own Gametes - Miracle Makers",
  description:
    "Learn about surrogacy using your own eggs and sperm: eligibility, embryo creation, medical steps, timelines, and our comprehensive support.",
  keywords: [
    "surrogacy with own gametes",
    "own eggs and sperm",
    "gestational surrogacy",
    "intended parents",
    "IVF",
    "embryo creation",
    "fertility treatment",
    "family building",
  ],
  path: "/surrogacy-with-own-gametes",
});

const SurrogacyWithOwnGametes = () => {
  return <Programs programType="surrogacyWithOwnGametes" />;
};

export default SurrogacyWithOwnGametes;
