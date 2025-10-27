import type { Metadata } from "next";
import ParentScreening from "@/components/Parents/ParentScreening";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Parent Screening - Miracle Makers",
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
  ogImage: {
    url: "/img/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Miracle Makers - Parent Screening",
  },
});

function ParentScreeningPage() {
  return <ParentScreening />;
}

export default ParentScreeningPage;
