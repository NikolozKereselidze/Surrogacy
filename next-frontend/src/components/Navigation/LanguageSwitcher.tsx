"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "@/styles/Navigation/LanguageSwitcher.module.css";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "ge", name: "ქართული", flag: "🇬🇪", dir: "ltr" },
  { code: "ru", name: "Русский", flag: "🇷🇺", dir: "ltr" },
  { code: "zh", name: "中文", flag: "🇨🇳", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "he", name: "עברית", flag: "🇮🇱", dir: "rtl" },
];

const LanguageSwitcher = ({ isMobile }: { isMobile?: boolean }) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === i18n.language) || LANGUAGES[0];

  // Update document direction
  useEffect(() => {
    document.dir = currentLanguage.dir;
  }, [currentLanguage]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Change language and navigate to the new locale route
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);

    // Preserve query params
    const params = searchParams.toString();

    // Split pathname into segments
    const segments = pathname.split("/").filter(Boolean);

    // If first segment is a supported locale, replace it
    if (LANGUAGES.some((lang) => lang.code === segments[0])) {
      segments[0] = lng;
    } else {
      // Otherwise, add locale at the start
      segments.unshift(lng);
    }

    const newPath = "/" + segments.join("/") + (params ? `?${params}` : "");
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`${styles.currentLangButton} ${
          isMobile ? styles.mobileCurrentLangButton : ""
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select language, current: ${currentLanguage.name}`}
      >
        <span className={styles.flag}>{currentLanguage.flag}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          {LANGUAGES.filter((lang) => lang.code !== currentLanguage.code).map(
            (lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={styles.langOption}
                role="option"
                aria-selected={lang.code === currentLanguage.code}
                aria-label={lang.name}
              >
                <span className={styles.flag}>{lang.flag}</span>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
