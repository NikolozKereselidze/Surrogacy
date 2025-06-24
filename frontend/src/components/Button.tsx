import styles from "../styles/Button.module.css";

const Button = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button className={`${styles.button} ${className}`}>{children}</button>
  );
};

export default Button;
