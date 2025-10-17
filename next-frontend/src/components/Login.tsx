"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/styles/Login.module.css";

const LoginContent = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from") || "/find-egg-donor";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Redirect to the original page or default
        router.push(from);
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Enter Access Password</h2>
        <p className={styles.description}>
          Please enter the password to access donor information.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className={styles.input}
            autoComplete="current-password"
            disabled={loading}
          />

          {error && <div className={styles.error}>{error}</div>}

          <button
            id="login-button"
            name="login-button"
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <Suspense
      fallback={
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <h2 className={styles.title}>Loading...</h2>
            <p className={styles.description}>
              Please wait while we prepare the login form.
            </p>
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
};

export default Login;
