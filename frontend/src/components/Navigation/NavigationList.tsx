import styles from "../../styles/Navigation.module.css";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Button from "../Button";
import LanguageSwitcher from "../LanguageSwitcher";
import { useState } from "react";

const NavigationList = ({ isMobile }: { isMobile?: boolean }) => {
  const { t } = useTranslation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

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
          onClick={clickHandler}
        >
          <div className={styles.menuItem}>
            <a>{t("navigation.aboutUs")}</a>
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
              <a href="/our-mission">{t("submenu.aboutUs.ourMission")}</a>
            </li>
            <li>
              <a href="/who-we-are">{t("submenu.aboutUs.whoWeAre")}</a>
            </li>
            <li>
              <a href="/our-team">{t("submenu.aboutUs.ourTeam")}</a>
            </li>
            <li>
              <a href="/why-choose-us">{t("submenu.aboutUs.whyChooseUs")}</a>
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
            <a>{t("navigation.surrogates")}</a>
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
              <a href="/surrogacy-process">
                {t("submenu.surrogates.surrogacyProcess")}
              </a>
            </li>
            <li>
              <a href="/who-can-become-a-surrogate">
                {t("submenu.surrogates.whoCanBecome")}
              </a>
            </li>
            <li>
              <a href="/surrogate-screening">
                {t("submenu.surrogates.screeningProcess")}
              </a>
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
            <a>{t("navigation.intendedParents")}</a>
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
              <a href="/who-can-become-a-parent">
                {t("submenu.intendedParents.whoCanBecome")}
              </a>
            </li>
            <li>
              <a href="/parent-screening">
                {t("submenu.intendedParents.screeningProcess")}
              </a>
            </li>
            <li>
              <a href="/support-and-counselling">
                {t("submenu.intendedParents.compensationSupport")}
              </a>
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
            <a>{t("navigation.eggDonors")}</a>
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
              <a href="/why-become-a-donor">
                {t("submenu.eggDonors.whyBecome")}
              </a>
            </li>
            <li>
              <a href="/who-can-become-a-donor">
                {t("submenu.eggDonors.whoCanApply")}
              </a>
            </li>
            <li>
              <a href="/find-egg-donor">{t("submenu.eggDonors.findDonor")}</a>
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
            <a>{t("navigation.programs")}</a>
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
              <a href="/surrogacy-with-own-gametes">
                {t("submenu.programs.ownGametes")}
              </a>
            </li>
            <li>
              <a href="/surrogacy-with-egg-donor">
                {t("submenu.programs.eggDonor")}
              </a>
            </li>
            <li>
              <a href="/egg-freezing-preservation">
                {t("submenu.programs.eggFreezing")}
              </a>
            </li>
            <li>
              <a href="/vip-concierge-services">
                {t("submenu.programs.vipServices")}
              </a>
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
