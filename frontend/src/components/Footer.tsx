import styles from "../styles/Footer.module.css";
import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinksGrid}>
          <div>
            <h4>{t("navigation.aboutUs")}</h4>
            <ul>
              <li>
                <a href="/our-mission">{t("submenu.aboutUs.ourMission")}</a>
              </li>
              <li>
                <a href="/who-we-are">{t("submenu.aboutUs.whoWeAre")}</a>
              </li>
              <li>
                <a href="/our-team  ">{t("submenu.aboutUs.ourTeam")}</a>
              </li>
              <li>
                <a href="/why-choose-us">{t("submenu.aboutUs.whyChooseUs")}</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>{t("navigation.surrogates")}</h4>
            <ul>
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
                <a href="/screening-process">
                  {t("submenu.surrogates.screeningProcess")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>{t("navigation.intendedParents")}</h4>
            <ul>
              <li>
                <a href="/who-can-become-an-intended-parent">
                  {t("submenu.intendedParents.whoCanBecome")}
                </a>
              </li>
              <li>
                <a href="/screening-process">
                  {t("submenu.intendedParents.screeningProcess")}
                </a>
              </li>
              <li>
                <a href="/compensation-support">
                  {t("submenu.intendedParents.compensationSupport")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>{t("navigation.eggDonors")}</h4>
            <ul>
              <li>
                <a href="/why-become-an-egg-donor">
                  {t("submenu.eggDonors.whyBecome")}
                </a>
              </li>
              <li>
                <a href="/who-can-apply-to-be-an-egg-donor">
                  {t("submenu.eggDonors.whoCanApply")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>{t("navigation.programs")}</h4>
            <ul>
              <li>
                <a href="/own-gametes">{t("submenu.programs.ownGametes")}</a>
              </li>
              <li>
                <a href="/egg-donor">{t("submenu.programs.eggDonor")}</a>
              </li>
              <li>
                <a href="/egg-freezing">{t("submenu.programs.eggFreezing")}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.socials}>
          <div className={styles.logo}>
            <h3>Miracle Makers</h3>
          </div>
          <div className={styles.socialsIcons}>
            <a
              className={styles.facebookIcon}
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              className={styles.instagramIcon}
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              className={styles.whatsappIcon}
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a
              className={styles.linkedinIcon}
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className={styles.copyright}>
          <div className={styles.copyrightLinks}>
            <a href="#">{t("footer.privacyPolicy")}</a>
            <a href="#">{t("footer.termsOfService")}</a>
          </div>
          <div className={styles.copyrightText}>
            <p>
              &copy; {new Date().getFullYear()} Miracle Makers.{" "}
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
