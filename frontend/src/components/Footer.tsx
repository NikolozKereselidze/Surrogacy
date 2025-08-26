import styles from "../styles/Footer.module.css";
import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const langPrefix = `/${i18n.language}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinksGrid}>
          <div>
            <h4>{t("navigation.aboutUs")}</h4>
            <ul>
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
                <a href={langPrefix + "/our-team  "}>
                  {t("submenu.aboutUs.ourTeam")}
                </a>
              </li>
              <li>
                <a href={langPrefix + "/why-choose-us"}>
                  {t("submenu.aboutUs.whyChooseUs")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>{t("navigation.surrogates")}</h4>
            <ul>
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
            </ul>
          </div>
          <div>
            <h4>{t("navigation.intendedParents")}</h4>
            <ul>
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
            </ul>
          </div>
          <div>
            <h4>{t("navigation.eggDonors")}</h4>
            <ul>
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
            </ul>
          </div>
          <div>
            <h4>{t("navigation.programs")}</h4>
            <ul>
              <li>
                <a href={langPrefix + "/own-gametes"}>
                  {t("submenu.programs.ownGametes")}
                </a>
              </li>
              <li>
                <a href={langPrefix + "/egg-donor"}>
                  {t("submenu.programs.eggDonor")}
                </a>
              </li>
              <li>
                <a href={langPrefix + "/egg-freezing"}>
                  {t("submenu.programs.eggFreezing")}
                </a>
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
              aria-label="Facebook"
              href="https://www.facebook.com/share/15bgwdnhbw/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              className={styles.instagramIcon}
              aria-label="Instagram"
              href="https://www.instagram.com/surrogacy_center_happy_family/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              className={styles.whatsappIcon}
              aria-label="WhatsApp"
              href="https://wa.me/19298775515?text=Hi%2C%20I%27d%20like%20to%20know%20more"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a
              className={styles.linkedinIcon}
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/happy-family-georgia?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
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
