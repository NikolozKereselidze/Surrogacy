import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";

interface MiracleCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  to: string;
}

const MiracleCard = ({ icon, title, description, to }: MiracleCardProps) => (
  <Link to={to} className={styles.beginYourMiracleCard}>
    {icon}
    <div className={styles.beginYourMiracleCardTitle}>{title}</div>
    <div className={styles.beginYourMiracleCardDesc}>{description}</div>
  </Link>
);

export default MiracleCard;
