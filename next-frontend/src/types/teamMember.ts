export const TEAM_LOCALES = ["en", "es", "ru", "he", "zh", "ka"] as const;
export type TeamLocale = (typeof TEAM_LOCALES)[number];

export const TEAM_LOCALE_LABELS: Record<TeamLocale, string> = {
  en: "English",
  es: "Spanish",
  ru: "Russian",
  he: "Hebrew",
  zh: "Chinese",
  ka: "Georgian",
};

export interface TeamMemberTranslation {
  id?: string;
  locale: TeamLocale;
  role: string;
  shortDescription: string;
  longDescription: string;
}

export interface TeamMember {
  id: string;
  slug: string;
  honorific: string;
  name: string;
  email: string | null;
  linkedin: string | null;
  imagePath: string;
  displayOrder: number;
  featured: boolean;
  published: boolean;
  locale?: string;
  role: string;
  shortDescription: string;
  longDescription: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminTeamMember extends Omit<TeamMember, "locale" | "role" | "shortDescription" | "longDescription"> {
  translations: TeamMemberTranslation[];
}

export interface TeamMemberInput {
  slug: string;
  honorific: string;
  name: string;
  email: string;
  linkedin: string;
  imagePath: string;
  displayOrder: number;
  featured: boolean;
  published: boolean;
  translations: TeamMemberTranslation[];
}
