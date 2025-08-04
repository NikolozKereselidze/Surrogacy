import { useTranslation } from "react-i18next";
import styles from "../styles/WhyChooseUs.module.css";

import {
  FaAward,
  FaUsers,
  FaShieldAlt,
  FaHeart,
  FaGlobe,
  FaClock,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: <FaAward />,
      title: t("whyChooseUs.reason1Title"),
      description: t("whyChooseUs.reason1Desc"),
    },
    {
      icon: <FaUsers />,
      title: t("whyChooseUs.reason2Title"),
      description: t("whyChooseUs.reason2Desc"),
    },
    {
      icon: <FaShieldAlt />,
      title: t("whyChooseUs.reason3Title"),
      description: t("whyChooseUs.reason3Desc"),
    },
    {
      icon: <FaHeart />,
      title: t("whyChooseUs.reason4Title"),
      description: t("whyChooseUs.reason4Desc"),
    },
    {
      icon: <FaGlobe />,
      title: t("whyChooseUs.reason5Title"),
      description: t("whyChooseUs.reason5Desc"),
    },
    {
      icon: <FaClock />,
      title: t("whyChooseUs.reason6Title"),
      description: t("whyChooseUs.reason6Desc"),
    },
  ];

  return (
    <>
      <div className={styles.whyChooseUsContainer}>
        <section className={`${styles.reasonsSection} section`}>
          <div className="content">
            <h2 className="title">{t("whyChooseUs.reasonsTitle")}</h2>
            <p className="subtitle">{t("whyChooseUs.reasonsDesc")}</p>
          </div>

          <div className={styles.reasonsGrid}>
            {reasons.map((reason, index) => (
              <div key={index} className={styles.reasonCard}>
                <div className={styles.reasonIcon}>{reason.icon}</div>
                <h3 className={styles.reasonTitle}>{reason.title}</h3>
                <p className={styles.reasonDesc}>{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.comparisonSection} section`}>
          <div className="content">
            <h2 className="title">{t("whyChooseUs.comparisonTitle")}</h2>
            <p className="subtitle">{t("whyChooseUs.comparisonDesc")}</p>
          </div>
          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonCard}>
              <h3 className={styles.comparisonTitle}>
                {t("whyChooseUs.othersTitle")}
              </h3>
              <ul className={styles.comparisonList}>
                <li>{t("whyChooseUs.othersPoint1")}</li>
                <li>{t("whyChooseUs.othersPoint2")}</li>
                <li>{t("whyChooseUs.othersPoint3")}</li>
                <li>{t("whyChooseUs.othersPoint4")}</li>
              </ul>
            </div>
            <div className={`${styles.comparisonCard} ${styles.ourCard}`}>
              <h3 className={styles.comparisonTitle}>
                {t("whyChooseUs.ourTitle")}
              </h3>
              <ul className={styles.comparisonList}>
                <li>{t("whyChooseUs.ourPoint1")}</li>
                <li>{t("whyChooseUs.ourPoint2")}</li>
                <li>{t("whyChooseUs.ourPoint3")}</li>
                <li>{t("whyChooseUs.ourPoint4")}</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WhyChooseUs;
