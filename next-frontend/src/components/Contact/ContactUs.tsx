import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import styles from "@/styles/Contact/ContactUs.module.css";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <section className={`${styles.contactUsSection} section`}>
      <div className="content">
        <h2 className="title">{t("contactUs.title")}</h2>
        <p className="subtitle">{t("contactUs.subtitle")}</p>
      </div>

      <div className={styles.contactUsGrid}>
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactUs;
