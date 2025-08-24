import styles from "../styles/WhoCanBecomeSurrogate.module.css";

interface ProcessStepProps {
  stepNumber: string;
  stepTitle: string;
  stepContent: string;
  stepIcon: React.ReactNode;
}

const ProcessStep = ({
  stepNumber,
  stepTitle,
  stepContent,
  stepIcon,
}: ProcessStepProps) => {
  return (
    <div className={styles.processStep}>
      <div className={styles.stepNumber}>{stepNumber}</div>
      <div className={styles.stepContent}>
        <h3>{stepTitle}</h3>
        <p>{stepContent}</p>
        <div className={styles.stepIcon}>{stepIcon}</div>
      </div>
    </div>
  );
};

export default ProcessStep;
