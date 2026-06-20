"use client";
import { I18nextProvider } from "react-i18next";
import { useEffect } from "react";
import i18n from "../i18n";
export default function I18nProvider({ locale, children, }: {
    locale: string;
    children: React.ReactNode;
}) {
    if (i18n.language !== locale && i18n.isInitialized) {
        i18n.changeLanguage(locale);
    }
    useEffect(() => {
        if (i18n.language !== locale) {
            i18n.changeLanguage(locale);
        }
    }, [locale]);
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
