/**
 * Target SEO keywords for ivftourgeorgia.com
 * Source: Semrush keyword research (Jun 2026). Refresh quarterly.
 * Target market: Georgia (country), not US state of Georgia.
 */

export type KeywordTier = "primary" | "secondary" | "longtail" | "faq";

export type LocaleKeywords = {
  primary: string[];
  secondary: string[];
  longtail: string[];
  faq: string[];
};

/** Flat list for meta keywords tag  primary + secondary only */
export function getMetaKeywords(locale: keyof typeof SEO_KEYWORDS): string[] {
  const k = SEO_KEYWORDS[locale];
  return [...k.primary, ...k.secondary];
}

export const SEO_KEYWORDS = {
  en: {
    primary: [
      "surrogacy in georgia",
      "georgia surrogacy",
      "surrogacy georgia",
      "surrogacy in georgia country",
      "gestational surrogacy georgia",
    ],
    secondary: [
      "egg donation georgia",
      "georgia surrogacy laws",
      "georgia surrogacy agency",
      "surrogacy cost in georgia",
      "international surrogacy georgia",
      "ivf georgia",
      "surrogacy in tbilisi",
      "georgia country surrogacy",
    ],
    longtail: [
      "is surrogacy legal in georgia country",
      "georgia surrogacy birth certificate",
      "georgia surrogacy program",
      "gay surrogacy georgia",
      "affordable surrogacy georgia",
      "surrogacy laws in georgia country",
      "georgia surrogacy cost",
    ],
    faq: [
      "how much does surrogacy cost in georgia",
      "is surrogacy legal in georgia",
      "what is the surrogacy process in georgia",
      "what is gestational surrogacy in georgia",
      "how much is surrogacy in georgia",
    ],
  },
  ka: {
    // Semrush ge database (Jun 2026). Volumes: ivf/ხელოვნური განაყოფიერება ~390,
    // ორსულობა ~1300 (broad  longtail only), სუროგაცია/ემბრიონი ~260, ინ ვიტრო ~210.
    primary: [
      "ivf",
      "ხელოვნური განაყოფიერება",
      "ინ ვიტრო",
      "სუროგაცია",
      "ემბრიონი",
      "სუროგაცია საქართველოში",
    ],
    secondary: [
      "კვერცხუჯრედის დონაცია",
      "კვერცხუჯრედის დონორი",
      "სუროგაციის ცენტრი",
      "სუროგატი",
      "სუროგატი დედები",
      "ინ ვიტრო კლინიკა",
      "გესტაციური სუროგაცია",
    ],
    longtail: [
      "ინ ვიტრო განაყოფიერება",
      "კვერცხუჯრედის დონაცია ფასი",
      "სუროგაცია და დონაცია საქართველოში",
      "სუროგაციის ღირებულება",
      "სუროგაცია თბილისში",
      "დონაცია საქართველო",
      "დონორი",
      "ორსულობა",
      "რა არის სუროგაცია",
      "სუროგაცია და დონაცია",
    ],
    faq: [
      "როგორ ხდება სუროგაცია",
      "რა ღირს სუროგაცია",
      "რას ნიშნავს სუროგაცია",
      "რა არის ინ ვიტრო",
      "რა ღირს კვერცხუჯრედის დონაცია",
    ],
  },
  ru: {
    primary: [
      "суррогатное материнство в грузии",
      "суррогатное материнство грузия",
    ],
    secondary: [
      "суррогатное материнство в грузии цены",
      "донорство яйцеклеток грузия",
      "суррогатная программа тбилиси",
      "эко в грузии",
      "стоимость суррогатного материнства в грузии",
    ],
    longtail: [
      "центр суррогатного материнства в грузии",
      "клиники суррогатного материнства в грузии",
      "сколько стоит суррогатное материнство в грузии",
    ],
    faq: [
      "законно ли суррогатное материнство в грузии",
      "сколько стоит суррогатное материнство в грузии",
    ],
  },
  he: {
    primary: ["פונדקאות בגאורגיה", "פונדקאות גסטציונלית בגאורגיה"],
    secondary: [
      "תרומת ביצית גאורגיה",
      "פונדקאות טביליסי",
      "עלות פונדקאות בגאורגיה",
    ],
    longtail: ["פונדקאות ישראלי בגאורגיה"],
    faq: ["האם פונדקאות חוקית בגאורגיה"],
  },
  es: {
    primary: [
      "subrogación en georgia",
      "gestación subrogada georgia",
      "subrogación en georgia país",
    ],
    secondary: [
      "costo subrogación georgia",
      "donación de óvulos georgia",
      "subrogación tbilisi",
      "fiv georgia",
    ],
    longtail: ["subrogación legal georgia", "agencia subrogación georgia"],
    faq: [
      "cuánto cuesta la subrogación en georgia",
      "es legal la subrogación en georgia",
    ],
  },
  zh: {
    primary: ["格鲁吉亚代孕", "格鲁吉亚妊娠代孕", "格鲁吉亚代孕合法"],
    secondary: [
      "格鲁吉亚代孕费用",
      "格鲁吉亚供卵",
      "第比利斯代孕",
      "格鲁吉亚试管婴儿",
    ],
    longtail: ["格鲁吉亚代孕价格", "格鲁吉亚代孕机构"],
    faq: ["格鲁吉亚代孕多少钱", "格鲁吉亚代孕流程"],
  },
} as const satisfies Record<string, LocaleKeywords>;
