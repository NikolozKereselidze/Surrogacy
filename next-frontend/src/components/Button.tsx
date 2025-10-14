import styles from "../styles/Button.module.css";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

const Button = ({ children, className, onClick, href }: ButtonProps) => {
  if (href) {
    return (
      <Link href={href} className={`${styles.button} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
