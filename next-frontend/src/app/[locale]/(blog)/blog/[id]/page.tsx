import { notFound, permanentRedirect } from "next/navigation";
import { buildBlogPath } from "@/lib/blogUrls";

// Recover links generated before translated titles had a nonempty slug.
export default async function BlogPostWithoutSlug({ params }: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBase) notFound();

  let post: { id: string; title: string; language?: string } | null = null;
  try {
    const response = await fetch(`${apiBase}/api/blog/${encodeURIComponent(id)}`, {
      next: { revalidate: 300 },
    });
    if (response.ok) post = await response.json();
  } catch {
    notFound();
  }
  if (!post) notFound();
  permanentRedirect(buildBlogPath(post.language || "en", id, post.title));
}
