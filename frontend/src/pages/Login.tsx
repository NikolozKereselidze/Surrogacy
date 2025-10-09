import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/Login.module.css";

const Login = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/${isAdmin ? "admin-auth" : "auth"}/check`,
          {
            credentials: "include",
          }
        );

        if (res.ok) {
          // User is already authenticated, redirect to intended page or dashboard
          const from =
            location.state?.from || (isAdmin ? "/admin" : "/find-egg-donor");
          navigate(from, { replace: true });
        }
      } catch {
        console.error("Auth check failed");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [navigate, location, isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/api/${isAdmin ? "admin-auth" : "auth"}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
          credentials: "include", // This will receive the JWT cookie
        }
      );

      if (res.ok) {
        // JWT token is now set as HTTP-only cookie automatically
        const from =
          location.state?.from || (isAdmin ? "/admin" : "/find-egg-donor");
        navigate(from, { replace: true });
      } else {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || "Incorrect password. Please try again.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return <div className={styles.loading}>Checking authentication...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Enter Access Password</h2>
        <p className={styles.description}>
          Please enter the password to access donor information.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className={styles.input}
            disabled={loading}
            autoComplete="current-password"
          />

          {error && <div className={styles.error}>{error}</div>}

          <button
            id="login-button"
            name="login-button"
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
