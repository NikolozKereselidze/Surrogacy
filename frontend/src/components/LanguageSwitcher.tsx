import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";

import styles from "../styles/LanguageSwitcher.module.css";

const LanguageSwitcher = ({ isMobile }: { isMobile?: boolean }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ge", name: "ქართული", flag: "🇬🇪" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "he", name: "עברית", flag: "🇮🇱" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`${styles.currentLangButton} ${
          isMobile ? styles.mobileCurrentLangButton : ""
        }`}
      >
        <span className={styles.flag}>{currentLanguage.flag}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((lang) =>
            lang.code !== currentLanguage.code ? (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`${styles.langOption} `}
              >
                <span className={styles.flag}>{lang.flag}</span>
              </button>
            ) : (
              ""
            )
          )}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
