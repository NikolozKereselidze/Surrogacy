"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/Login.module.css";

const EyeIcon = ({ hidden }: { hidden: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {hidden ? (
      <>
        <path d="M3 3l18 18" />
        <path d="M10.6 10.7a2 2 0 002.7 2.7M9.9 4.3A10.7 10.7 0 0112 4c5.5 0 9 5.5 9 5.5a15 15 0 01-2.1 2.6M6.6 6.6C4.4 8 3 9.5 3 9.5S6.5 15 12 15c1.2 0 2.3-.3 3.2-.7" />
      </>
    ) : (
      <>
        <path d="M3 12s3.5-5.5 9-5.5 9 5.5 9 5.5-3.5 5.5-9 5.5S3 12 3 12z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    )}
  </svg>
);

const LoginContent = ({ isAdmin }: { isAdmin: boolean }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/auth/${isAdmin ? "admin" : "donor"}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      push(isAdmin ? "/admin/dashboard" : "/find-egg-donor");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.brandPanel} aria-label="Happy Family">
        <div className={styles.desktopHeader}>
          <Link href="/" className={styles.logoLink} aria-label="Happy Family home">
            <span className={styles.logoFrame}>
              <Image src="/img/logo.webp" alt="" width={64} height={64} priority />
            </span>
            <span className={styles.brandName}>Happy Family</span>
          </Link>

          <Link href="/en" className={styles.backLink}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 12H5M10 7l-5 5 5 5" />
            </svg>
            Back to website
          </Link>
        </div>

        <div className={styles.brandContent}>
          <p className={styles.eyebrow}>A trusted path to parenthood</p>
          <h1>Every family begins with a little hope.</h1>
          <p>
            Your secure space for donor information, thoughtfully designed to
            support the next step in your journey.
          </p>
        </div>

        <div className={styles.reassurance}>
          <span className={styles.shield} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 3l7 3v5c0 4.6-2.9 8.3-7 10-4.1-1.7-7-5.4-7-10V6l7-3z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </span>
          <span>
            <strong>Private and secure</strong>
            Your information is protected at every step.
          </span>
        </div>
      </section>

      <section className={styles.formPanel}>
        <div className={styles.mobileHeader}>
          <Link href="/" className={styles.mobileBrand} aria-label="Happy Family home">
            <Image src="/img/logo.webp" alt="" width={48} height={48} priority />
            <span>Happy Family</span>
          </Link>

          <Link href="/en" className={styles.mobileBackLink}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 12H5M10 7l-5 5 5 5" />
            </svg>
            Back
          </Link>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.heading}>
            <span className={styles.roleBadge}>
              {isAdmin ? "Administration" : "Donor portal"}
            </span>
            <h2>{isAdmin ? "Welcome back" : "Access donor profiles"}</h2>
            <p>
              {isAdmin
                ? "Sign in to manage Happy Family content and profiles."
                : "Enter the access details provided by our team."}
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="username">Username</label>
              <div className={styles.inputWrap}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20c.5-4 3-6 7-6s6.5 2 7 6" />
                </svg>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrap}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="5" y="10" width="14" height="10" rx="2" />
                  <path d="M8.5 10V7.5a3.5 3.5 0 017 0V10" />
                </svg>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.visibilityButton}
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  disabled={loading}
                >
                  <EyeIcon hidden={showPassword} />
                </button>
              </div>
            </div>

            {error && (
              <div className={styles.error} role="alert">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7.5v5M12 16.5h.01" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button id="login-button" type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? (
                <><span className={styles.spinner} aria-hidden="true" />Signing in…</>
              ) : (
                <>Sign in securely<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg></>
              )}
            </button>
          </form>

          <p className={styles.helpText}>
            Need help accessing your account? <Link href="/en#contact">Contact our team</Link>
          </p>

          <div className={styles.mobileSecurity}>
            <span className={styles.securityDot} />
            Secure, encrypted access
          </div>
        </div>

        <p className={styles.copyright}>© {new Date().getFullYear()} Happy Family. All rights reserved.</p>
      </section>
    </main>
  );
};

const Login = ({ isAdmin }: { isAdmin: boolean }) => (
  <Suspense fallback={<div className={styles.loadingPage}>Loading secure access…</div>}>
    <LoginContent isAdmin={isAdmin} />
  </Suspense>
);

export default Login;
