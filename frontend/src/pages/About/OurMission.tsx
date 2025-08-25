import {
  FaLightbulb,
  FaBullseye,
  FaHeart,
  FaShieldAlt,
  FaHandshake,
} from "react-icons/fa";
import styles from "../../styles/OurMission.module.css";
import { useTranslation } from "react-i18next";

const OurMission = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Mission Statement Card */}
      <div className={`${styles.ourMissionContainer} section`}>
        <section className={styles.ourMissionSection}>
          <div className="content">
            <h2 className="title">{t("ourMission.title")}</h2>
            <p className="subtitle">{t("ourMission.subtitle")}</p>
          </div>
          <div className={styles.missionCard}>
            <div className={styles.missionContent}>
              <FaLightbulb className={styles.missionIcon} />
              <h3 className={styles.missionTitle}>
                {t("ourMission.missionTitle")}
              </h3>
              <p className={styles.missionText}>
                {t("ourMission.missionText")}
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className={styles.visionSection}>
          <div className={styles.visionHeader}>
            <FaBullseye className={styles.visionIcon} />
            <h3 className={styles.visionTitle}>
              {t("ourMission.visionTitle")}
            </h3>
          </div>
          <div className={styles.visionGrid}>
            <div className={styles.visionItem}>
              <h4 className={styles.visionItemTitle}>
                {t("ourMission.vision1Title")}
              </h4>
              <p className={styles.visionItemText}>
                {t("ourMission.vision1Text")}
              </p>
            </div>
            <div className={styles.visionItem}>
              <h4 className={styles.visionItemTitle}>
                {t("ourMission.vision2Title")}
              </h4>
              <p className={styles.visionItemText}>
                {t("ourMission.vision2Text")}
              </p>
            </div>
            <div className={styles.visionItem}>
              <h4 className={styles.visionItemTitle}>
                {t("ourMission.vision3Title")}
              </h4>
              <p className={styles.visionItemText}>
                {t("ourMission.vision3Text")}
              </p>
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className={styles.commitmentSection}>
          <div className={styles.commitmentHeader}>
            <h3 className={styles.commitmentTitle}>
              {t("ourMission.commitmentTitle")}
            </h3>
            <p className={styles.commitmentSubtitle}>
              {t("ourMission.commitmentSubtitle")}
            </p>
          </div>
          <div className={styles.commitmentGrid}>
            <div className={styles.commitmentItem}>
              <div className={styles.commitmentIconWrapper}>
                <FaHeart className={styles.commitmentIcon} />
              </div>
              <h4 className={styles.commitmentItemTitle}>
                {t("ourMission.commitment1Title")}
              </h4>
              <p className={styles.commitmentItemText}>
                {t("ourMission.commitment1Text")}
              </p>
            </div>
            <div className={styles.commitmentItem}>
              <div className={styles.commitmentIconWrapper}>
                <FaShieldAlt className={styles.commitmentIcon} />
              </div>
              <h4 className={styles.commitmentItemTitle}>
                {t("ourMission.commitment2Title")}
              </h4>
              <p className={styles.commitmentItemText}>
                {t("ourMission.commitment2Text")}
              </p>
            </div>
            <div className={styles.commitmentItem}>
              <div className={styles.commitmentIconWrapper}>
                <FaHandshake className={styles.commitmentIcon} />
              </div>
              <h4 className={styles.commitmentItemTitle}>
                {t("ourMission.commitment3Title")}
              </h4>
              <p className={styles.commitmentItemText}>
                {t("ourMission.commitment3Text")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OurMission;
