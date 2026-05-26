import type { Metadata } from "next";
import FAQ from "@/components/FAQ/FAQ";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  return generatePageMetadata(params, {
    title: "Frequently Asked Questions",
    description:
      "Find answers about surrogacy, egg donation, legal steps, timelines, costs, and support from our expert team.",
    keywords: [
      "surrogacy FAQ",
      "egg donation FAQ",
      "fertility questions",
      "intended parents FAQ",
      "surrogacy costs",
      "surrogacy timeline",
      "legal surrogacy process",
    ],
    path: "/faq",
  });
}

const FAQPage = () => {
  return <FAQ />;
};

export default FAQPage;
