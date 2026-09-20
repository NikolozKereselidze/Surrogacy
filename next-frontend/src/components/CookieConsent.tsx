"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_MAX_AGE_MS,
  COOKIE_CONSENT_STORAGE_KEY,
} from "@/lib/analytics";
import styles from "@/styles/CookieConsent.module.css";

type Locale = "en" | "ka" | "es" | "ru" | "he" | "zh";
type Preferences = { version: 1; analytics: boolean; marketing: boolean; support: boolean; updatedAt: string };
type Copy = {
  title: string; description: string; accept: string; reject: string; manage: string;
  settings: string; settingsDescription: string; necessary: string; necessaryDescription: string;
  analytics: string; analyticsDescription: string; marketing: string; marketingDescription: string;
  support: string; supportDescription: string; always: string; save: string; back: string; privacy: string;
};

const CONSENT_EVENT = "happy-family:open-cookie-settings";

const copy: Record<Locale, Copy> = {
  en: {
    title: "Your privacy choices", description: "We use optional analytics and support tools only with your permission.",
    accept: "Accept all", reject: "Reject non-essential", manage: "Manage preferences", settings: "Cookie preferences",
    settingsDescription: "Optional tools stay off unless you enable them.", necessary: "Necessary",
    necessaryDescription: "Required for security, core functions, and remembering your choice.", analytics: "Analytics",
    analyticsDescription: "Allows Google Analytics to help us understand website usage.", marketing: "Advertising",
    marketingDescription: "Allows Google advertising measurement and personalization signals.", support: "Support chat",
    supportDescription: "Loads Tidio live chat and support features.", always: "Always active", save: "Save preferences",
    back: "Back", privacy: "Privacy Policy",
  },
  ka: {
    title: "თქვენი კონფიდენციალურობის არჩევანი", description: "ანალიტიკურ და მხარდაჭერის ინსტრუმენტებს მხოლოდ თქვენი თანხმობით ვიყენებთ.",
    accept: "ყველას მიღება", reject: "არასავალდებულოს უარყოფა", manage: "პარამეტრების მართვა", settings: "Cookie პარამეტრები",
    settingsDescription: "დამატებითი ინსტრუმენტები გამორთულია, სანამ არ ჩართავთ.", necessary: "აუცილებელი",
    necessaryDescription: "საჭიროა უსაფრთხოებისთვის, ძირითადი ფუნქციებისა და არჩევანის დასამახსოვრებლად.", analytics: "ანალიტიკა",
    analyticsDescription: "Google Analytics გვეხმარება საიტის გამოყენების გაგებაში.", marketing: "რეკლამა",
    marketingDescription: "რთავს Google-ის სარეკლამო გაზომვისა და პერსონალიზაციის სიგნალებს.", support: "მხარდაჭერის ჩატი",
    supportDescription: "ტვირთავს Tidio-ს ონლაინ ჩატისა და მხარდაჭერისთვის.", always: "ყოველთვის აქტიური", save: "არჩევანის შენახვა",
    back: "უკან", privacy: "კონფიდენციალურობის პოლიტიკა",
  },
  es: {
    title: "Tus opciones de privacidad", description: "Usamos herramientas opcionales de análisis y asistencia solo con tu permiso.",
    accept: "Aceptar todo", reject: "Rechazar lo opcional", manage: "Gestionar preferencias", settings: "Preferencias de cookies",
    settingsDescription: "Las herramientas opcionales permanecen desactivadas hasta que las habilites.", necessary: "Necesarias",
    necessaryDescription: "Necesarias para seguridad, funciones básicas y recordar tu elección.", analytics: "Analítica",
    analyticsDescription: "Permite que Google Analytics analice el uso del sitio.", marketing: "Publicidad",
    marketingDescription: "Permite señales de medición y personalización publicitaria de Google.", support: "Chat de asistencia",
    supportDescription: "Carga el chat en directo de Tidio.", always: "Siempre activas", save: "Guardar preferencias",
    back: "Volver", privacy: "Política de privacidad",
  },
  ru: {
    title: "Настройки конфиденциальности", description: "Необязательные инструменты аналитики и поддержки работают только с вашего разрешения.",
    accept: "Принять все", reject: "Отклонить необязательные", manage: "Настроить", settings: "Настройки cookie",
    settingsDescription: "Дополнительные инструменты отключены, пока вы их не включите.", necessary: "Необходимые",
    necessaryDescription: "Нужны для безопасности, основных функций и сохранения выбора.", analytics: "Аналитика",
    analyticsDescription: "Разрешает Google Analytics анализировать использование сайта.", marketing: "Реклама",
    marketingDescription: "Разрешает сигналы измерения и персонализации рекламы Google.", support: "Чат поддержки",
    supportDescription: "Загружает онлайн-чат Tidio.", always: "Всегда активно", save: "Сохранить настройки",
    back: "Назад", privacy: "Политика конфиденциальности",
  },
  he: {
    title: "אפשרויות הפרטיות שלך", description: "כלי ניתוח ותמיכה אופציונליים פועלים רק באישורך.",
    accept: "אישור הכול", reject: "דחיית הלא-הכרחי", manage: "ניהול העדפות", settings: "העדפות Cookie",
    settingsDescription: "כלים אופציונליים נשארים כבויים עד שתפעילו אותם.", necessary: "הכרחי",
    necessaryDescription: "נדרש לאבטחה, לתפקודים בסיסיים ולשמירת הבחירה.", analytics: "ניתוח נתונים",
    analyticsDescription: "מאפשר ל-Google Analytics לנתח את השימוש באתר.", marketing: "פרסום",
    marketingDescription: "מאפשר אותות מדידה והתאמה אישית של פרסום ב-Google.", support: "צ'אט תמיכה",
    supportDescription: "טוען את הצ'אט החי של Tidio.", always: "פעיל תמיד", save: "שמירת העדפות",
    back: "חזרה", privacy: "מדיניות פרטיות",
  },
  zh: {
    title: "您的隐私选择", description: "我们仅在获得您的许可后使用可选的分析和支持工具。",
    accept: "全部接受", reject: "拒绝非必要项", manage: "管理偏好", settings: "Cookie 偏好设置",
    settingsDescription: "在您启用之前，可选工具保持关闭。", necessary: "必要",
    necessaryDescription: "用于安全、核心功能以及记住您的选择。", analytics: "分析",
    analyticsDescription: "允许 Google Analytics 分析网站使用情况。", marketing: "广告",
    marketingDescription: "允许 Google 广告衡量和个性化信号。", support: "支持聊天",
    supportDescription: "加载 Tidio 在线聊天。", always: "始终启用", save: "保存偏好",
    back: "返回", privacy: "隐私政策",
  },
};

function emptyPreferences(): Preferences {
  return { version: 1, analytics: false, marketing: false, support: false, updatedAt: new Date().toISOString() };
}

function isPreferences(value: unknown): value is Preferences {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Preferences>;
  const updatedAt = typeof item.updatedAt === "string" ? Date.parse(item.updatedAt) : Number.NaN;
  return item.version === 1 && typeof item.analytics === "boolean" && typeof item.marketing === "boolean"
    && typeof item.support === "boolean" && Number.isFinite(updatedAt)
    && Date.now() - updatedAt < COOKIE_CONSENT_MAX_AGE_MS;
}

function updateGoogleConsent(preferences: Preferences) {
  window.gtag?.("consent", "update", {
    analytics_storage: preferences.analytics ? "granted" : "denied",
    ad_storage: preferences.marketing ? "granted" : "denied",
    ad_user_data: preferences.marketing ? "granted" : "denied",
    ad_personalization: preferences.marketing ? "granted" : "denied",
  });
  window.gtag?.("set", "ads_data_redaction", !preferences.marketing);
}

export default function CookieConsent({ analyticsId, tidioCode }: { analyticsId: string; tidioCode: string }) {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] as Locale;
  const locale: Locale = segment in copy ? segment : "en";
  const text = copy[locale];
  const [ready, setReady] = useState(false);
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [draft, setDraft] = useState<Preferences>(emptyPreferences);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
      const parsed: unknown = stored ? JSON.parse(stored) : null;
      if (isPreferences(parsed)) {
        updateGoogleConsent(parsed);
        setPreferences(parsed);
        setDraft(parsed);
      } else if (stored) {
        window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
        document.cookie = "hf_cookie_consent=; Max-Age=0; Path=/; SameSite=Lax; Secure";
      }
    } catch {
      window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
      document.cookie = "hf_cookie_consent=; Max-Age=0; Path=/; SameSite=Lax; Secure";
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const open = () => {
      setDraft(preferences ?? emptyPreferences());
      setShowSettings(true);
    };
    window.addEventListener(CONSENT_EVENT, open);
    return () => window.removeEventListener(CONSENT_EVENT, open);
  }, [preferences]);

  const save = (next: Preferences) => {
    const saved: Preferences = { ...next, version: 1, updatedAt: new Date().toISOString() };
    const mustReload = Boolean(preferences && ((preferences.analytics && !saved.analytics) || (preferences.support && !saved.support)));
    updateGoogleConsent(saved);
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(saved));
    document.cookie = `hf_cookie_consent=${encodeURIComponent(JSON.stringify(saved))}; Max-Age=31536000; Path=/; SameSite=Lax; Secure`;
    setPreferences(saved);
    setDraft(saved);
    setShowSettings(false);
    if (mustReload) window.location.reload();
  };

  if (!ready) return null;

  return <>
    {preferences?.analytics && analyticsId && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`} strategy="afterInteractive" />
      <Script id="google-analytics-consented" strategy="afterInteractive">{`window.gtag('js',new Date());window.gtag('config',${JSON.stringify(analyticsId)});`}</Script>
    </>}
    {preferences?.support && tidioCode && <Script src={`https://code.tidio.co/${encodeURIComponent(tidioCode)}.js`} strategy="afterInteractive" />}

    {!preferences && !showSettings && <section className={styles.banner} dir={locale === "he" ? "rtl" : "ltr"} aria-label={text.title}>
      <div className={styles.copy}><h2>{text.title}</h2><p>{text.description} <Link href={`/${locale}/privacy-policy`}>{text.privacy}</Link></p></div>
      <div className={styles.actions}>
        <button type="button" className={styles.primary} onClick={() => save({ ...emptyPreferences(), analytics: true, marketing: true, support: true })}>{text.accept}</button>
        <button type="button" className={styles.secondary} onClick={() => save(emptyPreferences())}>{text.reject}</button>
        <button type="button" className={styles.textButton} onClick={() => setShowSettings(true)}>{text.manage}</button>
      </div>
    </section>}

    {showSettings && <div className={styles.backdrop} role="presentation">
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title" dir={locale === "he" ? "rtl" : "ltr"}>
        <h2 id="cookie-settings-title">{text.settings}</h2><p className={styles.description}>{text.settingsDescription}</p>
        <div className={styles.list}>
          <div className={styles.row}><div><h3>{text.necessary}</h3><p>{text.necessaryDescription}</p></div><span>{text.always}</span></div>
          <label className={styles.row}><div><h3>{text.analytics}</h3><p>{text.analyticsDescription}</p></div><input type="checkbox" checked={draft.analytics} onChange={(e) => setDraft({ ...draft, analytics: e.target.checked })} /></label>
          <label className={styles.row}><div><h3>{text.marketing}</h3><p>{text.marketingDescription}</p></div><input type="checkbox" checked={draft.marketing} onChange={(e) => setDraft({ ...draft, marketing: e.target.checked })} /></label>
          <label className={styles.row}><div><h3>{text.support}</h3><p>{text.supportDescription}</p></div><input type="checkbox" checked={draft.support} onChange={(e) => setDraft({ ...draft, support: e.target.checked })} /></label>
        </div>
        <div className={styles.dialogActions}><button type="button" className={styles.primary} onClick={() => save(draft)}>{text.save}</button><button type="button" className={styles.secondary} onClick={() => setShowSettings(false)}>{text.back}</button></div>
      </section>
    </div>}
  </>;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
