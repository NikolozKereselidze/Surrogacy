"use client";
import { Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import { buildLanguageHref } from "@/lib/localizedUrls";
import styles from "@/styles/Navigation/LanguageSwitcher.module.css";

const LANGUAGES = [
  { code: "en", name: "English", countryCode: "US", dir: "ltr" },
  { code: "ka", name: "ქართული", countryCode: "GE", dir: "ltr" },
  { code: "ru", name: "Русский", countryCode: "RU", dir: "ltr" },
  { code: "zh", name: "中文", countryCode: "CN", dir: "ltr" },
  { code: "es", name: "Español", countryCode: "ES", dir: "ltr" },
  { code: "he", name: "עברית", countryCode: "IL", dir: "rtl" },
] as const;

type SwitcherProps = { pathname: string; search?: string; isMobile?: boolean };

function LanguageLinks({ pathname, search = "", isMobile }: SwitcherProps) {
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const currentLanguage = LANGUAGES.find(lang => lang.code === pathname.split("/")[1]) || LANGUAGES[0];
  const close = () => { if (dropdownRef.current) dropdownRef.current.open = false; };

  useEffect(() => {
    document.documentElement.lang = currentLanguage.code;
    document.documentElement.dir = currentLanguage.dir;
  }, [currentLanguage]);

  useEffect(() => {
    const outside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) close();
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  return <details className={styles.languageSwitcher} ref={dropdownRef}>
    <summary className={`${styles.currentLangButton} ${isMobile ? styles.mobileCurrentLangButton : ""}`} aria-label={`Select language, current: ${currentLanguage.name}`}>
      {!isMobile && <span className={styles.flag}>
        <ReactCountryFlag countryCode={currentLanguage.countryCode} svg style={{ width: "1.2em", height: "1.2em" }} title={currentLanguage.name} />
      </span>}
      <span className={styles.langCode}>{currentLanguage.code.toUpperCase()}</span>
    </summary>
    <nav className={styles.dropdown} aria-label="Languages">
      {LANGUAGES.filter(lang => lang.code !== currentLanguage.code).map(lang => (
        <Link key={lang.code} href={buildLanguageHref(pathname, lang.code, search)} hrefLang={lang.code} lang={lang.code} dir={lang.dir} className={styles.langOption} onClick={close} scroll={false} prefetch={false}>
          <span className={styles.flag}>
            <ReactCountryFlag countryCode={lang.countryCode} svg style={{ width: "1.2em", height: "1.2em" }} title={lang.name} />
          </span>
          <span className={styles.langName}>{lang.name}</span>
        </Link>
      ))}
    </nav>
  </details>;
}

function LanguageLinksWithQuery(props: SwitcherProps) {
  const search = useSearchParams().toString();
  return <LanguageLinks {...props} search={search} />;
}

export default function LanguageSwitcher({ isMobile }: { isMobile?: boolean }) {
  const pathname = usePathname();
  // The static fallback contains real links too, rather than disappearing when search params suspend.
  return <Suspense fallback={<LanguageLinks pathname={pathname} isMobile={isMobile} />}>
    <LanguageLinksWithQuery pathname={pathname} isMobile={isMobile} />
  </Suspense>;
}
