import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import I18nProvider from "../components/I18nProvider";
import MainLayout from "../components/MainLayout";
import StructuredData from "../components/StructuredData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Miracle Makers - Surrogacy & Egg Donation Services",
    template: "%s | Miracle Makers",
  },
  description:
    "Compassionate surrogacy and egg donation services tailored to your journey. Expert guidance for intended parents, surrogates, and egg donors worldwide.",
  keywords: [
    "surrogacy",
    "egg donation",
    "fertility services",
    "intended parents",
    "surrogates",
    "egg donors",
  ],
  authors: [{ name: "Miracle Makers" }],
  creator: "Miracle Makers",
  publisher: "Miracle Makers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.surrogationcenter.com/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      he: "/he",
      es: "/es",
      ru: "/ru",
      zh: "/zh",
      ka: "/ge",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.surrogationcenter.com",
    siteName: "Miracle Makers",
    title: "Miracle Makers - Surrogacy & Egg Donation Services",
    description:
      "Compassionate surrogacy and egg donation services tailored to your journey.",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Miracle Makers - Surrogacy Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miracle Makers - Surrogacy & Egg Donation Services",
    description:
      "Compassionate surrogacy and egg donation services tailored to your journey.",
    images: ["/img/og-image.jpg"],
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
    google: "your-google-verification-code",
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Compassionate surrogacy and egg donation services tailored to your journey. Expert guidance for intended parents, surrogates, and egg donors worldwide."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <StructuredData />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <I18nProvider>
          <MainLayout>{children}</MainLayout>
        </I18nProvider>
      </body>
    </html>
  );
}
