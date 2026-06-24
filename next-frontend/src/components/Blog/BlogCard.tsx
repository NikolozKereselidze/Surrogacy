"use client";
import Link from "next/link";
import styles from "@/styles/Blog/BlogCard.module.css";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useLocale } from "@/hooks/useLocale";
const CLOUDFRONT_DOMAIN = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;
const MAX_POSTS = 3;
function getImageUrl(imagePath: string) {
  return `${CLOUDFRONT_DOMAIN}/${imagePath}`;
}
function buildSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
interface BlogPost {
  id: string;
  language: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  imagePath: string;
}
interface BlogPostWithImage extends BlogPost {
  imageUrl?: string;
}
const postsCache = new Map<string, BlogPostWithImage[]>();
const BlogSkeleton = () => (
  <article className={styles.blogCard}>
    <div className={styles.blogImageContainer}>
      <div className={`${styles.skeleton} ${styles.skeletonImage}`} />
      <div
        className={`${styles.skeleton} ${styles.skeletonCategory}`}
        style={{ position: "absolute", top: "1rem", left: "1rem" }}
      />
    </div>

    <div className={styles.blogContent}>
      <div className={styles.blogMeta}>
        <div className={`${styles.skeleton} ${styles.skeletonMeta}`} />
        <div className={`${styles.skeleton} ${styles.skeletonMeta}`} />
      </div>

      <div>
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
      </div>

      <div
        className={`${styles.skeleton} ${styles.skeletonLink}`}
        style={{ marginTop: "0.6rem" }}
      />
    </div>
  </article>
);
const BlogCard = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const locale = useLocale();
  useEffect(() => {
    if (postsCache.has(locale)) {
      setBlogPosts(postsCache.get(locale)!);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          language: locale,
          limit: String(MAX_POSTS),
        });
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog?${params}`,
          { signal: controller.signal },
        );
        const data: BlogPost[] = await res.json();
        const postsWithImages = data.map((post) => ({
          ...post,
          imageUrl: post.imagePath ? getImageUrl(post.imagePath) : undefined,
        }));
        if (!cancelled) {
          postsCache.set(locale, postsWithImages);
          setBlogPosts(postsWithImages);
        }
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        console.error("Error fetching blog posts:", error);
        if (!cancelled) {
          setBlogPosts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchBlogPosts();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [locale]);
  const postsWithFormattedDate = useMemo(
    () =>
      blogPosts.map((p) => ({
        ...p,
        dateLabel: p.date ? new Date(p.date).toLocaleDateString() : "",
      })),
    [blogPosts],
  );
  return (
    <section className={`${styles.blogSection} section`}>
      <div className="content">
        <h2 className="title">{t("blog.title")}</h2>
        <p className="subtitle">{t("blog.subtitle")}</p>
      </div>
      <div className={styles.blogGrid}>
        {loading ? (
          Array.from({ length: MAX_POSTS }, (_, i) => <BlogSkeleton key={i} />)
        ) : blogPosts.length > 0 ? (
          postsWithFormattedDate.map((post) => (
            <article key={post.id} className={styles.blogCard}>
              <div className={styles.blogImageContainer}>
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    className={styles.blogImage}
                    width={500}
                    height={500}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    style={{
                      width: 500,
                      height: 500,
                      background: "#f0f0f0",
                      borderRadius: 8,
                    }}
                  />
                )}
                <div className={styles.blogCategory}>{post.category}</div>
              </div>

              <div className={styles.blogContent}>
                <div className={styles.blogMeta}>
                  <span className={styles.blogDate}>{post.dateLabel}</span>
                  <span className={styles.blogReadTime}>
                    {post.readTime} mins read
                  </span>
                </div>

                <h3 className={styles.blogTitle}>{post.title}</h3>

                <Link
                  href={`/${locale}/blog/${post.id}/${buildSlug(post.title)}`}
                  className={styles.readMoreLink}
                >
                  {t("blog.readMore")} →
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className={styles.emptyState}>
            {t("blog.noPosts", { defaultValue: "No blog posts available." })}
          </div>
        )}
      </div>
      {!loading && blogPosts.length > 0 && (
        <div className={styles.viewAllContainer}>
          <Link href={`/${locale}/blog`} className={styles.viewAllLink}>
            {t("blog.viewAll")} →
          </Link>
        </div>
      )}
    </section>
  );
};
export default BlogCard;
