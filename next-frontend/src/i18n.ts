import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import heTranslation from "./locales/he/translation.json";
import zhTranslation from "./locales/zh/translation.json";
import ruTranslation from "./locales/ru/translation.json";
import esTranslation from "./locales/es/translation.json";
import geTranslation from "./locales/ge/translation.json";
if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
        resources: {
            en: { translation: enTranslation },
            he: { translation: heTranslation },
            zh: { translation: zhTranslation },
            ru: { translation: ruTranslation },
            es: { translation: esTranslation },
            ka: { translation: geTranslation },
        },
        fallbackLng: "en",
        lng: "en",
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: [],
            caches: [],
        },
    });
}
export default i18n;
