import {
  FaUsers,
  FaGlobe,
  FaHeart,
  FaAward,
  FaShieldAlt,
  FaHandshake,
} from "react-icons/fa";
import MiracleCard from "../components/MiracleCard";
import styles from "../styles/WhoWeAre.module.css";
import { useTranslation } from "react-i18next";

const WhoWeAre = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className={`${styles.whoWeAreSection} section`}>
        <div className="content">
          <h2 className="title">{t("whoWeAre.title")}</h2>
          <p className="subtitle">{t("whoWeAre.subtitle")}</p>
        </div>

        <div className={styles.storySection}>
          <div className={styles.storyContent}>
            <h3 className={styles.storyTitle}>{t("whoWeAre.storyTitle")}</h3>
            <p className={styles.storyText}>{t("whoWeAre.storyText")}</p>
          </div>
        </div>

        <div className={styles.valuesGrid}>
          <MiracleCard
            icon={<FaUsers className="miracleIcon" />}
            title={t("whoWeAre.value1Title")}
            description={t("whoWeAre.value1Desc")}
            btn={false}
          />
          <MiracleCard
            icon={<FaGlobe className="miracleIcon" />}
            title={t("whoWeAre.value2Title")}
            description={t("whoWeAre.value2Desc")}
            btn={false}
          />
          <MiracleCard
            icon={<FaHeart className="miracleIcon" />}
            title={t("whoWeAre.value3Title")}
            description={t("whoWeAre.value3Desc")}
            btn={false}
          />
          <MiracleCard
            icon={<FaAward className="miracleIcon" />}
            title={t("whoWeAre.value4Title")}
            description={t("whoWeAre.value4Desc")}
            btn={false}
          />
          <MiracleCard
            icon={<FaShieldAlt className="miracleIcon" />}
            title={t("whoWeAre.value5Title")}
            description={t("whoWeAre.value5Desc")}
            btn={false}
          />
          <MiracleCard
            icon={<FaHandshake className="miracleIcon" />}
            title={t("whoWeAre.value6Title")}
            description={t("whoWeAre.value6Desc")}
            btn={false}
          />
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <h3 className={styles.statNumber}>{t("whoWeAre.stat1Number")}</h3>
              <p className={styles.statLabel}>{t("whoWeAre.stat1Label")}</p>
            </div>
            <div className={styles.statItem}>
              <h3 className={styles.statNumber}>{t("whoWeAre.stat2Number")}</h3>
              <p className={styles.statLabel}>{t("whoWeAre.stat2Label")}</p>
            </div>
            <div className={styles.statItem}>
              <h3 className={styles.statNumber}>{t("whoWeAre.stat3Number")}</h3>
              <p className={styles.statLabel}>{t("whoWeAre.stat3Label")}</p>
            </div>
            <div className={styles.statItem}>
              <h3 className={styles.statNumber}>{t("whoWeAre.stat4Number")}</h3>
              <p className={styles.statLabel}>{t("whoWeAre.stat4Label")}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhoWeAre;
