import styles from "../../styles/Navigation.module.css";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Button from "../Button";
import LanguageSwitcher from "../LanguageSwitcher";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavigationList = ({ isMobile }: { isMobile?: boolean }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Close submenu when route changes
  useEffect(() => {
    setOpenSubmenu(null);
  }, [location.pathname]);

  const clickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();

    const target = e.currentTarget;
    const submenu = target.querySelector(`.${styles.submenu}`);

    if (submenu) {
      const menuText = target.querySelector("a")?.textContent;
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
          onClick={isMobile ? clickHandler : undefined}
        >
          <div className={styles.menuItem}>
            <a>{t("navigation.aboutUs")}</a>
            {isMobile && openSubmenu === t("navigation.aboutUs") ? (
              <IoIosArrowDown size={18} className={styles.arrowIcon} />
            ) : (
              <IoIosArrowForward size={18} className={styles.arrowIcon} />
            )}
          </div>
          <ul
            className={`${styles.submenu} ${
              isMobile ? styles.mobileSubmenu : ""
            } ${openSubmenu === t("navigation.aboutUs") ? styles.active : ""}`}
          >
            <li>
              <NavLink to="/our-mission">
                {t("submenu.aboutUs.ourMission")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/who-we-are">
                {t("submenu.aboutUs.whoWeAre")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/our-team">{t("submenu.aboutUs.ourTeam")}</NavLink>
            </li>
            <li>
              <NavLink to="/why-choose-us">
                {t("submenu.aboutUs.whyChooseUs")}
              </NavLink>
            </li>
          </ul>
        </li>
        <li
          className={`${styles.navigationItem} ${
            isMobile ? styles.mobileNavItem : styles.desktopNavItem
          } ${openSubmenu === t("navigation.surrogates") ? styles.active : ""}`}
          onClick={isMobile ? clickHandler : undefined}
        >
          <div className={styles.menuItem}>
            <a>{t("navigation.surrogates")}</a>
            {isMobile && openSubmenu === t("navigation.surrogates") ? (
              <IoIosArrowDown size={18} className={styles.arrowIcon} />
            ) : (
              <IoIosArrowForward size={18} className={styles.arrowIcon} />
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
              <NavLink to="/surrogacy-process">
                {t("submenu.surrogates.surrogacyProcess")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/who-can-become-a-surrogate">
                {t("submenu.surrogates.whoCanBecome")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/surrogate-screening">
                {t("submenu.surrogates.screeningProcess")}
              </NavLink>
            </li>
          </ul>
        </li>
        <li
          className={`${styles.navigationItem} ${
            isMobile ? styles.mobileNavItem : styles.desktopNavItem
          } ${
            openSubmenu === t("navigation.intendedParents") ? styles.active : ""
          }`}
          onClick={isMobile ? clickHandler : undefined}
        >
          <div className={styles.menuItem}>
            <a>{t("navigation.intendedParents")}</a>
            {isMobile && openSubmenu === t("navigation.intendedParents") ? (
              <IoIosArrowDown size={18} className={styles.arrowIcon} />
            ) : (
              <IoIosArrowForward size={18} className={styles.arrowIcon} />
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
              <NavLink to="/who-can-become-a-parent">
                {t("submenu.intendedParents.whoCanBecome")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/parent-screening">
                {t("submenu.intendedParents.screeningProcess")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/support-and-counselling">
                {t("submenu.intendedParents.compensationSupport")}
              </NavLink>
            </li>
          </ul>
        </li>
        <li
          className={`${styles.navigationItem} ${
            isMobile ? styles.mobileNavItem : styles.desktopNavItem
          } ${openSubmenu === t("navigation.eggDonors") ? styles.active : ""}`}
          onClick={isMobile ? clickHandler : undefined}
        >
          <div className={styles.menuItem}>
            <a>{t("navigation.eggDonors")}</a>
            {isMobile && openSubmenu === t("navigation.eggDonors") ? (
              <IoIosArrowDown size={18} className={styles.arrowIcon} />
            ) : (
              <IoIosArrowForward size={18} className={styles.arrowIcon} />
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
              <NavLink to="/why-become-a-donor">
                {t("submenu.eggDonors.whyBecome")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/who-can-become-a-donor">
                {t("submenu.eggDonors.whoCanApply")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/find-egg-donor">
                {t("submenu.eggDonors.findDonor")}
              </NavLink>
            </li>
          </ul>
        </li>
        <li
          className={`${styles.navigationItem} ${
            isMobile ? styles.mobileNavItem : styles.desktopNavItem
          } ${openSubmenu === t("navigation.programs") ? styles.active : ""}`}
          onClick={isMobile ? clickHandler : undefined}
        >
          <div className={styles.menuItem}>
            <a>{t("navigation.programs")}</a>
            {isMobile && openSubmenu === t("navigation.programs") ? (
              <IoIosArrowDown size={18} className={styles.arrowIcon} />
            ) : (
              <IoIosArrowForward size={18} className={styles.arrowIcon} />
            )}
          </div>
          <ul
            className={`${styles.submenu} ${
              isMobile ? styles.mobileSubmenu : ""
            } ${openSubmenu === t("navigation.programs") ? styles.active : ""}`}
          >
            <li>
              <NavLink to="/surrogacy-with-own-gametes">
                {t("submenu.programs.ownGametes")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/surrogacy-with-egg-donor">
                {t("submenu.programs.eggDonor")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/egg-freezing-preservation">
                {t("submenu.programs.eggFreezing")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/vip-concierge-services">
                {t("submenu.programs.vipServices")}
              </NavLink>
            </li>
          </ul>
        </li>
        <li
          className={`${styles.navigationItem} ${
            isMobile ? styles.mobileNavItem : styles.desktopNavItem
          }`}
          onClick={clickHandler}
        >
          <a>{t("navigation.blog")}</a>
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
