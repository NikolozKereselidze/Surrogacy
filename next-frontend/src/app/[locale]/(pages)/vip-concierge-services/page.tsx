import type { Metadata } from "next";
import Programs from "@/components/Programs/Programs";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return generatePageMetadata(params, {
    title: "VIP Concierge Services - Miracle Makers",
    description:
      "Personalized VIP concierge services: premium coordination, travel and accommodation, 24/7 support, and white-glove care throughout your fertility journey.",
    keywords: [
      "VIP concierge services",
      "fertility concierge",
      "travel and accommodation",
      "premium coordination",
      "white-glove service",
      "24/7 support",
      "personalized care",
    ],
    path: "/vip-concierge-services",
  });
}

const VIPConciergeServices = () => {
  return <Programs programType="vipConciergeServices" />;
};

export default VIPConciergeServices;
