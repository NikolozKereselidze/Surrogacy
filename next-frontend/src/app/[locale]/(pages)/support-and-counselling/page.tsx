import type { Metadata } from "next";
import SupportAndCounselling from "@/components/Parents/SupportAndCounselling";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return generatePageMetadata(params, {
    title: "Support & Counselling - Miracle Makers",
    description:
      "Comprehensive emotional support, counselling, and guidance for intended parents, surrogates, and donors - before, during, and after the journey.",
    keywords: [
      "surrogacy counselling",
      "emotional support",
      "intended parent support",
      "surrogate support",
      "donor support",
      "fertility counselling",
      "mental health",
      "guidance",
    ],
    path: "/support-and-counselling",
  });
}

function SupportAndCounsellingPage() {
  return <SupportAndCounselling />;
}

export default SupportAndCounsellingPage;
