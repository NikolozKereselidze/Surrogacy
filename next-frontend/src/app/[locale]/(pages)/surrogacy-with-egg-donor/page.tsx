import type { Metadata } from "next";
import Programs from "@/components/Programs/Programs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Surrogacy with Egg Donor",
  description:
    "Explore surrogacy with an egg donor: who it's for, how matching works, medical steps, timelines, and our end-to-end guidance.",
  keywords: [
    "surrogacy with egg donor",
    "egg donor surrogacy",
    "donor egg IVF",
    "intended parents",
    "matching process",
    "fertility treatment",
    "embryo transfer",
    "family building",
  ],
  path: "/surrogacy-with-egg-donor",
});

const SurrogacyWithEggDonor = () => {
  return <Programs programType="surrogacyWithEggDonor" />;
};

export default SurrogacyWithEggDonor;
