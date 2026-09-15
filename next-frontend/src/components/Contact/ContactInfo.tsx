import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaFacebook, FaLinkedin, FaInstagram, } from "react-icons/fa";
import styles from "@/styles/Contact/ContactUs.module.css";
import { useTranslation } from "react-i18next";
const ContactInfo = () => {
    const { t } = useTranslation();
    return (<div className={styles.contactInfo}>
      <div className={styles.contactInfoItem}>
        <FaMapMarkerAlt />
        <div className={styles.contactInfoItemText}>
          <h3>{t("contactUs.addressLabel")}</h3>
          <a aria-label="Address" href="https://maps.app.goo.gl/KypCLxrf5taojooJA" target="_blank" rel="noopener noreferrer">
            6 Marijani St, Tbilisi 0186
          </a>
        </div>
      </div>
      <div className={`${styles.contactInfoItem} ${styles.phoneInfoItem}`}>
        <FaPhone />
        <div className={styles.contactInfoItemText}>
          <h3>{t("contactUs.phoneLabel")}</h3>
          <p className={styles.phoneSupportLabel}>{t("contactUs.languageSupportLabel")}</p>
          <div className={styles.phoneList}>
            <a aria-label="Call Tamta, English-speaking contact" href="tel:+995596278080">
              <span className={styles.phoneContact}>
                <strong>Tamta</strong>
                <span className={styles.languageBadge}>English</span>
              </span>
              <span className={styles.phoneNumber}>+995 596 278 080</span>
            </a>
            <a aria-label="Call Sopho, Spanish-speaking contact" href="tel:+995598578080">
              <span className={styles.phoneContact}>
                <strong>Sopho</strong>
                <span className={styles.languageBadge}>Spanish</span>
              </span>
              <span className={styles.phoneNumber}>+995 598 578 080</span>
            </a>
            <a aria-label="Call Rezi, Russian-speaking contact" href="tel:+995555501313">
              <span className={styles.phoneContact}>
                <strong>Rezi</strong>
                <span className={styles.languageBadge}>Russian</span>
              </span>
              <span className={styles.phoneNumber}>+995 555 501 313</span>
            </a>
            <a aria-label="Call Natia, Georgian-speaking contact" href="tel:+995596235050">
              <span className={styles.phoneContact}>
                <strong>Natia</strong>
                <span className={styles.languageBadge}>Georgian</span>
              </span>
              <span className={styles.phoneNumber}>+995 596 235 050</span>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.contactInfoItem}>
        <FaEnvelope />
        <div className={styles.contactInfoItemText}>
          <h3>{t("contactUs.emailLabel")}</h3>
          <a aria-label="Email" href="mailto:info@surrogationcenter.com">
            info@surrogationcenter.com
          </a>
        </div>
      </div>

      <div className={styles.contactUsSocials}>
        <a className={styles.whatsappIcon} href="https://wa.me/19928775515?text=Hi%2C%20I%27d%20like%20to%20know%20more" target="_blank" rel="noopener noreferrer" aria-label="Whatsapp">
          <FaWhatsapp />
        </a>

        <a className={styles.facebookIcon} href="https://www.facebook.com/share/15bgwdnhbw/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebook />
        </a>

        <a className={styles.linkedinIcon} href="https://www.linkedin.com/in/happy-family-georgia?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" aria-label="Linkedin">
          <FaLinkedin />
        </a>

        <a className={styles.instagramIcon} href="https://www.instagram.com/surrogacy_center_happy_family/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
      </div>
    </div>);
};
export default ContactInfo;
