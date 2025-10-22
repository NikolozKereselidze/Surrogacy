import type { Metadata } from "next";
import Programs from "@/components/Programs/Programs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Egg Freezing & Preservation - Miracle Makers",
  description:
    "Preserve your fertility with egg freezing. Learn about benefits, ideal candidates, success rates, and how Miracle Makers supports you through the process.",
  keywords: [
    "egg freezing",
    "oocyte cryopreservation",
    "fertility preservation",
    "egg preservation",
    "freeze eggs",
    "AMH testing",
    "IVF",
    "fertility options",
    "family planning",
    "Miracle Makers",
  ],
  path: "/egg-freezing-preservation",
  ogImage: {
    url: "/img/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Miracle Makers - Egg Freezing & Preservation",
  },
});

const EggFreezingPreservation = () => {
  return <Programs programType="eggFreezing" />;
};

export default EggFreezingPreservation;
