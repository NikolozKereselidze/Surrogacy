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
  { path: "/surrogacy-in-georgia", priority: 0.9 },
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

// Fetch blog posts from your API
async function getBlogPosts() {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog`;
    const response = await fetch(apiUrl, {
      cache: "no-store",
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
      });
    });
  });

  // Add blog posts for all locales
  const blogPosts = await getBlogPosts();
  blogPosts.forEach((post: BlogPost) => {
    locales.forEach((locale) => {
      // Check if post has content for this locale
      if (post.language === locale || !post.language) {
        sitemapEntries.push({
          url: `${BASE_URL}/${locale}/blog/${post.id}/${post.title || "post"}`,
          lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        });
      }
    });
  });

  return sitemapEntries;
}
