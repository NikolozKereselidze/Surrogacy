import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";
import { teamMembers } from "@/data/teamMembers";

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
  slug: string;
}

// Define static routes that should appear in the sitemap
const staticRoutes = [
  { path: "", priority: 1.0 }, // Homepage
  { path: "/our-mission", priority: 0.9 },
  { path: "/who-we-are", priority: 0.9 },
  { path: "/our-team", priority: 0.8 },
  { path: "/why-choose-us", priority: 0.8 },
  { path: "/surrogacy-process", priority: 0.9 },
  { path: "/who-can-become-a-surrogate", priority: 0.8 },
  { path: "/surrogate-screening", priority: 0.8 },
  { path: "/who-can-become-a-parent", priority: 0.8 },
  { path: "/parent-screening", priority: 0.8 },
  { path: "/support-and-counselling", priority: 0.8 },
  { path: "/who-can-become-a-donor", priority: 0.8 },
  { path: "/surrogacy-with-own-gametes", priority: 0.9 },
  { path: "/surrogacy-with-egg-donor", priority: 0.9 },
  { path: "/egg-freezing-preservation", priority: 0.8 },
  { path: "/vip-concierge-services", priority: 0.8 },
  { path: "/faq", priority: 0.7 },
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
    languages: Object.fromEntries(
      locales.map((locale) => [locale, `${BASE_URL}/${locale}${path}`]),
    ),
  };
}

// Fetch blog posts from your API
async function getBlogPosts() {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog`;
    const response = await fetch(apiUrl, {
      next: { revalidate: 900 },
    });
    if (!response.ok) {
      console.error("Failed to fetch blog posts for sitemap:", response.status);
      return [];
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Build sitemap entries
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add static routes for all locales
  staticRoutes.forEach((route) => {
    locales.forEach((locale) => {
      // Determine appropriate change frequency based on route type
      let changeFrequency: "daily" | "weekly" | "monthly" | "yearly" =
        "monthly";
      if (route.path === "") {
        changeFrequency = "daily"; // Homepage changes more frequently
      } else if (
        route.path.includes("process") ||
        route.path.includes("screening") ||
        route.path.includes("donor") ||
        route.path.includes("parent")
      ) {
        changeFrequency = "yearly"; // Process/screening pages change less frequently
      }

      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency,
        priority: route.priority,
        alternates: buildAlternates(route.path),
      });
    });
  });

  // Add team member pages for all locales
  teamMembers.forEach((member) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/team/${member.id}`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.6,
        alternates: buildAlternates(`/team/${member.id}`),
      });
    });
  });

  // Add blog posts for all locales
  const blogPosts = await getBlogPosts();
  blogPosts.forEach((post: BlogPost) => {
    locales.forEach((locale) => {
      // Check if post has content for this locale
      if (post.language === locale || !post.language) {
        const slug = buildSlug(post.slug || post.title || "post");
        const blogPath = `/blog/${post.id}/${slug}`;

        sitemapEntries.push({
          url: `${BASE_URL}/${locale}${blogPath}`,
          lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: buildAlternates(blogPath),
        });
      }
    });
  });

  return sitemapEntries;
}
