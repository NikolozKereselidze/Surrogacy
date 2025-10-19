import Link from "next/link";
import styles from "@/styles/NotFound/not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.description}>
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className={styles.actions}>
          <Link href="/en" className={styles.button}>
            Go Home
          </Link>
          <Link href="/en/contact" className={styles.buttonSecondary}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
