import type { Metadata } from "next";
import LegalDocument, { type LegalSection } from "@/components/LegalDocument";
import { buildPageMetadata } from "@/lib/seo";

const sections: LegalSection[] = [
  {
    title: "General information only",
    paragraphs: [
      "Website content is provided for general informational purposes. It is not medical, legal, immigration, consular, or financial advice. Laws, eligibility rules, clinical recommendations, costs, and timelines may change and may differ according to individual circumstances and nationality.",
    ],
  },
  {
    title: "Private-company status",
    paragraphs: [
      "Happy Family is a private surrogacy coordination company and is not a government agency, embassy, civil registry, or passport authority. We do not issue or guarantee birth certificates, passports, visas, permits, or other government documents. Official documents are issued solely by the relevant government authorities and embassies.",
    ],
  },
  {
    title: "Professional advice and eligibility",
    paragraphs: [
      "You should obtain advice from appropriately licensed and independent medical and legal professionals before making decisions or beginning treatment. Only relevant professionals and authorities can determine medical suitability, legal eligibility, parentage, immigration requirements, or entitlement to official documents.",
    ],
  },
  {
    title: "No outcome guarantee",
    paragraphs: [
      "Assisted reproduction and surrogacy involve medical, legal, logistical, and personal uncertainty. Website descriptions, estimated prices, statistics, testimonials, and timelines are not promises or guarantees of pregnancy, birth, legal status, document issuance, travel approval, or any other outcome.",
    ],
  },
  {
    title: "Program agreements",
    paragraphs: [
      "Submitting a website form or attending an initial consultation does not create a professional, medical, legal, or surrogacy-services relationship. Any paid service must be described in a separate written agreement identifying the responsible parties, scope, fees, exclusions, and applicable terms.",
    ],
  },
  {
    title: "Acceptable website use",
    items: [
      "Do not misuse the website, attempt unauthorized access, interfere with its operation, or submit unlawful or misleading information.",
      "Do not copy or commercially reuse website content, branding, photographs, or databases without permission.",
      "Restricted donor and profile information must be treated as confidential and used only for its intended purpose.",
    ],
  },
  {
    title: "Third-party services and links",
    paragraphs: [
      "The website may reference independent clinics, professionals, social networks, maps, communication tools, and other third-party services. Those services are governed by their own terms and privacy practices. A reference does not make Happy Family responsible for a third party's actions or decisions.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "Questions about these terms may be sent to info@surrogationcenter.com or directed to Happy Family at 6 Marijani Street, Tbilisi 0186, Georgia, telephone +995 596 235 050.",
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title: "Terms of Service",
    description: "Terms governing the use of the Happy Family website and its general informational content.",
    path: "/terms-of-service",
    locale: locale || "en",
  });
}

export default function TermsOfServicePage() {
  return (
    <LegalDocument
      eyebrow="Website information"
      title="Terms of Service"
      introduction="These terms govern use of ivftourgeorgia.com. By using the website, you agree to use it lawfully and understand the limits of its informational content."
      sections={sections}
    />
  );
}
