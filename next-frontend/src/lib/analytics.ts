export const COOKIE_CONSENT_STORAGE_KEY = "happy-family-cookie-consent";
export const COOKIE_CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

type AnalyticsEventParameters = Record<
  string,
  string | number | boolean | null | undefined
>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!stored) return false;

    const preferences = JSON.parse(stored) as {
      version?: unknown;
      analytics?: unknown;
      updatedAt?: unknown;
    };
    const updatedAt =
      typeof preferences.updatedAt === "string"
        ? Date.parse(preferences.updatedAt)
        : Number.NaN;

    return (
      preferences.version === 1 &&
      preferences.analytics === true &&
      Number.isFinite(updatedAt) &&
      Date.now() - updatedAt < COOKIE_CONSENT_MAX_AGE_MS
    );
  } catch {
    return false;
  }
}

export function trackAnalyticsEvent(
  eventName: string,
  parameters: AnalyticsEventParameters = {},
): boolean {
  if (!hasAnalyticsConsent() || typeof window.gtag !== "function") {
    return false;
  }

  window.gtag("event", eventName, parameters);
  return true;
}
