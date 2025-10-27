import styles from "@/styles/Navigation/NavigationList.module.css";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Button from "@/components/Button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationConfig } from "@/config/navigationConfig";
import { useLocale } from "@/hooks/useLocale";

const NavigationList = ({
  isMobile,
  onLinkClick,
}: {
  isMobile?: boolean;
  onLinkClick?: () => void;
}) => {
  const { t } = useTranslation();
  const location = usePathname();
  const locale = useLocale();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => setOpenSubmenu(null), [location]);

  const menuItems = navigationConfig(t);

  const toggleSubmenu = (key: string) => {
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
                  href={`/${locale}${item.href}`}
                  className={`${styles.menuButton} ${
                    isMobile ? styles.mobileMenuButton : ""
                  }`}
                  onClick={isMobile ? onLinkClick : undefined}
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
                    <Link
                      href={`/${locale}${sub.href}`}
                      onClick={isMobile ? onLinkClick : undefined}
                    >
                      {sub.label}
                    </Link>
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
