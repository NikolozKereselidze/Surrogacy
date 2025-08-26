import styles from "../styles/ContactUs.module.css";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.contactUsFormContainer}>
      <form className={styles.contactUsForm}>
        <div className={styles.contactUsFormRow}>
          <input
            id="firstName"
            type="text"
            placeholder={t("contactUs.firstName")}
            aria-label={t("contactUs.firstName")}
            name="firstName"
            autoComplete="on"
          />
          <input
            id="lastName"
            type="text"
            placeholder={t("contactUs.lastName")}
            aria-label={t("contactUs.lastName")}
            name="lastName"
            autoComplete="on"
          />
        </div>

        <div className={styles.contactUsFormRow}>
          <input
            id="email"
            type="email"
            placeholder={t("contactUs.email")}
            aria-label={t("contactUs.email")}
            name="email"
            autoComplete="on"
          />
          <input
            id="phone"
            type="tel"
            placeholder={t("contactUs.phone")}
            aria-label={t("contactUs.phone")}
            name="phone"
            autoComplete="on"
          />
        </div>

        <div className={styles.contactUsFormRow}>
          <select
            name="gender"
            id="gender"
            aria-label={t("contactUs.selectGender")}
          >
            <option value="">{t("contactUs.selectGender")}</option>
            <option value="male">{t("contactUs.male")}</option>
            <option value="female">{t("contactUs.female")}</option>
            <option value="other">{t("contactUs.other")}</option>
          </select>

          <input
            className={styles.contactUsFormDate}
            id="dateOfBirth"
            type="date"
            placeholder={t("contactUs.dateOfBirth")}
            aria-label={t("contactUs.dateOfBirth")}
            name="dateOfBirth"
            autoComplete="on"
          />
        </div>

        <textarea
          id="message"
          placeholder={t("contactUs.message")}
          aria-label={t("contactUs.message")}
          name="message"
        />
        <Button
          className={styles.contactUsButton}
          aria-label={t("contactUs.submit")}
        >
          {t("contactUs.submit")}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
