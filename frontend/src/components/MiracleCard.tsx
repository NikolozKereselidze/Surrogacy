import type { ReactNode } from "react";
import styles from "../styles/Home.module.css";
import Button from "./Button";

interface MiracleCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  list?: string[];
  btn?: boolean;
}

const MiracleCard = ({
  icon,
  title,
  description,
  list,
  btn,
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
        {list?.map((item, index) => (
          <li key={index} className={styles.beginYourMiracleCardListItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
    {btn && (
      <div className={styles.beginYourMiracleCardButton}>
        <Button>
          <span>Learn More</span>
        </Button>
      </div>
    )}
  </div>
);

export default MiracleCard;
