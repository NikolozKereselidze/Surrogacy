import styles from "@/styles/LoadingSpinner/LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
  message?: string;
}

const LoadingSpinner = ({
  size = "medium",
  color = "var(--color-primary, #8910f6)",
  message,
}: LoadingSpinnerProps) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={`${styles.spinner} ${styles[size]}`} style={{ color }}>
        <div className={styles.spinnerInner}></div>
      </div>
      {message && <div className={styles.loadingText}>{message}</div>}
    </div>
  );
};

export default LoadingSpinner;
