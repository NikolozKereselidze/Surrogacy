import { notFound } from "next/navigation";
import I18nProvider from "@/components/I18nProvider";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    other: {
      "content-language": locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate locale - if invalid, show 404
  const supportedLocales = ["en", "he", "zh", "ru", "es", "ka"];
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  return <I18nProvider locale={locale}>{children}</I18nProvider>;
}
