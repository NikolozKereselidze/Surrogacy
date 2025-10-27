"use client";

import { I18nextProvider } from "react-i18next";
import { useEffect, useState } from "react";
import i18n from "../i18n";
import LoadingSpinner from "./LoadingSpinner";
import styles from "@/styles/LoadingSpinner/LoadingSpinner.module.css";

export default function I18nProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set the language immediately when locale changes
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale).then(() => {
        setIsReady(true);
      });
    } else {
      setIsReady(true);
    }
  }, [locale]);

  // Don't render children until language is set
  if (!isReady) {
    return (
      <I18nextProvider i18n={i18n}>
        <div className={styles.loadingContainer}>
          <LoadingSpinner size="large" message="Loading..." />
        </div>
      </I18nextProvider>
    );
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
