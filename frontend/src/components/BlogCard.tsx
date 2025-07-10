import { Link } from "react-router-dom";
import styles from "../styles/BlogCard.module.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

interface BlogPost {
  id: string;
  link: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  imagePath: string;
}

const BlogCard = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const response = await fetch("http://localhost:3000/api/blog");
      const data = await response.json();
      setBlogPosts(data);
    };
    fetchBlogPosts();
  }, []);

  const { t } = useTranslation();

  return (
    <section className={`${styles.blogSection} section`}>
      <div className="content">
        <h2 className="title">{t("blog.title")}</h2>
        <p className="subtitle">{t("blog.subtitle")}</p>
      </div>
      <div className={styles.blogGrid}>
        {blogPosts.length > 0 && (
          <Swiper
            modules={[Pagination, Navigation, Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={2}
            navigation
            loop
            pagination={{ clickable: true }}
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <article className={styles.blogCard}>
                  <div className={styles.blogImageContainer}>
                    <img
                      src={post.imagePath}
                      alt={post.title}
                      className={styles.blogImage}
                    />
                    <div className={styles.blogCategory}>{post.category}</div>
                  </div>

                  <div className={styles.blogContent}>
                    <div className={styles.blogMeta}>
                      <span className={styles.blogDate}>{post.date}</span>
                      <span className={styles.blogReadTime}>
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className={styles.blogTitle}>{post.title}</h3>
                    <p className={styles.blogExcerpt}>{post.excerpt}</p>

                    <Link
                      to={`/blog/${post.link}`}
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
