import styles from "@/styles/Navigation/Navigation.module.css";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Button from "@/components/Button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationConfig } from "@/config/navigationConfig";

const NavigationList = ({ isMobile }: { isMobile?: boolean }) => {
  const { t } = useTranslation();
  const location = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => setOpenSubmenu(null), [location]);

  const menuItems = navigationConfig(t);

  const toggleSubmenu = (key: string) => {
    console.log("toggleSubmenu", key);
    setOpenSubmenu((prev) => (prev === key ? null : key));
  };

  return (
    <>
      <ul
        className={`${styles.navigationList} ${
          isMobile ? styles.mobileNav : ""
        }`}
      >
        {menuItems.map((item) => (
          <li
            key={item.key}
            className={`${styles.navigationItem} ${
              isMobile ? styles.mobileNavItem : styles.desktopNavItem
            } ${openSubmenu === item.key ? styles.active : ""}`}
            onClick={
              isMobile && item.submenu
                ? () => toggleSubmenu(item.key)
                : undefined
            }
          >
            <div className={styles.menuItem}>
              {item.href ? (
                <Link
                  href={item.href}
                  className={`${styles.menuButton} ${
                    isMobile ? styles.mobileMenuButton : ""
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  type="button"
                  className={`${styles.menuButton} ${
                    isMobile ? styles.mobileMenuButton : ""
                  }`}
                >
                  {item.label}
                </button>
              )}
              {item.submenu &&
                (isMobile && openSubmenu === item.key ? (
                  <IoIosArrowDown size={18} className={styles.arrowIcon} />
                ) : (
                  isMobile && (
                    <IoIosArrowForward size={18} className={styles.arrowIcon} />
                  )
                ))}
            </div>

            {item.submenu && (
              <ul
                className={`${styles.submenu} ${
                  isMobile ? styles.mobileSubmenu : ""
                } ${openSubmenu === item.key ? styles.active : ""}`}
              >
                {item.submenu.map((sub) => (
                  <li key={sub.href}>
                    <Link href={sub.href}>{sub.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        {isMobile && (
          <div className={styles.languageSwitcherContainer}>
            <p className={styles.languageSwitcherText}>Language:</p>
            <LanguageSwitcher isMobile={true} />
          </div>
        )}
      </ul>

      <div className={styles.contactUsContainer}>
        <Button
          href="/find-egg-donor"
          className={isMobile ? styles.mobileButton : ""}
        >
          {t("navigation.findDonors")}
        </Button>
        {!isMobile && <LanguageSwitcher />}
      </div>
    </>
  );
};

export default NavigationList;
