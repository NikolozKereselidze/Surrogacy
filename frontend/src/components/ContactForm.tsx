import { useState } from "react";
import styles from "../styles/ContactUs.module.css";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      gender,
      subject,
      message,
      website,
    };

    try {
      const res = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Contact form submitted successfully");
      } else {
        alert("Failed to submit contact form");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const { t } = useTranslation();
  return (
    <div className={styles.contactUsFormContainer}>
      <form className={styles.contactUsForm} onSubmit={onSubmit}>
        <div className={styles.contactUsFormRow}>
          <input
            id="firstName"
            type="text"
            placeholder={t("contactUs.firstName")}
            aria-label={t("contactUs.firstName")}
            name="firstName"
            autoComplete="on"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            id="lastName"
            type="text"
            placeholder={t("contactUs.lastName")}
            aria-label={t("contactUs.lastName")}
            name="lastName"
            autoComplete="on"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="phone"
            type="tel"
            placeholder={t("contactUs.phone")}
            aria-label={t("contactUs.phone")}
            name="phone"
            autoComplete="on"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className={styles.contactUsFormRow}>
          <select
            name="gender"
            id="gender"
            aria-label={t("contactUs.selectGender")}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">{t("contactUs.selectGender")}</option>
            <option value="male">{t("contactUs.male")}</option>
            <option value="female">{t("contactUs.female")}</option>
            <option value="other">{t("contactUs.other")}</option>
          </select>

          <select
            name="subject"
            id="subject"
            aria-label={t("contactUs.selectSubject")}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">{t("contactUs.selectSubject")}</option>
            <option value="surrogate">{t("contactUs.surrogate")}</option>
            <option value="egg-donor">{t("contactUs.eggDonor")}</option>
            <option value="intended-parent">
              {t("contactUs.intendedParent")}
            </option>
            <option value="sperm-donor">{t("contactUs.spermDonor")}</option>
            <option value="general-inquiry">
              {t("contactUs.generalInquiry")}
            </option>
          </select>
        </div>

        <textarea
          id="message"
          placeholder={t("contactUs.message")}
          aria-label={t("contactUs.message")}
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Honeypot (hidden) */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
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
