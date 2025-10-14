"use client";

import { useEffect } from "react";
import "../i18n";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize i18n on client side only
    if (typeof window !== "undefined") {
      // Language detection will happen automatically via i18n configuration
    }
  }, []);

  return <>{children}</>;
}
