import Script from "next/script";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Miracle Makers",
    alternateName: "Surrogation Center",
    description:
      "Leading surrogacy and egg donation agency providing compassionate, personalized fertility services to help families worldwide achieve their dreams of parenthood. Over 15 years of experience with 3,200+ successful births.",
    url: "https://www.surrogationcenter.com",
    logo: "https://www.surrogationcenter.com/img/logo.png",
    image: "https://www.surrogationcenter.com/img/og-image.jpg",
    telephone: "+995-596-235-050",
    email: "natia@surrogationcenter.com",
    foundingDate: "2009",
    numberOfEmployees: "50-100",
    address: {
      "@type": "PostalAddress",
      streetAddress: "6 Marijani St",
      addressLocality: "Tbilisi",
      addressRegion: "Tbilisi",
      postalCode: "0186",
      addressCountry: "Georgia",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "41.7151",
      longitude: "44.8271",
    },
    serviceArea: [
      {
        "@type": "Country",
        name: "United States",
      },
      {
        "@type": "Country",
        name: "United Kingdom",
      },
      {
        "@type": "Country",
        name: "Canada",
      },
      {
        "@type": "Country",
        name: "Australia",
      },
      {
        "@type": "Country",
        name: "European Union",
      },
    ],
    medicalSpecialty: [
      "Reproductive Medicine",
      "Fertility Services",
      "Surrogacy",
      "Egg Donation",
      "IVF Coordination",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Comprehensive Fertility Services",
      description: "Full-service surrogacy and egg donation programs",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Surrogacy with Own Gametes",
            description:
              "Complete surrogacy program using intended parents' own eggs and sperm with comprehensive medical and legal support",
            provider: {
              "@type": "MedicalBusiness",
              name: "Miracle Makers",
            },
          },
          category: "Surrogacy Services",
          availability: "InStock",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Surrogacy with Egg Donor",
            description:
              "Surrogacy program using carefully screened egg donors with detailed profiles and genetic testing",
            provider: {
              "@type": "MedicalBusiness",
              name: "Miracle Makers",
            },
          },
          category: "Surrogacy Services",
          availability: "InStock",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Egg Freezing & Preservation",
            description:
              "Advanced egg freezing services for future fertility preservation using latest vitrification technology",
            provider: {
              "@type": "MedicalBusiness",
              name: "Miracle Makers",
            },
          },
          category: "Fertility Preservation",
          availability: "InStock",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "VIP Concierge Services",
            description:
              "Premium housing, translation, and transportation services for international clients with 24/7 support",
            provider: {
              "@type": "MedicalBusiness",
              name: "Miracle Makers",
            },
          },
          category: "Support Services",
          availability: "InStock",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Surrogate Screening & Matching",
            description:
              "Comprehensive medical, psychological, and background screening with personalized matching for surrogates",
            provider: {
              "@type": "MedicalBusiness",
              name: "Miracle Makers",
            },
          },
          category: "Surrogate Services",
          availability: "InStock",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Egg Donor Database & Matching",
            description:
              "Extensive database of qualified egg donors with detailed profiles, medical history, and genetic testing",
            provider: {
              "@type": "MedicalBusiness",
              name: "Miracle Makers",
            },
          },
          category: "Egg Donation Services",
          availability: "InStock",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Intended Parent Screening",
            description:
              "Comprehensive screening process for intended parents including medical, psychological, and legal evaluations",
            provider: {
              "@type": "MedicalBusiness",
              name: "Miracle Makers",
            },
          },
          category: "Parent Services",
          availability: "InStock",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Legal & Documentation Support",
            description:
              "Complete legal support for surrogacy agreements, parental rights, and international documentation",
            provider: {
              "@type": "MedicalBusiness",
              name: "Miracle Makers",
            },
          },
          category: "Legal Services",
          availability: "InStock",
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Licensed Medical Practice",
        recognizedBy: {
          "@type": "Organization",
          name: "Ministry of Health, Georgia",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "International Surrogacy Certification",
        recognizedBy: {
          "@type": "Organization",
          name: "American Society for Reproductive Medicine",
        },
      },
    ],
    employee: [
      {
        "@type": "Person",
        name: "Natia Devdariani",
        jobTitle: "Founder & CEO",
        description:
          "Over 15 years of experience in healthcare and professional service consulting, helped facilitate 3,200+ successful births",
        email: "natia@surrogationcenter.com",
        worksFor: {
          "@type": "MedicalBusiness",
          name: "Miracle Makers",
        },
      },
      {
        "@type": "Person",
        name: "Kelvin Smith",
        jobTitle: "Fertility Specialist",
        description:
          "Board-certified fertility specialist with expertise in advanced reproductive technologies and personalized treatment plans",
        worksFor: {
          "@type": "MedicalBusiness",
          name: "Miracle Makers",
        },
      },
      {
        "@type": "Person",
        name: "Anna Smith",
        jobTitle: "Coordinator & IVF Specialist",
        description:
          "Over 15 years of experience helping families grow through IVF coordination and patient care management",
        worksFor: {
          "@type": "MedicalBusiness",
          name: "Miracle Makers",
        },
      },
      {
        "@type": "Person",
        name: "Michael Johnson",
        jobTitle: "Medical Director",
        description:
          "Leading medical director with extensive experience in reproductive medicine and clinical oversight",
        worksFor: {
          "@type": "MedicalBusiness",
          name: "Miracle Makers",
        },
      },
    ],
    sameAs: [
      "https://www.facebook.com/miraclemakers",
      "https://www.instagram.com/miraclemakers",
      "https://www.linkedin.com/company/miraclemakers",
      "https://twitter.com/miraclemakers",
    ],
    knowsAbout: [
      "Surrogacy",
      "Egg Donation",
      "IVF",
      "Fertility Preservation",
      "Reproductive Medicine",
      "Family Building",
      "International Surrogacy",
      "Fertility Counseling",
      "Genetic Testing",
      "Legal Surrogacy",
      "Medical Coordination",
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "United States",
      },
      {
        "@type": "Country",
        name: "United Kingdom",
      },
      {
        "@type": "Country",
        name: "Canada",
      },
      {
        "@type": "Country",
        name: "Australia",
      },
      {
        "@type": "Country",
        name: "Germany",
      },
      {
        "@type": "Country",
        name: "France",
      },
      {
        "@type": "Country",
        name: "Israel",
      },
    ],
    priceRange: "$$$",
    currenciesAccepted: ["USD", "EUR", "GBP", "CAD", "AUD"],
    paymentAccepted: ["Cash", "Credit Card", "Bank Transfer", "Insurance"],
    openingHours: "Mo-Fr 09:00-18:00, Sa 09:00-15:00",
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
