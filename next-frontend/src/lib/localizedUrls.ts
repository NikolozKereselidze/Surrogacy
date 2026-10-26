export const SUPPORTED_LOCALES = ["en", "ka", "ru", "zh", "es", "he"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function buildLanguageHref(pathname: string, locale: SupportedLocale, search = ""): string {
  const segments = pathname.split("/").filter(Boolean);
  if (SUPPORTED_LOCALES.includes(segments[0] as SupportedLocale)) segments.shift();

  // Article IDs identify a single language, not a set of translations.
  if (segments[0] === "blog" && segments.length > 1) segments.splice(1);

  // The legal documents have no translated counterparts yet.
  if (segments.length === 1 && ["privacy-policy", "terms-of-service"].includes(segments[0])) {
    segments.length = 0;
  }

  const path = segments.length ? `/${segments.join("/")}` : "";
  const query = search.replace(/^\?/, "");
  return `/${locale}${path}${query ? `?${query}` : ""}`;
}
