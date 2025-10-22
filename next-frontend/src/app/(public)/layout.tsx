"use client";

import Footer from "@/components/Footer";
import I18nProvider from "@/components/I18nProvider";
import { useLocale } from "@/hooks/useLocale";

interface BlogLayoutProps {
  children: React.ReactNode;
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const locale = useLocale();
  return (
    <I18nProvider locale={locale}>
      <main>{children}</main>
      <Footer />
    </I18nProvider>
  );
};

export default BlogLayout;
