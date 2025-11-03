import type { Metadata } from "next";
import { Nunito_Sans, Lora } from "next/font/google";
import StructuredData from "@/components/StructuredData";

import "./[locale]/globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Miracle Makers - Surrogacy & Egg Donation Services",
    template: "%s | Miracle Makers",
  },
  description:
    "Compassionate surrogacy and egg donation services tailored to your journey. Expert guidance for intended parents, surrogates, and egg donors worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth">
      <head>
        <meta
          name="google-site-verification"
          content="TowaFgD30cj57_17EGxFj4spSTkz6MFK93fAxuZ_xAQ"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <StructuredData />
      </head>
      <body className={`${nunitoSans.variable} ${lora.variable}`}>
        {children}
        <script
          src={`//code.tidio.co/${process.env.TIDIO_CODE}.js`}
          async
        ></script>
      </body>
    </html>
  );
}
