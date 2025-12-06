"use client";

import styles from "../styles/Footer.module.css";
import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";

const Footer = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Top Section: Brand & Newsletter */}
        <div className={styles.topSection}>
          <div className={styles.brandColumn}>
            <div className={styles.logo}>
              <h3>Miracle Makers</h3>
            </div>
            <p className={styles.brandDescription}>
              Helping intended parents and surrogates create miracles together.
              We are dedicated to providing ethical, transparent, and supportive
              surrogacy journeys.
            </p>
          </div>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className={styles.linksGrid}>
          <div className={styles.linksColumn}>
            <h4>{t("navigation.aboutUs")}</h4>
            <ul>
              <li>
                <Link href={`/${locale}/our-mission`}>
                  {t("submenu.aboutUs.ourMission")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/who-we-are`}>
                  {t("submenu.aboutUs.whoWeAre")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/our-team`}>
                  {t("submenu.aboutUs.ourTeam")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/why-choose-us`}>
                  {t("submenu.aboutUs.whyChooseUs")}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h4>{t("navigation.surrogates")}</h4>
            <ul>
              <li>
                <Link href={`/${locale}/surrogacy-process`}>
                  {t("submenu.surrogates.surrogacyProcess")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/who-can-become-a-surrogate`}>
                  {t("submenu.surrogates.whoCanBecome")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/surrogate-screening`}>
                  {t("submenu.surrogates.screeningProcess")}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h4>{t("navigation.intendedParents")}</h4>
            <ul>
              <li>
                <Link href={`/${locale}/who-can-become-a-parent`}>
                  {t("submenu.intendedParents.whoCanBecome")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/parent-screening`}>
                  {t("submenu.intendedParents.screeningProcess")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/support-and-counselling`}>
                  {t("submenu.intendedParents.compensationSupport")}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h4>{t("navigation.eggDonors")}</h4>
            <ul>
              <li>
                <Link href={`/${locale}/why-become-a-donor`}>
                  {t("submenu.eggDonors.whyBecome")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/who-can-become-a-donor`}>
                  {t("submenu.eggDonors.whoCanApply")}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h4>{t("navigation.programs")}</h4>
            <ul>
              <li>
                <Link href={`/${locale}/own-gametes`}>
                  {t("submenu.programs.ownGametes")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/egg-donor`}>
                  {t("submenu.programs.eggDonor")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/egg-freezing`}>
                  {t("submenu.programs.eggFreezing")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} Miracle Makers.{" "}
            {t("footer.copyright")}
          </div>

          <div className={styles.legalLinks}>
            <Link href="#">{t("footer.privacyPolicy")}</Link>
            <Link href="#">{t("footer.termsOfService")}</Link>
          </div>

          <div className={styles.socials}>
            <a
              className={styles.socialIcon}
              aria-label="Facebook"
              href="https://www.facebook.com/share/15bgwdnhbw/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              className={styles.socialIcon}
              aria-label="Instagram"
              href="https://www.instagram.com/surrogacy_center_happy_family/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              className={styles.socialIcon}
              aria-label="WhatsApp"
              href="https://wa.me/19298775515?text=Hi%2C%20I%27d%20like%20to%20know%20more"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a
              className={styles.socialIcon}
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/happy-family-georgia?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
