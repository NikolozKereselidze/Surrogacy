"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/Blog/Blog.module.css";
import { FaClock } from "react-icons/fa";
import DonorsNavigation from "@/components/Navigation/DonorsNavigation";

const CLOUDFRONT_DOMAIN = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

function getImageUrl(imagePath?: string) {
  if (!imagePath) return undefined;
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
  imagePath?: string;
}

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blog post");
        const data: BlogPost = await res.json();
        setPost(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message || "Error fetching blog post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return <div className={styles.state}>Loading...</div>;
  }

  if (error || !post) {
    return <div className={styles.state}>{error || "Not found"}</div>;
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
                <span className={styles.readTime}>{post.readTime}</span>
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
};

export default BlogPost;
