const ORGANIZATION_ID = "https://www.ivftourgeorgia.com/#organization";

const organizationAddress = {
    "@type": "PostalAddress",
    streetAddress: "6 Marijani St",
    addressLocality: "Tbilisi",
    addressRegion: "Tbilisi",
    postalCode: "0186",
    addressCountry: "GE",
};

const organizationRef = { "@id": ORGANIZATION_ID };

export default function StructuredData() {
    const organization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: "Happy Family",
        alternateName: ["IVF Tour Georgia", "Surrogation Center"],
        description: "Surrogacy and egg donation coordination in Tbilisi, Georgia, with program information and practical support for international intended parents.",
        url: "https://www.ivftourgeorgia.com",
        logo: "https://www.ivftourgeorgia.com/img/logo.webp",
        image: "https://www.ivftourgeorgia.com/img/home/hero/hero-1920.webp",
        telephone: "+995-596-235-050",
        email: "info@surrogationcenter.com",
        address: organizationAddress,
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
                        description: "Program information and clinic coordination for surrogacy using intended parents' own eggs and sperm",
                        provider: organizationRef,
                    },
                    category: "Surrogacy Services",
                    availability: "InStock",
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Surrogacy with Egg Donor",
                        description: "Surrogacy program using carefully screened egg donors with detailed profiles and genetic testing",
                        provider: organizationRef,
                    },
                    category: "Surrogacy Services",
                    availability: "InStock",
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Egg Freezing & Preservation",
                        description: "Information and clinic coordination for people considering egg freezing",
                        provider: organizationRef,
                    },
                    category: "Fertility Preservation",
                    availability: "InStock",
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "VIP Concierge Services",
                        description: "Accommodation, translation, transport, and personal coordination options for international clients",
                        provider: organizationRef,
                    },
                    category: "Support Services",
                    availability: "InStock",
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Surrogate Screening & Matching",
                        description: "Comprehensive medical, psychological, and background screening with personalized matching for surrogates",
                        provider: organizationRef,
                    },
                    category: "Surrogate Services",
                    availability: "InStock",
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Egg Donor Database & Matching",
                        description: "Extensive database of qualified egg donors with detailed profiles, medical history, and genetic testing",
                        provider: organizationRef,
                    },
                    category: "Egg Donation Services",
                    availability: "InStock",
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Intended Parent Screening",
                        description: "Comprehensive screening process for intended parents including medical, psychological, and legal evaluations",
                        provider: organizationRef,
                    },
                    category: "Parent Services",
                    availability: "InStock",
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Legal & Documentation Support",
                        description: "Referrals to independent legal professionals and practical coordination for international families",
                        provider: organizationRef,
                    },
                    category: "Legal Services",
                    availability: "InStock",
                },
            ],
        },
        employee: [
            {
                "@type": "Person",
                name: "Natia Devdariani",
                jobTitle: "Founder & CEO",
                description: "Founder and CEO of Happy Family, supporting international families through program planning and coordination",
                email: "natia@surrogationcenter.com",
                worksFor: organizationRef,
            },
        ],
        sameAs: [
            "https://www.facebook.com/profile.php?id=61556348591661",
            "https://www.instagram.com/surrogacy_center_happy_family/",
            "https://www.linkedin.com/company/surrogacy/",
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
        areaServed: { "@type": "Country", name: "Georgia" },
    };
    const webSite = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Happy Family",
        alternateName: "IVF Tour Georgia",
        url: "https://www.ivftourgeorgia.com",
    };
    return (<>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}/>
    </>);
}
