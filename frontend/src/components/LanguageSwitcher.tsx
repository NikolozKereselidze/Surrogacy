import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "../styles/LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

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

    const path = location.pathname;
    const langRegex = /^\/(en|ge|ru|zh|es|he)(\/|$)/;
    let newPath = path;

    if (langRegex.test(path)) {
      newPath = path.replace(langRegex, `/${lng}$2`);
    } else {
      newPath = `/${lng}${path === "/" ? "" : path}`;
    }

    setIsOpen(false);
    navigate(newPath, { replace: true });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button onClick={toggleDropdown} className={styles.currentLangButton}>
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
