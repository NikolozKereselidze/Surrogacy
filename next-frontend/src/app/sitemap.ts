import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";
import type { TeamMember } from "@/types/teamMember";

export const dynamic = "force-dynamic";
interface BlogPost {
  id: string;
  language: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  imagePath: string;
  updatedAt: string;
}
const staticRoutes = [
  { path: "", priority: 1.0 },
  { path: "/our-mission", priority: 0.9 },
  { path: "/who-we-are", priority: 0.9 },
  { path: "/our-team", priority: 0.8 },
  { path: "/why-choose-us", priority: 0.8 },
  { path: "/surrogacy-process", priority: 0.9 },
  { path: "/surrogacy-in-georgia", priority: 0.95 },
  { path: "/who-can-become-a-surrogate", priority: 0.8 },
  { path: "/surrogate-screening", priority: 0.8 },
  { path: "/who-can-become-a-parent", priority: 0.8 },
  { path: "/parent-screening", priority: 0.8 },
  { path: "/support-and-counselling", priority: 0.8 },
  { path: "/why-become-a-donor", priority: 0.8 },
  { path: "/who-can-become-a-donor", priority: 0.8 },
  { path: "/surrogacy-with-own-gametes", priority: 0.9 },
  { path: "/surrogacy-with-egg-donor", priority: 0.9 },
  { path: "/egg-freezing-preservation", priority: 0.8 },
  { path: "/vip-concierge-services", priority: 0.8 },
  { path: "/faq", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
];
const locales = ["en", "he", "zh", "ru", "es", "ka"];
function buildSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
function buildAlternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(
        locales.map((locale) => [locale, `${BASE_URL}/${locale}${path}`]),
      ),
      "x-default": `${BASE_URL}/en${path}`,
    },
  };
}
async function fetchSitemapData<T>(path: string): Promise<T> {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBase) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is required to generate the sitemap");
  }
  const response = await fetch(`${apiBase}${path}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Sitemap API request failed for ${path}: ${response.status}`);
  }
  return response.json() as Promise<T>;
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];
  staticRoutes.forEach((route) => {
    locales.forEach((locale) => {
      let changeFrequency: "daily" | "weekly" | "monthly" | "yearly" =
        "monthly";
      if (route.path === "") {
        changeFrequency = "daily";
      } else if (
        route.path.includes("process") ||
        route.path.includes("screening") ||
        route.path.includes("donor") ||
        route.path.includes("parent")
      ) {
        changeFrequency = "yearly";
      }
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        changeFrequency,
        priority: route.priority,
        alternates: buildAlternates(route.path),
      });
    });
  });
  const [teamMembers, blogPosts] = await Promise.all([
    fetchSitemapData<TeamMember[]>("/api/team-members?locale=en"),
    fetchSitemapData<BlogPost[]>("/api/blog"),
  ]);
  teamMembers.forEach((member) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/team/${member.slug}`,
        lastModified: member.updatedAt ? new Date(member.updatedAt) : undefined,
        changeFrequency: "yearly" as const,
        priority: 0.6,
        alternates: buildAlternates(`/team/${member.slug}`),
      });
    });
  });
  blogPosts.forEach((post: BlogPost) => {
    const locale = locales.includes(post.language) ? post.language : "en";
    const slug = buildSlug(post.title || "post");
    const blogPath = `/blog/${post.id}/${slug}`;
    const canonicalUrl = `${BASE_URL}/${locale}${blogPath}`;
    sitemapEntries.push({
      url: canonicalUrl,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          [locale]: canonicalUrl,
          "x-default": canonicalUrl,
        },
      },
    });
  });
  return sitemapEntries;
}
