"use client";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Link from "next/link";
import styles from "@/styles/Blog/BlogCard.module.css";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import Image from "next/image";

const CLOUDFRONT_DOMAIN = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

function getImageUrl(imagePath: string) {
  return `${CLOUDFRONT_DOMAIN}/${imagePath}`;
}

interface BlogPost {
  id: string;
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

const BlogCard = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostWithImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog`
        );
        const data: BlogPost[] = await res.json();

        // Generate CloudFront URLs for images
        const postsWithImages = data.map((post) => ({
          ...post,
          imageUrl: post.imagePath ? getImageUrl(post.imagePath) : undefined,
        }));

        setBlogPosts(postsWithImages);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const { t } = useTranslation();

  const SWIPER_MODULES = useMemo(
    () => [Pagination, Navigation, Scrollbar, A11y],
    []
  );
  const postsWithFormattedDate = useMemo(
    () =>
      blogPosts.map((p) => ({
        ...p,
        dateLabel: p.date ? new Date(p.date).toLocaleDateString() : "",
      })),
    [blogPosts]
  );

  // Skeleton loader component
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

  return (
    <section className={`${styles.blogSection} section`}>
      <div className="content">
        <h2 className="title">{t("blog.title")}</h2>
        <p className="subtitle">{t("blog.subtitle")}</p>
      </div>
      <div className={styles.blogGrid}>
        {loading ? (
          <Swiper
            modules={SWIPER_MODULES}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1278: { slidesPerView: 3 },
            }}
            navigation={false}
            loop={false}
            pagination={false}
          >
            {[1, 2, 3].map((i) => (
              <SwiperSlide key={i}>
                <BlogSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : blogPosts.length > 0 ? (
          <Swiper
            modules={SWIPER_MODULES}
            spaceBetween={20}
            slidesPerView={1} // default: mobile
            breakpoints={{
              768: { slidesPerView: 2 }, // tablet and up
              1278: { slidesPerView: 3 }, // large desktop
            }}
            navigation
            loop
            pagination={{ clickable: true }}
          >
            {postsWithFormattedDate.map((post) => (
              <SwiperSlide key={post.id}>
                <article className={styles.blogCard}>
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
                      href={`/blog/${post.id}/${post.title
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-+|-+$/g, "")}`}
                      className={styles.readMoreLink}
                    >
                      {t("blog.readMore")} →
                    </Link>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div
            className="content"
            style={{ textAlign: "center", width: "100%" }}
          >
            {t("blog.noPosts", { defaultValue: "No blog posts available." })}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogCard;
