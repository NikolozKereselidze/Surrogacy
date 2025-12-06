import type { Metadata } from "next";
import WhoCanBecomeParent from "@/components/Parents/WhoCanBecomeParent";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return generatePageMetadata(params, {
    title: "Who Can Become a Parent - Miracle Makers",
    description:
      "Learn who can become an intended parent: eligibility, documentation, screening, and the steps to begin your surrogacy or egg donation journey.",
    keywords: [
      "who can become a parent",
      "intended parent eligibility",
      "parent requirements",
      "surrogacy eligibility",
      "documentation",
      "screening",
      "fertility journey",
    ],
    path: "/who-can-become-a-parent",
  });
}

function WhoCanBecomeAParentPage() {
  return <WhoCanBecomeParent />;
}

export default WhoCanBecomeAParentPage;
