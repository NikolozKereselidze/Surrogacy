import styles from "../styles/Button.module.css";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

const Button = ({ children, className, onClick, href }: ButtonProps) => {
  if (href) {
    return (
      <Link to={href} className={`${styles.button} ${className}`}>
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
