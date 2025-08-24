import styles from "../styles/SurrogacyProcess.module.css";

interface SupportCardProps {
  title: string;
  text: string;
  icon: React.ReactNode;
}

const SupportCard = ({ title, text, icon }: SupportCardProps) => {
  return (
    <div className={styles.supportCard}>
      <div className={styles.supportIcon}>{icon}</div>
      <h3 className={styles.supportCardTitle}>{title}</h3>
      <p className={styles.supportCardText}>{text}</p>
    </div>
  );
};

export default SupportCard;
