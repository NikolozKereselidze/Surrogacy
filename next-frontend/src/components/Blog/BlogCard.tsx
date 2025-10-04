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
  link: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  imagePath: string; // This is your S3 **key** (e.g. 'public/blogs/uuid.png')
}

interface BlogPostWithImage extends BlogPost {
  imageUrl?: string;
}

const BlogCard = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostWithImage[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const res = await fetch("http://localhost:3000/api/blog");
      const data: BlogPost[] = await res.json();

      // Generate CloudFront URLs for images
      const postsWithImages = data.map((post) => ({
        ...post,
        imageUrl: post.imagePath ? getImageUrl(post.imagePath) : undefined,
      }));

      setBlogPosts(postsWithImages);
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

  return (
    <section className={`${styles.blogSection} section`}>
      <div className="content">
        <h2 className="title">{t("blog.title")}</h2>
        <p className="subtitle">{t("blog.subtitle")}</p>
      </div>
      <div className={styles.blogGrid}>
        {blogPosts.length > 0 && (
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
                    <Image
                      src={post.imageUrl || ""}
                      alt={post.title}
                      className={styles.blogImage}
                      width={500}
                      height={500}
                    />
                    <div className={styles.blogCategory}>{post.category}</div>
                  </div>

                  <div className={styles.blogContent}>
                    <div className={styles.blogMeta}>
                      <span className={styles.blogDate}>{post.dateLabel}</span>
                      <span className={styles.blogReadTime}>
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className={styles.blogTitle}>{post.title}</h3>
                    <p className={styles.blogExcerpt}>{post.excerpt}</p>

                    <Link
                      href={`/blog/${post.id}`}
                      className={styles.readMoreLink}
                    >
                      {t("blog.readMore")} →
                    </Link>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default BlogCard;
