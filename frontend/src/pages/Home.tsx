import Button from "../components/Button";
import styles from "../styles/Home.module.css";
import { useTranslation } from "react-i18next";
import { FaBaby, FaUserPlus, FaGift } from "react-icons/fa";
import { Link } from "react-router-dom";

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

      <section className={`${styles.beginYourMiracleSection} section`}>
        <div className={styles.beginYourMiracleContent}>
          <h2 className={styles.beginYourMiracleTitle}>
            {t("beginYourMiracle.title")}
          </h2>
          <p className={styles.beginYourMiracleSubtitle}>
            {t("beginYourMiracle.subtitle")}
          </p>
        </div>

        <div className={styles.beginYourMiracleGrid}>
          <Link to="/intended-parents" className={styles.beginYourMiracleCard}>
            <FaBaby className={styles.beginYourMiracleIcon} />
            <div className={styles.beginYourMiracleCardTitle}>
              {t("beginYourMiracle.intendedParentsTitle")}
            </div>
            <div className={styles.beginYourMiracleCardDesc}>
              {t("beginYourMiracle.intendedParentsDesc")}
            </div>
          </Link>
          <Link to="/surrogates" className={styles.beginYourMiracleCard}>
            <FaUserPlus className={styles.beginYourMiracleIcon} />
            <div className={styles.beginYourMiracleCardTitle}>
              {t("beginYourMiracle.surrogatesTitle")}
            </div>
            <div className={styles.beginYourMiracleCardDesc}>
              {t("beginYourMiracle.surrogatesDesc")}
            </div>
          </Link>
          <Link to="/egg-donors" className={styles.beginYourMiracleCard}>
            <FaGift className={styles.beginYourMiracleIcon} />
            <div className={styles.beginYourMiracleCardTitle}>
              {t("beginYourMiracle.eggDonorsTitle")}
            </div>
            <div className={styles.beginYourMiracleCardDesc}>
              {t("beginYourMiracle.eggDonorsDesc")}
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
