"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import styles from "@/styles/Blog/Blog.module.css";
const FALLBACK_HERO_IMAGE = "/img/home/hero/hero-1920.webp";
const DATE_LOCALES: Record<string, string> = {
    en: "en-US",
    he: "he-IL",
    zh: "zh-CN",
    ru: "ru-RU",
    es: "es-ES",
    ka: "ka-GE",
};
type BlogPostHeaderProps = {
    title: string;
    readTime: string;
    date: string;
    imageUrl?: string;
};
export default function BlogPostHeader({ title, readTime, date, imageUrl, }: BlogPostHeaderProps) {
    const { t, i18n } = useTranslation();
    const dateLocale = DATE_LOCALES[i18n.language] ?? "en-US";
    const formattedDate = new Date(date).toLocaleDateString(dateLocale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return (<header className={styles.postHero}>
      <Image src={imageUrl || FALLBACK_HERO_IMAGE} alt="" fill priority sizes="100vw" className={styles.postHeroImage}/>
      <div className={styles.postHeroOverlay} aria-hidden="true"/>
      <div className={styles.postHeroContent}>
        <h1 className={styles.postTitle}>{title}</h1>
        <p className={styles.postHeroMeta}>
          <span>
            {readTime} {t("blog.readTime")}
          </span>
          <span className={styles.postHeroDate}>{formattedDate}</span>
        </p>
      </div>
    </header>);
}
