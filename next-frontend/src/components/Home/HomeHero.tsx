"use client";
import styles from "@/styles/Home.module.css";
import HomeHeroContent from "./HomeHeroContent";
import { useTranslation } from "react-i18next";
const HERO_IMAGE_DESKTOP = "/img/home/hero/hero-1920.webp";
const HERO_IMAGE_MOBILE = "/img/home/hero/hero-1280.webp";
const HomeHero = () => {
    const { t } = useTranslation();
    return (<>
      <link rel="preload" as="image" href={HERO_IMAGE_DESKTOP} media="(min-width: 1279px)" fetchPriority="high"/>
      <link rel="preload" as="image" href={HERO_IMAGE_MOBILE} media="(max-width: 1278px)" fetchPriority="high"/>
      <section className={styles.heroSection}>
        <picture className={styles.heroPicture}>
          <source media="(max-width: 1278px)" srcSet={HERO_IMAGE_MOBILE}/>
          <img src={HERO_IMAGE_DESKTOP} alt={t("homepage.heroImageAlt")} className={styles.heroImage} fetchPriority="high" decoding="async"/>
        </picture>
        <HomeHeroContent />
      </section>
    </>);
};
export default HomeHero;
