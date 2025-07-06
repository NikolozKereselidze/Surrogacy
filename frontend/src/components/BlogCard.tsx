import { Link } from "react-router-dom";
import styles from "../styles/BlogCard.module.css";
import { useTranslation } from "react-i18next";

interface BlogPost {
  id: string;
  link: string;
  imagePath: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const { t } = useTranslation();

  return (
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
          <span className={styles.blogReadTime}>{post.readTime}</span>
        </div>

        <h3 className={styles.blogTitle}>{post.title}</h3>
        <p className={styles.blogExcerpt}>{post.excerpt}</p>

        <Link to={`/blog/${post.link}`} className={styles.readMoreLink}>
          {t("blog.readMore")} →
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
