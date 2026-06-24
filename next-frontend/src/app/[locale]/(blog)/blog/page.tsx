import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import blogStyles from "@/styles/Blog/Blog.module.css";
import cardStyles from "@/styles/Blog/BlogCard.module.css";
import { buildPageMetadata } from "@/lib/seo";
import { getMetaKeywords } from "@/lib/seo-keywords";

const CLOUDFRONT_DOMAIN = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface BlogPost {
  id: string;
  language: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  imagePath?: string;
}

function getImageUrl(imagePath?: string) {
  if (!imagePath) return undefined;
  return `${CLOUDFRONT_DOMAIN}/${imagePath}`;
}

function buildSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function fetchPostsByLocale(locale: string): Promise<BlogPost[]> {
  if (!API_BASE_URL) return [];
  try {
    const params = new URLSearchParams({ language: locale });
    const res = await fetch(`${API_BASE_URL}/api/blog?${params}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return (await res.json()) as BlogPost[];
  } catch {
    return [];
  }
}

const localizedMeta = {
  en: {
    title: "Blog | Surrogacy & IVF Insights in Georgia",
    description:
      "Stories, guides and expert insights about surrogacy in Georgia country, egg donation, IVF and family building for international parents.",
    heading: "Our Blog",
    subtitle: "Insights, guides, and stories from our surrogacy community",
    readMore: "Read More",
    readTime: "min read",
    noPosts: "No blog posts available yet. Check back soon.",
  },
  ka: {
    title: "ბლოგი | სუროგაცია და IVF საქართველოში",
    description:
      "სტატიები, სახელმძღვანელოები და ექსპერტული რჩევები სუროგაციასა და კვერცხუჯრედის დონაციაზე საქართველოში.",
    heading: "ჩვენი ბლოგი",
    subtitle: "სტატიები და სახელმძღვანელოები ჩვენი სუროგაციის საზოგადოებიდან",
    readMore: "სრულად წაკითხვა",
    readTime: "წთ სასწავლო",
    noPosts: "ბლოგის პოსტები ჯერ არ არის. მალე შეამოწმეთ.",
  },
  ru: {
    title: "Блог | Суррогатное материнство и ЭКО в Грузии",
    description:
      "Статьи, руководства и экспертные советы о суррогатном материнстве, донорстве яйцеклеток и ЭКО в Грузии для иностранных родителей.",
    heading: "Наш блог",
    subtitle: "Советы, руководства и истории нашего сообщества суррогатного материнства",
    readMore: "Читать далее",
    readTime: "мин чтения",
    noPosts: "Публикаций пока нет. Заходите позже.",
  },
  he: {
    title: "בלוג | פונדקאות ו-IVF בגאורגיה",
    description:
      "מאמרים, מדריכים ותובנות מומחים על פונדקאות בגאורגיה, תרומת ביציות ו-IVF להורים בינלאומיים.",
    heading: "הבלוג שלנו",
    subtitle: "תובנות, מדריכים וסיפורים מקהילת הפונדקאות שלנו",
    readMore: "קרא עוד",
    readTime: "דק׳ קריאה",
    noPosts: "אין פוסטים בבלוג עדיין. בדקו שוב בקרוב.",
  },
  zh: {
    title: "博客 | 格鲁吉亚代孕与IVF资讯",
    description:
      "关于格鲁吉亚代孕、供卵、试管婴儿（IVF）及国际准父母家庭建设的故事、指南与专家见解。",
    heading: "我们的博客",
    subtitle: "来自我们代孕社区的见解、指南与故事",
    readMore: "阅读更多",
    readTime: "分钟阅读",
    noPosts: "暂无博客文章，请稍后查看。",
  },
  es: {
    title: "Blog | Subrogación e IVF en Georgia País",
    description:
      "Historias, guías e ideas de expertos sobre subrogación en Georgia país, donación de óvulos, FIV y formación de familias para padres internacionales.",
    heading: "Nuestro Blog",
    subtitle: "Perspectivas, guías e historias de nuestra comunidad de subrogación",
    readMore: "Leer más",
    readTime: "min de lectura",
    noPosts: "Aún no hay entradas de blog. Vuelve pronto.",
  },
} as const;

type SupportedLocale = keyof typeof localizedMeta;

function getText(locale: string) {
  return localizedMeta[(locale as SupportedLocale) in localizedMeta ? (locale as SupportedLocale) : "en"];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const { locale = "en" } = await params;
  const text = getText(locale);
  return buildPageMetadata({
    title: text.title,
    description: text.description,
    keywords: [...getMetaKeywords((locale as SupportedLocale) in localizedMeta ? (locale as SupportedLocale) : "en")],
    path: "/blog",
    locale,
  });
}

export default async function BlogListingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const text = getText(locale);
  const posts = await fetchPostsByLocale(locale);

  return (
    <>
      <header className={blogStyles.listingHero}>
        <h1 className={blogStyles.listingHeroTitle}>{text.heading}</h1>
        <p className={blogStyles.listingHeroSubtitle}>{text.subtitle}</p>
      </header>

      <section className={blogStyles.listingPage}>
        <div className={blogStyles.listingContainer}>
          {posts.length === 0 ? (
            <p className={blogStyles.listingEmpty}>{text.noPosts}</p>
          ) : (
            <div className={cardStyles.blogGrid}>
              {posts.map((post) => {
                const imageUrl = getImageUrl(post.imagePath);
                const slug = buildSlug(post.title);
                const dateLabel = post.date
                  ? new Date(post.date).toLocaleDateString()
                  : "";
                return (
                  <article key={post.id} className={cardStyles.blogCard}>
                    <div className={cardStyles.blogImageContainer}>
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          className={cardStyles.blogImage}
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
                          }}
                        />
                      )}
                      <div className={cardStyles.blogCategory}>
                        {post.category}
                      </div>
                    </div>

                    <div className={cardStyles.blogContent}>
                      <div className={cardStyles.blogMeta}>
                        <span className={cardStyles.blogDate}>{dateLabel}</span>
                        <span className={cardStyles.blogReadTime}>
                          {post.readTime} {text.readTime}
                        </span>
                      </div>

                      <h2 className={cardStyles.blogTitle}>{post.title}</h2>

                      <Link
                        href={`/${locale}/blog/${post.id}/${slug}`}
                        className={cardStyles.readMoreLink}
                      >
                        {text.readMore} →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
