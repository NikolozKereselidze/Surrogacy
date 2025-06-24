import Button from "../components/Button";
import styles from "../styles/Home.module.css";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, i18n } = useTranslation();

  // Set RTL for Hebrew
  const isRTL = i18n.language === "he";

  return (
    <div className={styles.home} dir={isRTL ? "rtl" : "ltr"}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroHeader}>
            <h2 className={styles.heroTitle}>
              <span className={styles.highlight}>
                {t("homepage.heroTitle.together")}
              </span>
              , {t("homepage.heroTitle.weMake")}{" "}
              {t("homepage.heroTitle.miracles")}
            </h2>
            <h3 className={styles.heroSubtitle}>
              {t("homepage.heroSubtitle.compassionate")} <br />
              <span className={styles.highlight}>
                {t("homepage.heroSubtitle.tailored")}
              </span>{" "}
              {t("homepage.heroSubtitle.journey")}
            </h3>
          </div>
          <p className={styles.heroDescription}>
            {t("homepage.heroDescription")}
          </p>
          <Button className={styles.heroButton}>
            {t("homepage.startJourneyButton")}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
