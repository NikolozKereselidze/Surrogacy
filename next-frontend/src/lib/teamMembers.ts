import type { TeamMember } from "@/types/teamMember";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const CLOUDFRONT_DOMAIN = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

export function normalizeTeamLocale(locale?: string) {
  return locale === "ge" ? "ka" : locale || "en";
}

export function getTeamImageUrl(imagePath: string) {
  if (!imagePath) return "";
  if (imagePath.startsWith("/") || imagePath.startsWith("http")) return imagePath;
  return CLOUDFRONT_DOMAIN ? `${CLOUDFRONT_DOMAIN}/${imagePath}` : `/${imagePath}`;
}

export async function fetchTeamMembers(locale = "en", featured = false): Promise<TeamMember[]> {
  if (!API_BASE) throw new Error("NEXT_PUBLIC_API_BASE_URL is required to fetch team members");
  const query = new URLSearchParams({ locale: normalizeTeamLocale(locale) });
  if (featured) query.set("featured", "true");
  const response = await fetch(`${API_BASE}/api/team-members?${query}`, {
    next: { revalidate: 300 },
  });
  if (!response.ok) throw new Error(`Team members API request failed: ${response.status}`);
  return response.json();
}

export async function fetchTeamMember(slug: string, locale = "en"): Promise<TeamMember | null> {
  if (!API_BASE) throw new Error("NEXT_PUBLIC_API_BASE_URL is required to fetch team members");
  const response = await fetch(
    `${API_BASE}/api/team-members/${encodeURIComponent(slug)}?locale=${normalizeTeamLocale(locale)}`,
    { next: { revalidate: 300 } },
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Team member API request failed: ${response.status}`);
  return response.json();
}
