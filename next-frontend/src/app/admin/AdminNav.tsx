"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBlog, FaSignOutAlt, FaUser, FaUserPlus, FaUsers } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdFamilyRestroom } from "react-icons/md";
import styles from "@/styles/Admin/AdminDashboard.module.css";

const sections = [
  { key: "dashboard", label: "Dashboard", path: "/admin/dashboard", icon: <IoMdHome /> },
  { key: "blog", label: "Blog posts", path: "/admin/blog", icon: <FaBlog /> },
  { key: "team", label: "Team members", path: "/admin/team", icon: <FaUsers /> },
  { key: "egg", label: "Egg donors", path: "/admin/egg-donors", icon: <FaUser /> },
  { key: "surrogates", label: "Surrogates", path: "/admin/surrogates", icon: <MdFamilyRestroom /> },
  { key: "sperm", label: "Sperm donors", path: "/admin/sperm-donors", icon: <FaUserPlus /> },
];

export default function AdminNav({ children }: { children: React.ReactNode }) {
  const [signingOut, setSigningOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await fetch("/api/auth/admin/logout", { method: "POST" });
    } finally {
      router.replace("/login/admin");
      router.refresh();
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <Link href="/admin/dashboard" className={styles.adminBrand} aria-label="Happy Family admin dashboard">
          <Image src="/img/navbar-logo.webp" alt="Happy Family" width={181} height={60} priority />
          <span>Admin workspace</span>
        </Link>

        <nav className={styles.sidebarLinks} aria-label="Administration">
          <p className={styles.navSectionLabel}>Manage</p>
          <ul className={styles.navList}>
            {sections.map((section) => {
              const active = pathname === section.path;
              return (
                <li key={section.key}>
                  <Link className={`${styles.navItem} ${active ? styles.active : ""}`} href={section.path} aria-current={active ? "page" : undefined}>
                    <span className={styles.navItemIcon}>{section.icon}</span>
                    <span className={styles.navItemLabel}>{section.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.adminAccount}>
          <div className={styles.adminAvatar}>A</div>
          <span><strong>Administrator</strong><small>Secure session</small></span>
          <button type="button" onClick={handleLogout} disabled={signingOut} title="Sign out" aria-label="Sign out"><FaSignOutAlt /></button>
        </div>
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
