import type { Metadata } from "next";
import LegalDocument, { type LegalSection } from "@/components/LegalDocument";
import { buildPageMetadata } from "@/lib/seo";

const sections: LegalSection[] = [
  {
    title: "Information we collect",
    paragraphs: [
      "We collect information that you choose to provide when you contact us, request information, submit a form, communicate with a coordinator, or use an authenticated area of the website.",
    ],
    items: [
      "Contact details, such as your name, email address, telephone number, country, and preferred language.",
      "Information included in messages or consultation requests.",
      "Account and application information submitted through restricted areas of the website.",
      "Technical information such as device type, browser, approximate location, referring page, and website interactions.",
    ],
  },
  {
    title: "How we use information",
    items: [
      "To respond to enquiries and provide requested program information.",
      "To coordinate consultations and services requested by you.",
      "To operate, secure, troubleshoot, and improve the website.",
      "To comply with applicable legal obligations and protect users and our services.",
    ],
  },
  {
    title: "Analytics, communications, and service providers",
    paragraphs: [
      "We may use hosting, analytics, customer-communication, email, file-storage, and security providers to operate the website. These providers process information on our behalf under their own contractual and privacy obligations. The website currently uses services including Vercel, Google Analytics, Tidio, and infrastructure providers supporting our application.",
    ],
  },
  {
    title: "Cookies and consent choices",
    paragraphs: [
      "Necessary storage supports security, core website functions, and remembering your consent choice. Optional tools remain off unless you enable the relevant category. You can change or withdraw your choice at any time through Cookie settings in the website footer.",
    ],
    items: [
      "Necessary: core functionality and storage of your consent choice for up to 12 months.",
      "Analytics: Google Analytics website-usage measurement, loaded only after analytics consent.",
      "Advertising: Google advertising measurement and personalization signals, enabled only after advertising consent.",
      "Support chat: Tidio chat and support features, loaded only after support consent.",
    ],
  },
  {
    title: "Sensitive information",
    paragraphs: [
      "Fertility and surrogacy enquiries may include sensitive personal or health-related information. Do not submit medical records or identity documents through a general contact form unless a coordinator has provided an appropriate secure process and explained why the information is needed.",
    ],
  },
  {
    title: "Retention and security",
    paragraphs: [
      "We retain information only as long as reasonably necessary for the purposes described above, contractual requirements, dispute resolution, and applicable law. We use reasonable administrative and technical safeguards, but no internet transmission or storage system can be guaranteed completely secure.",
    ],
  },
  {
    title: "Your choices and rights",
    paragraphs: [
      "Depending on your location, you may have rights to request access, correction, deletion, restriction, or a copy of personal information. You may also withdraw consent where processing is based on consent. Some information may need to be retained where required by law or necessary to protect legal rights.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "For privacy questions or requests, contact Happy Family at info@surrogationcenter.com, telephone +995 596 235 050, or 6 Marijani Street, Tbilisi 0186, Georgia.",
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title: "Privacy Policy",
    description: "How Happy Family collects, uses, protects, and manages information submitted through its website.",
    path: "/privacy-policy",
    locale: locale || "en",
  });
}

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Website information"
      title="Privacy Policy"
      introduction="This policy explains how Happy Family handles information collected through ivftourgeorgia.com. It applies to this website and does not replace any separate privacy notice provided for a specific medical, legal, or surrogacy service."
      sections={sections}
    />
  );
}
