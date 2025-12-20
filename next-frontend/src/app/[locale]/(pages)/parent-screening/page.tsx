import type { Metadata } from "next";
import ParentScreening from "@/components/Parents/ParentScreening";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Parent Screening",
  description:
    "Understand our thorough parent screening process: eligibility, documentation, medical and legal steps - ensuring safety, ethics, and the best outcomes for all.",
  keywords: [
    "parent screening",
    "intended parent requirements",
    "surrogacy screening",
    "fertility evaluation",
    "medical screening",
    "legal screening",
    "background checks",
    "surrogacy eligibility",
  ],
  path: "/parent-screening",
});

function ParentScreeningPage() {
  return <ParentScreening />;
}

export default ParentScreeningPage;
