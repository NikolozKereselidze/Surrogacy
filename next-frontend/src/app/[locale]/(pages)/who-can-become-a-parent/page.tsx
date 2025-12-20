import type { Metadata } from "next";
import WhoCanBecomeParent from "@/components/Parents/WhoCanBecomeParent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Who Can Become a Parent",
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

function WhoCanBecomeAParentPage() {
  return <WhoCanBecomeParent />;
}

export default WhoCanBecomeAParentPage;
