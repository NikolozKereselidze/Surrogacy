import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";
import Button from "./Button";

interface MiracleCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  to?: string;
  list?: string[];
  btn?: boolean;
}

const MiracleCard = ({
  icon,
  title,
  description,
  to,
  list,
  btn,
}: MiracleCardProps) => (
  <Link to={to || ""} className={styles.beginYourMiracleCard}>
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
  </Link>
);

export default MiracleCard;
