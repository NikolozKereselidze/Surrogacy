import styles from "../styles/Navigation.module.css";
import { IoIosArrowDown } from "react-icons/io";
import Button from "./Button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { t, i18n } = useTranslation();

  // Set RTL for Hebrew
  const isRTL = i18n.language === "he";
  const langPrefix = `/${i18n.language}`;

  return (
    <nav className={styles.navigation} dir={isRTL ? "rtl" : "ltr"}>
      <div className={styles.logoContainer}>
        <a href={langPrefix + "/"} className={styles.logo}>
          Miracle Makers
        </a>
      </div>
      <ul className={styles.navigationList}>
        <li className={styles.navigationItem}>
          <a>{t("navigation.aboutUs")}</a>
          <IoIosArrowDown size={18} className={styles.arrowIcon} />
          <ul className={styles.submenu}>
            <li>
              <a href={langPrefix + "/our-mission"}>
                {t("submenu.aboutUs.ourMission")}
              </a>
            </li>
            <li>
              <a href={langPrefix + "/who-we-are"}>
                {t("submenu.aboutUs.whoWeAre")}
              </a>
            </li>
            <li>
              <a href={langPrefix + "/our-team"}>
                {t("submenu.aboutUs.ourTeam")}
              </a>
            </li>
            <li>
              <a href={langPrefix + "/why-choose-us"}>
                {t("submenu.aboutUs.whyChooseUs")}
              </a>
            </li>
          </ul>
        </li>
        <li className={styles.navigationItem}>
          <a>{t("navigation.surrogates")}</a>
          <IoIosArrowDown size={18} className={styles.arrowIcon} />
          <ul className={styles.submenu}>
            <li>
              <a href={langPrefix + "/surrogacy-process"}>
                {t("submenu.surrogates.surrogacyProcess")}
              </a>
            </li>
            <li>
              <a href={langPrefix + "/who-can-become-a-surrogate"}>
                {t("submenu.surrogates.whoCanBecome")}
              </a>
            </li>
            <li>
              <a href={langPrefix + "/surrogate-screening"}>
                {t("submenu.surrogates.screeningProcess")}
              </a>
            </li>
            <button className={styles.applyButton}>
              {t("submenu.surrogates.applyNow")}
            </button>
          </ul>
        </li>
        <li className={styles.navigationItem}>
          <a>{t("navigation.intendedParents")}</a>
          <IoIosArrowDown size={18} className={styles.arrowIcon} />
          <ul className={styles.submenu}>
            <li>
              <a href={langPrefix + "/who-can-become-a-parent"}>
                {t("submenu.intendedParents.whoCanBecome")}
              </a>
            </li>
            <li>
              <a href={langPrefix + "/parent-screening"}>
                {t("submenu.intendedParents.screeningProcess")}
              </a>
            </li>
            <li>
              <a href={langPrefix + "/support-and-counselling"}>
                {t("submenu.intendedParents.compensationSupport")}
              </a>
            </li>
            <button className={styles.applyButton}>
              {t("submenu.intendedParents.applyNow")}
            </button>
          </ul>
        </li>
        <li className={styles.navigationItem}>
          <a>{t("navigation.eggDonors")}</a>
          <IoIosArrowDown size={18} className={styles.arrowIcon} />
          <ul className={styles.submenu}>
            <li>
              <a href={langPrefix + "/why-become-a-donor"}>
                {t("submenu.eggDonors.whyBecome")}
              </a>
            </li>
            <li>
              <a href={langPrefix + "/who-can-become-a-donor"}>
                {t("submenu.eggDonors.whoCanApply")}
              </a>
            </li>
            <li>
              <a href={langPrefix + "/find-egg-donor"}>
                {t("submenu.eggDonors.findDonor")}
              </a>
            </li>
            <button className={styles.applyButton}>
              {t("submenu.eggDonors.applyNow")}
            </button>
          </ul>
        </li>
        <li className={styles.navigationItem}>
          <a>{t("navigation.programs")}</a>
          <IoIosArrowDown size={18} className={styles.arrowIcon} />
          <ul className={styles.submenu}>
            <li>
              <a href={langPrefix + "/surrogacy-with-own-gametes"}>
                {t("submenu.programs.ownGametes")}
              </a>
            </li>
            <li>
              <a href={langPrefix + "/surrogacy-with-egg-donor"}>
                {t("submenu.programs.eggDonor")}
              </a>
            </li>
            <li>
              <a href={langPrefix + "/egg-freezing-preservation"}>
                {t("submenu.programs.eggFreezing")}
              </a>
            </li>
            <li>
              <a href={langPrefix + "/vip-concierge-services"}>
                {t("submenu.programs.vipServices")}
              </a>
            </li>
          </ul>
        </li>
        <li className={styles.navigationItem}>
          <a>{t("navigation.blog")}</a>
        </li>
      </ul>
      <div className={styles.contactUsContainer}>
        <Button>{t("navigation.contactUs")}</Button>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navigation;
