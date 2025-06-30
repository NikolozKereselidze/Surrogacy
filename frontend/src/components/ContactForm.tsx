import styles from "../styles/Home.module.css";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.contactUsFormContainer}>
      <form className={styles.contactUsForm}>
        <div className={styles.contactUsFormRow}>
          <input
            type="text"
            placeholder={t("contactUs.firstName")}
            name="firstName"
            autoComplete="on"
          />
          <input
            type="text"
            placeholder={t("contactUs.lastName")}
            name="lastName"
            autoComplete="on"
          />
        </div>

        <div className={styles.contactUsFormRow}>
          <input
            type="email"
            placeholder={t("contactUs.email")}
            name="email"
            autoComplete="on"
          />
          <input
            type="tel"
            placeholder={t("contactUs.phone")}
            name="phone"
            autoComplete="on"
          />
        </div>

        <div className={styles.contactUsFormRow}>
          <select name="gender" id="gender">
            <option value="">{t("contactUs.selectGender")}</option>
            <option value="male">{t("contactUs.male")}</option>
            <option value="female">{t("contactUs.female")}</option>
            <option value="other">{t("contactUs.other")}</option>
          </select>

          <input
            className={styles.contactUsFormDate}
            type="date"
            placeholder={t("contactUs.dateOfBirth")}
            name="dateOfBirth"
            autoComplete="on"
          />
        </div>

        <textarea placeholder={t("contactUs.message")} name="message" />
        <Button className={styles.contactUsButton}>
          {t("contactUs.submit")}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
