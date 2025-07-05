import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import styles from "../styles/ContactUs.module.css";
import { useTranslation } from "react-i18next";

const ContactInfo = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.contactInfo}>
      <div className={styles.contactInfoItem}>
        <FaMapMarkerAlt />
        <div className={styles.contactInfoItemText}>
          <h3>{t("contactUs.addressLabel")}</h3>
          <a
            href="https://maps.app.goo.gl/KypCLxrf5taojooJA"
            target="_blank"
            rel="noopener noreferrer"
          >
            6 Marijani St, Tbilisi 0186
          </a>
        </div>
      </div>
      <div className={styles.contactInfoItem}>
        <FaPhone />
        <div className={styles.contactInfoItemText}>
          <h3>{t("contactUs.phoneLabel")}</h3>
          <a href="tel:+995568405050">+995 568 405 050</a>
        </div>
      </div>
      <div className={styles.contactInfoItem}>
        <FaEnvelope />
        <div className={styles.contactInfoItemText}>
          <h3>{t("contactUs.emailLabel")}</h3>
          <a href="mailto:info@surrogationcenter.com">
            info@surrogationcenter.com
          </a>
        </div>
      </div>

      <div className={styles.contactUsSocials}>
        <a
          className={styles.whatsappIcon}
          href="https://www.whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </a>

        <a
          className={styles.facebookIcon}
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>

        <a
          className={styles.linkedinIcon}
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>

        <a
          className={styles.instagramIcon}
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
