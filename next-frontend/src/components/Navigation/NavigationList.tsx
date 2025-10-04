import styles from "@/styles/Navigation/Navigation.module.css";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Button from "@/components/Button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationList = ({ isMobile }: { isMobile?: boolean }) => {
  const { t } = useTranslation();
  const location = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Close submenu when route changes
  useEffect(() => {
    setOpenSubmenu(null);
  }, [location]);

  const clickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();

    const target = e.currentTarget;
    const submenu = target.querySelector(`.${styles.submenu}`);

    if (submenu) {
      const menuText = target.querySelector("button")?.textContent;
      if (openSubmenu === menuText) {
        setOpenSubmenu(null);
      } else {
        setOpenSubmenu(menuText || null);
      }
    }
  };

  return (
    <>
      <ul
        className={`${styles.navigationList} ${
          isMobile ? styles.mobileNav : ""
        }`}
      >
        <li
          className={`${styles.navigationItem} ${
            isMobile ? styles.mobileNavItem : styles.desktopNavItem
          } ${openSubmenu === t("navigation.aboutUs") ? styles.active : ""}`}
          onClick={clickHandler}
        >
          <div className={styles.menuItem}>
            <button type="button" className={styles.menuButton}>
              {t("navigation.aboutUs")}
            </button>
            {isMobile && openSubmenu === t("navigation.aboutUs") ? (
              <IoIosArrowUp size={18} className={styles.arrowIcon} />
            ) : (
              <IoIosArrowDown size={18} className={styles.arrowIcon} />
            )}
          </div>
          <ul
            className={`${styles.submenu} ${
              isMobile ? styles.mobileSubmenu : ""
            } ${openSubmenu === t("navigation.aboutUs") ? styles.active : ""}`}
          >
            <li>
              <Link href="/our-mission">{t("submenu.aboutUs.ourMission")}</Link>
            </li>
            <li>
              <Link href="/who-we-are">{t("submenu.aboutUs.whoWeAre")}</Link>
            </li>
            <li>
              <Link href="/our-team">{t("submenu.aboutUs.ourTeam")}</Link>
            </li>
            <li>
              <Link href="/why-choose-us">
                {t("submenu.aboutUs.whyChooseUs")}
              </Link>
            </li>
          </ul>
        </li>
        <li
          className={`${styles.navigationItem} ${
            isMobile ? styles.mobileNavItem : styles.desktopNavItem
          } ${openSubmenu === t("navigation.surrogates") ? styles.active : ""}`}
          onClick={clickHandler}
        >
          <div className={styles.menuItem}>
            <button type="button" className={styles.menuButton}>
              {t("navigation.surrogates")}
            </button>
            {isMobile && openSubmenu === t("navigation.surrogates") ? (
              <IoIosArrowUp size={18} className={styles.arrowIcon} />
            ) : (
              <IoIosArrowDown size={18} className={styles.arrowIcon} />
            )}
          </div>
          <ul
            className={`${styles.submenu} ${
              isMobile ? styles.mobileSubmenu : ""
            } ${
              openSubmenu === t("navigation.surrogates") ? styles.active : ""
            }`}
          >
            <li>
              <Link href="/surrogacy-process">
                {t("submenu.surrogates.surrogacyProcess")}
              </Link>
            </li>
            <li>
              <Link href="/who-can-become-a-surrogate">
                {t("submenu.surrogates.whoCanBecome")}
              </Link>
            </li>
            <li>
              <Link href="/surrogate-screening">
                {t("submenu.surrogates.screeningProcess")}
              </Link>
            </li>
          </ul>
        </li>
        <li
          className={`${styles.navigationItem} ${
            isMobile ? styles.mobileNavItem : styles.desktopNavItem
          } ${
            openSubmenu === t("navigation.intendedParents") ? styles.active : ""
          }`}
          onClick={clickHandler}
        >
          <div className={styles.menuItem}>
            <button type="button" className={styles.menuButton}>
              {t("navigation.intendedParents")}
            </button>
            {isMobile && openSubmenu === t("navigation.intendedParents") ? (
              <IoIosArrowUp size={18} className={styles.arrowIcon} />
            ) : (
              <IoIosArrowDown size={18} className={styles.arrowIcon} />
            )}
          </div>
          <ul
            className={`${styles.submenu} ${
              isMobile ? styles.mobileSubmenu : ""
            } ${
              openSubmenu === t("navigation.intendedParents")
                ? styles.active
                : ""
            }`}
          >
            <li>
              <Link href="/who-can-become-a-parent">
                {t("submenu.intendedParents.whoCanBecome")}
              </Link>
            </li>
            <li>
              <Link href="/parent-screening">
                {t("submenu.intendedParents.screeningProcess")}
              </Link>
            </li>
            <li>
              <Link href="/support-and-counselling">
                {t("submenu.intendedParents.compensationSupport")}
              </Link>
            </li>
          </ul>
        </li>
        <li
          className={`${styles.navigationItem} ${
            isMobile ? styles.mobileNavItem : styles.desktopNavItem
          } ${openSubmenu === t("navigation.eggDonors") ? styles.active : ""}`}
          onClick={clickHandler}
        >
          <div className={styles.menuItem}>
            <button type="button" className={styles.menuButton}>
              {t("navigation.eggDonors")}
            </button>
            {isMobile && openSubmenu === t("navigation.eggDonors") ? (
              <IoIosArrowUp size={18} className={styles.arrowIcon} />
            ) : (
              <IoIosArrowDown size={18} className={styles.arrowIcon} />
            )}
          </div>
          <ul
            className={`${styles.submenu} ${
              isMobile ? styles.mobileSubmenu : ""
            } ${
              openSubmenu === t("navigation.eggDonors") ? styles.active : ""
            } `}
          >
            <li>
              <Link href="/why-become-a-donor">
                {t("submenu.eggDonors.whyBecome")}
              </Link>
            </li>
            <li>
              <Link href="/who-can-become-a-donor">
                {t("submenu.eggDonors.whoCanApply")}
              </Link>
            </li>
            <li>
              <Link href="/find-egg-donor">
                {t("submenu.eggDonors.findDonor")}
              </Link>
            </li>
          </ul>
        </li>
        <li
          className={`${styles.navigationItem} ${
            isMobile ? styles.mobileNavItem : styles.desktopNavItem
          } ${openSubmenu === t("navigation.programs") ? styles.active : ""}`}
          onClick={clickHandler}
        >
          <div className={styles.menuItem}>
            <button type="button" className={styles.menuButton}>
              {t("navigation.programs")}
            </button>
            {isMobile && openSubmenu === t("navigation.programs") ? (
              <IoIosArrowUp size={18} className={styles.arrowIcon} />
            ) : (
              <IoIosArrowDown size={18} className={styles.arrowIcon} />
            )}
          </div>
          <ul
            className={`${styles.submenu} ${
              isMobile ? styles.mobileSubmenu : ""
            } ${openSubmenu === t("navigation.programs") ? styles.active : ""}`}
          >
            <li>
              <Link href="/surrogacy-with-own-gametes">
                {t("submenu.programs.ownGametes")}
              </Link>
            </li>
            <li>
              <Link href="/surrogacy-with-egg-donor">
                {t("submenu.programs.eggDonor")}
              </Link>
            </li>
            <li>
              <Link href="/egg-freezing-preservation">
                {t("submenu.programs.eggFreezing")}
              </Link>
            </li>
            <li>
              <Link href="/vip-concierge-services">
                {t("submenu.programs.vipServices")}
              </Link>
            </li>
          </ul>
        </li>
        <li
          className={`${styles.navigationItem} ${
            isMobile ? styles.mobileNavItem : styles.desktopNavItem
          }`}
        >
          <Link href="/blog" className={styles.menuButton}>
            {t("navigation.blog")}
          </Link>
        </li>
      </ul>

      <div className={styles.contactUsContainer}>
        <Button>{t("navigation.contactUs")}</Button>
        {!isMobile && <LanguageSwitcher />}
      </div>
    </>
  );
};

export default NavigationList;
