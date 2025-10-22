import type { Metadata } from "next";
import Programs from "@/components/Programs/Programs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Surrogacy with Egg Donor - Miracle Makers",
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
  ogImage: {
    url: "/img/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Miracle Makers - Surrogacy with Egg Donor",
  },
});

const SurrogacyWithEggDonor = () => {
  return <Programs programType="surrogacyWithEggDonor" />;
};

export default SurrogacyWithEggDonor;
