import type { Metadata } from "next";
import WhoCanBecomeDonor from "@/components/Donors/WhoCanBecomeDonor";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Who Can Become a Donor - Miracle Makers",
  description:
    "Eligibility and requirements to become an egg donor: age, health criteria, screening steps, commitment, and how we support you throughout.",
  keywords: [
    "who can become a donor",
    "egg donor requirements",
    "egg donor eligibility",
    "donor screening",
    "health criteria",
    "fertility donation",
    "egg donation process",
  ],
  path: "/who-can-become-a-donor",
  ogImage: {
    url: "/img/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Miracle Makers - Who Can Become a Donor",
  },
});

function WhoCanBecomeADonorPage() {
  return <WhoCanBecomeDonor />;
}

export default WhoCanBecomeADonorPage;
