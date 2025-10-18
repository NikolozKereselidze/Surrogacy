import { useState, useEffect } from "react";
import styles from "@/styles/Contact/ContactUs.module.css";
import Button from "@/components/Button";
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
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Auto-dismiss messages after 5 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
        setFieldErrors({});
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setFieldErrors({});

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

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        // Clear form on success
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setGender("");
        setSubject("");
        setMessage("");
        setWebsite("");
      } else {
        setStatus("error");
        if (data.details) {
          // Handle individual field errors
          const errors: Record<string, string> = {};
          Object.entries(data.details).forEach(([field, fieldData]) => {
            const fieldError = fieldData as { _errors?: string[] };
            if (fieldError._errors && fieldError._errors.length > 0) {
              errors[field] = fieldError._errors[0];
            }
          });
          setFieldErrors(errors);
        }
      }
    } catch (error) {
      setStatus("error");
      setFieldErrors({
        general: "Network error. Please check your connection and try again.",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const { t } = useTranslation();
  return (
    <div className={styles.contactUsFormContainer}>
      <form className={styles.contactUsForm} onSubmit={onSubmit}>
        <div className={styles.contactUsFormRow}>
          <div className={styles.row}>
            {fieldErrors.firstName && (
              <p className={styles.error}>{fieldErrors.firstName}</p>
            )}
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
          </div>

          <div className={styles.row}>
            {fieldErrors.lastName && (
              <div className={styles.error}>{fieldErrors.lastName}</div>
            )}
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
        </div>

        <div className={styles.contactUsFormRow}>
          <div className={styles.row}>
            {fieldErrors.email && (
              <p className={styles.error}>{fieldErrors.email}</p>
            )}
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
          </div>

          <div className={styles.row}>
            {fieldErrors.phone && (
              <p className={styles.error}>{fieldErrors.phone}</p>
            )}
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
        </div>

        <div className={styles.contactUsFormRow}>
          <div className={styles.row}>
            {fieldErrors.gender && (
              <p className={styles.error}>{fieldErrors.gender}</p>
            )}
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
          </div>

          <div className={styles.row}>
            {fieldErrors.subject && (
              <p className={styles.error}>{fieldErrors.subject}</p>
            )}

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
        </div>

        <div className={styles.row}>
          {fieldErrors.message && (
            <p className={styles.error}>{fieldErrors.message}</p>
          )}
          <textarea
            id="message"
            placeholder={t("contactUs.message")}
            aria-label={t("contactUs.message")}
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

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
          {loading ? "Sending..." : t("contactUs.submit")}
        </Button>

        {status === "success" && (
          <p role="status" className={styles.success}>
            {t("contactUs.success")}
          </p>
        )}
        {status === "error" && (
          <p role="status" className={`${styles.error} ${styles.errorStatus}`}>
            {fieldErrors.general || "Something went wrong. Please try again."}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
