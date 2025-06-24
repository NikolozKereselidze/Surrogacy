import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en/translation.json";
import heTranslation from "./locales/he/translation.json";
import zhTranslation from "./locales/zh/translation.json";
import ruTranslation from "./locales/ru/translation.json";
import esTranslation from "./locales/es/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      he: { translation: heTranslation },
      zh: { translation: zhTranslation },
      ru: { translation: ruTranslation },
      es: { translation: esTranslation },
    },
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
