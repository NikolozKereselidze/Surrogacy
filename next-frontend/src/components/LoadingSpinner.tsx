import "@/styles/LoadingSpinner.css";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

const LoadingSpinner = ({
  message = "Loading...",
  size = "medium",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: "spinner-small",
    medium: "spinner-medium",
    large: "spinner-large",
  };

  const textSizes = {
    small: "text-small",
    medium: "text-medium",
    large: "text-large",
  };

  return (
    <div className="spinner-container">
      <div className={`spinner ${sizeClasses[size]}`}></div>
      <p className={textSizes[size]}>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
