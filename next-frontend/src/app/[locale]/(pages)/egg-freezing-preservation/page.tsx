import type { Metadata } from "next";
import Programs from "@/components/Programs/Programs";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return generatePageMetadata(params, {
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
  });
}

const EggFreezingPreservation = () => {
  return <Programs programType="eggFreezing" />;
};

export default EggFreezingPreservation;
