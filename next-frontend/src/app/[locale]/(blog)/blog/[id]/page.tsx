import { notFound, permanentRedirect } from "next/navigation";
import { buildBlogPath } from "@/lib/blogUrls";

// Recover links generated before translated titles had a nonempty slug.
export default async function BlogPostWithoutSlug({ params }: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBase) throw new Error("NEXT_PUBLIC_API_BASE_URL is required to fetch blog posts");

  const response = await fetch(`${apiBase}/api/blog/${encodeURIComponent(id)}`, {
    next: { revalidate: 300 },
  });
  if (response.status === 404) notFound();
  if (!response.ok) throw new Error(`Blog post API request failed: ${response.status}`);
  const post: { id: string; title: string; language?: string } | null = await response.json();
  if (!post) notFound();
  permanentRedirect(buildBlogPath(post.language || "en", id, post.title));
}
