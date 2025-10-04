import type { IconType } from "react-icons";
import styles from "@/styles/RequirementsCard.module.css";

interface RequirementsCardProps {
  icon: IconType;
  title: string;
  description: string;
}

const RequirementsCard = ({
  icon: Icon,
  title,
  description,
}: RequirementsCardProps) => {
  return (
    <div className={styles.requirementCard}>
      <div className={styles.requirementIconWrapper}>
        <div className={styles.requirementIcon}>
          <Icon />
        </div>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default RequirementsCard;
