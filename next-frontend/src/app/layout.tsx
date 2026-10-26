import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import StructuredData from "@/components/StructuredData";
import "./[locale]/globals.css";
const nunitoSans = Nunito_Sans({
    variable: "--font-nunito-sans",
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
    display: "swap",
});
export const metadata: Metadata = {
    metadataBase: new URL("https://www.ivftourgeorgia.com"),
    title: {
        default: "Happy Family - Surrogacy & Egg Donation Services",
        template: "%s | Happy Family",
    },
    description: "Compassionate surrogacy and egg donation services tailored to your journey. Expert guidance for intended parents, surrogates, and egg donors worldwide.",
    icons: {
        icon: [{ url: "/img/logo.webp", type: "image/webp" }],
        shortcut: "/img/logo.webp",
        apple: "/img/logo.webp",
    },
    openGraph: {
        siteName: "Happy Family",
        type: "website",
        images: [{
            url: "/img/logo.webp",
            width: 1024,
            height: 1024,
            alt: "Happy Family logo",
        }],
    },
    twitter: {
        card: "summary",
        images: ["/img/logo.webp"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "TowaFgD30cj57_17EGxFj4spSTkz6MFK93fAxuZ_xAQ",
    },
};
export default function RootLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<html data-scroll-behavior="smooth" className={`${nunitoSans.variable}`} lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script
          id="consent-defaults"
          dangerouslySetInnerHTML={{
            __html: "window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',security_storage:'granted'});window.gtag('set','ads_data_redaction',true);",
          }}
        />
        <script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N5PRJFX4');`,
          }}
        />
        <StructuredData />
      </head>
      <body className={nunitoSans.variable}>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-N5PRJFX4"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          {children}
          <CookieConsent
            analyticsId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""}
            tidioCode={(process.env.TIDIO_CODE || "").replace(/[^a-zA-Z0-9_-]/g, "")}
          />
      </body>
    </html>);
}
