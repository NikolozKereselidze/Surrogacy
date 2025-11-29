import { notFound } from "next/navigation";
import I18nProvider from "@/components/I18nProvider";
import MainLayout from "@/components/MainLayout";

export default async function RootLayout({
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

  return (
    <I18nProvider locale={locale}>
      <MainLayout>{children}</MainLayout>
    </I18nProvider>
  );
}
