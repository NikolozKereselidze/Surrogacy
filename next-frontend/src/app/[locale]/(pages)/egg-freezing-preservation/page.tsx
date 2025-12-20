import type { Metadata } from "next";
import Programs from "@/components/Programs/Programs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Egg Freezing & Preservation",
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
});

const EggFreezingPreservation = () => {
  return <Programs programType="eggFreezing" />;
};

export default EggFreezingPreservation;
