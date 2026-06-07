import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import styles from "@/styles/RequirementsCard.module.css";

interface RequirementsCardProps {
  icon?: IconType;
  iconContent?: ReactNode;
  title: string;
  description: string;
}

const RequirementsCard = ({
  icon: Icon,
  iconContent,
  title,
  description,
}: RequirementsCardProps) => {
  return (
    <div className={styles.requirementCard}>
      <div className={styles.requirementIconWrapper}>
        <div className={styles.requirementIcon}>
          {iconContent ?? (Icon ? <Icon /> : null)}
        </div>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default RequirementsCard;
