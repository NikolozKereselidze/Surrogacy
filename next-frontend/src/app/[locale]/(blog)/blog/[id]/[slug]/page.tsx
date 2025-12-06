import Image from "next/image";
import type { Metadata } from "next";
import styles from "@/styles/Blog/Blog.module.css";
import { FaClock } from "react-icons/fa";
import DonorsNavigation from "@/components/Navigation/DonorsNavigation";
import { BASE_URL } from "@/lib/seo";

const CLOUDFRONT_DOMAIN = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

function getImageUrl(imagePath?: string) {
  if (!imagePath) return undefined;
  return `${CLOUDFRONT_DOMAIN}/${imagePath}`;
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  imagePath?: string;
}

async function fetchPostById(id: string): Promise<BlogPost | null> {
  console.log(id);
  if (!id) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/${id}`,
    { cache: "no-store" }
  );
  console.log(res);
  if (!res.ok) return null;
  return (await res.json()) as BlogPost;
}

function extractText(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(str: string, max = 160): string {
  if (str.length <= max) return str;
  return `${str.slice(0, max - 1)}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale?: string; slug?: string }>;
}): Promise<Metadata> {
  const { id, locale = "en" } = await params;
  const post = await fetchPostById(id);
  const title = post?.title ?? "Blog post";
  const description =
    truncate(extractText(post?.content || ""), 160) ||
    "Insights from Miracle Makers about surrogacy, egg donation and family building.";
  const ogImage = post?.imagePath ? getImageUrl(post.imagePath) : undefined;
  const canonicalUrl = `${BASE_URL}/${locale}/blog/${id}`;

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE_URL}/en/blog/${id}`,
        he: `${BASE_URL}/he/blog/${id}`,
        es: `${BASE_URL}/es/blog/${id}`,
        ru: `${BASE_URL}/ru/blog/${id}`,
        zh: `${BASE_URL}/zh/blog/${id}`,
        ka: `${BASE_URL}/ka/blog/${id}`,
        "x-default": `${BASE_URL}/en/blog/${id}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      siteName: "Miracle Makers - Surrogacy & Egg Donation Services",
      locale:
        locale === "en"
          ? "en_US"
          : locale === "he"
          ? "he_IL"
          : locale === "zh"
          ? "zh_CN"
          : locale === "ru"
          ? "ru_RU"
          : locale === "es"
          ? "es_ES"
          : locale === "ka"
          ? "ka_GE"
          : "en_US",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
      creator: "@miraclemakers",
      site: "@miraclemakers",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchPostById(id);

  if (!post) {
    return <div className={styles.state}>Not found</div>;
  }

  return (
    <>
      <DonorsNavigation />
      <div className={styles.postHeaderWrapper}>
        <div className={`${styles.postHeader} section`}>
          <div className="">
            <h2 className={styles.postTitle}>{post.title}</h2>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.category}>{post.category}</span>
                <span className={styles.readTime}>
                  {post.readTime} mins read
                </span>
              </div>
              <div className={styles.date}>
                <FaClock />
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <article className={`${styles.blogPostPage} section`}>
        <div className={styles.postContainer}>
          {post.imagePath && (
            <Image
              src={getImageUrl(post.imagePath) || ""}
              alt={post.title}
              className={styles.postImage}
              width={1000}
              height={1000}
            />
          )}
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </>
  );
}
