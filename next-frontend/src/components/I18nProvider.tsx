"use client";

import { useEffect } from "react";
import "../i18n";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Ensure i18n is initialized on the client side
  }, []);

  return <>{children}</>;
}
