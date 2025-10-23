"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/Login.module.css";

const LoginContent = ({ isAdmin }: { isAdmin: boolean }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/${isAdmin ? "admin-auth" : "auth"}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      push(isAdmin ? "/admin/dashboard" : "/find-egg-donor");
    } catch (err) {
      setError(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>
          Enter {isAdmin ? "Admin" : "Donor"} Access Details
        </h2>
        <p className={styles.description}>
          Please enter the username and password to access{" "}
          {isAdmin ? "admin" : "donor"} information.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
            className={styles.input}
          />

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

const Login = ({ isAdmin }: { isAdmin: boolean }) => {
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
      <LoginContent isAdmin={isAdmin} />
    </Suspense>
  );
};

export default Login;
