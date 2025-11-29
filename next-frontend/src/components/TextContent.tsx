import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import styles from "@/styles/TextContent.module.css";

type TextContentImage = {
  src: string;
  alt?: string;
  caption?: string;
  priority?: boolean;
};

type TextContentStat = {
  label: string;
  value: string;
};

type TextContentCta = {
  label: string;
  href?: string;
  ariaLabel?: string;
  onClick?: () => void;
  icon?: ReactNode;
};

type TextContentItem = {
  subtitle: string;
  content: string;
  highlight?: string;
};

interface TextContentProps {
  reverse?: boolean;
  eyebrow?: string;
  title: string;
  description?: string;
  contents?: TextContentItem[];
  image: string | TextContentImage;
  highlightBadge?: string;
  stats?: TextContentStat[];
  cta?: TextContentCta;
}

const TextContent = ({
  reverse = false,
  eyebrow,
  title,
  description,
  contents = [],
  image,
  highlightBadge,
  stats = [],
  cta,
}: TextContentProps) => {
  const imageConfig: TextContentImage =
    typeof image === "string" ? { src: image } : image;

  const renderCta = () => {
    if (!cta) {
      return null;
    }

    const ariaLabel = cta.ariaLabel || cta.label;
    const innerContent = (
      <>
        <span>{cta.label}</span>
        {cta.icon && <span className={styles.ctaIcon}>{cta.icon}</span>}
      </>
    );

    if (cta.href) {
      return (
        <Link
          href={cta.href}
          className={styles.ctaButton}
          aria-label={ariaLabel}
        >
          {innerContent}
        </Link>
      );
    }

    return (
      <button
        type="button"
        className={styles.ctaButton}
        aria-label={ariaLabel}
        onClick={cta.onClick}
      >
        {innerContent}
      </button>
    );
  };

  return (
    <section className={`${styles.section} section`}>
      <div
        className={`${styles.contentContainer} ${
          reverse ? styles.reverse : ""
        }`}
      >
        <div className={styles.textPanel}>
          {(highlightBadge || eyebrow) && (
            <div className={styles.badgeGroup}>
              {highlightBadge && (
                <span className={styles.highlightBadge}>{highlightBadge}</span>
              )}
              {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            </div>
          )}
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}

          {!!contents.length && (
            <div className={styles.contentList}>
              {contents.map(({ subtitle, content, highlight }, index) => (
                <article
                  key={`${subtitle}-${index}`}
                  className={styles.contentItem}
                >
                  <div className={styles.subtitleRow}>
                    <h4 className={styles.subtitle}>{subtitle}</h4>
                    {highlight && (
                      <span className={styles.contentHighlight}>
                        {highlight}
                      </span>
                    )}
                  </div>
                  <p className={styles.contentText}>{content}</p>
                </article>
              ))}
            </div>
          )}

          {!!stats.length && (
            <div className={styles.statsGrid}>
              {stats.map(({ label, value }) => (
                <div key={`${label}-${value}`} className={styles.statCard}>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>
          )}

          {renderCta()}
        </div>

        <div className={styles.mediaPanel}>
          <div className={styles.imageWrapper}>
            <Image
              src={imageConfig.src}
              alt={imageConfig.alt || title}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              priority={imageConfig.priority}
              className={styles.image}
            />
          </div>
          {imageConfig.caption && (
            <p className={styles.imageCaption}>{imageConfig.caption}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TextContent;
