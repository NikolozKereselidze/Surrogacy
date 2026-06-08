import type { ReactNode } from "react";
import styles from "../styles/Home.module.css";
import { memo } from "react";
import Link from "next/link";

interface MiracleCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  list?: string[];
  href?: string;
  buttonText?: string;
}

const MiracleCard = ({
  icon,
  title,
  description,
  list,
  href,
  buttonText,
}: MiracleCardProps) => (
  <div className={styles.beginYourMiracleCard}>
    <div className={styles.beginYourMiracleCardContent}>
      {icon}
      <div className={styles.beginYourMiracleCardHeading}>
        <h3 className={styles.beginYourMiracleCardTitle}>{title}</h3>
        <p className={styles.beginYourMiracleCardDesc}>{description}</p>
      </div>
    </div>
    <div className={styles.beginYourMiracleCardList}>
      <ul className={styles.beginYourMiracleCardListItems}>
        {Array.isArray(list) &&
          list.map((item, index) => (
            <li key={index} className={styles.beginYourMiracleCardListItem}>
              {item}
            </li>
          ))}
      </ul>
    </div>
    {href && buttonText && (
      <div className={styles.beginYourMiracleCardButton}>
        <Link href={href} className={styles.beginYourMiracleCardLink}>
          {buttonText}
          <span className={styles.beginYourMiracleCardArrow} aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    )}
  </div>
);

export default memo(MiracleCard);
