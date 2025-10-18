"use client";

import { useRouter, usePathname } from "next/navigation";
import styles from "@/styles/Admin/AdminDashboard.module.css";
import { FaBlog, FaUserPlus, FaUser, FaSignOutAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdFamilyRestroom } from "react-icons/md";

const sections = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <IoMdHome />,
  },
  { key: "blog", label: "Blog Posts", path: "/admin/blog", icon: <FaBlog /> },
  {
    key: "egg",
    label: "Egg Donors",
    path: "/admin/egg-donors",
    icon: <FaUser />,
  },
  {
    key: "surrogates",
    label: "Surrogates",
    path: "/admin/surrogates",
    icon: <MdFamilyRestroom />,
  },
  {
    key: "sperm",
    label: "Sperm Donors",
    path: "/admin/sperm-donors",
    icon: <FaUserPlus />,
  },
];

const AdminNav = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin-auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/admin-login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, redirect to login page
      router.push("/admin-login");
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTitle}>
          <span className={styles.sidebarTitleSpan}>Miracle</span> Makers
        </div>
        <div className={styles.sidebarLinks}>
          <ul className={styles.navList}>
            {sections.map((section) => (
              <li
                key={section.key}
                className={
                  pathname === section.path
                    ? `${styles.navItem} ${styles.active}`
                    : styles.navItem
                }
                onClick={() => router.push(section.path)}
              >
                <span className={styles.navItemIcon}>{section.icon}</span>
                <span className={styles.navItemLabel}>{section.label}</span>
              </li>
            ))}
            <li className={styles.navItem} onClick={handleLogout}>
              <span className={styles.navItemIcon}>
                <FaSignOutAlt />
              </span>
              <span className={styles.navItemLabel}>Logout</span>
            </li>
          </ul>
        </div>
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export default AdminNav;
