"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "@/styles/Navigation/DonorsNavigation.module.css";

const directoryLinks = [
  { label: "Egg donors", href: "/find-egg-donor", profilePrefix: "/egg-donors" },
  { label: "Surrogates", href: "/find-surrogate-donor", profilePrefix: "/surrogate-donors" },
  { label: "Sperm donors", href: "/find-sperm-donor", profilePrefix: "/sperm-donors" },
];

export default function DonorsNavigation() {
  const [signingOut, setSigningOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await fetch("/api/auth/donor/logout", { method: "POST" });
    } finally {
      router.replace("/login");
      router.refresh();
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navigation} aria-label="Private profile directory">
        <Link href="/find-egg-donor" className={styles.brand} aria-label="Happy Family private profiles">
          <Image src="/img/navbar-logo.webp" alt="Happy Family" width={181} height={60} priority />
          <small>Private profiles</small>
        </Link>

        <div className={styles.directoryLinks}>
          {directoryLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.profilePrefix}/`);
            return (
              <Link key={link.href} href={link.href} className={active ? styles.activeLink : undefined} aria-current={active ? "page" : undefined}>
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className={styles.accountActions}>
          <span className={styles.secureLabel}><i aria-hidden="true" /> Secure access</span>
          <button type="button" onClick={handleSignOut} disabled={signingOut}>
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </nav>
    </header>
  );
}
