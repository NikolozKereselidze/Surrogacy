import { FaLightbulb, FaHeart, FaShieldAlt, FaHandshake } from "react-icons/fa";
import styles from "../../styles/OurMission.module.css";
import { useTranslation } from "react-i18next";
import RequirementsCard from "../../components/RequirementsCard";

const OurMission = () => {
  const { t } = useTranslation();

  const commitmentCards = [
    {
      icon: FaHeart,
      title: t("ourMission.commitment1Title"),
      description: t("ourMission.commitment1Text"),
    },
    {
      icon: FaShieldAlt,
      title: t("ourMission.commitment2Title"),
      description: t("ourMission.commitment2Text"),
    },
    {
      icon: FaHandshake,
      title: t("ourMission.commitment3Title"),
      description: t("ourMission.commitment3Text"),
    },
  ];

  return (
    <div className={styles.ourMissionContainer}>
      {/* Vision Section */}
      <section className="section">
        <div className="content">
          <h2 className="title">{t("ourMission.visionTitle")}</h2>
          <p className="subtitle">{t("ourMission.visionSubtitle")}</p>
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

      {/* Mission Statement Card */}
      <section className="section">
        <div className="content">
          <h2 className="title">{t("ourMission.title")}</h2>
          <p className="subtitle">{t("ourMission.subtitle")}</p>
        </div>
        <div className={styles.missionCard}>
          <div className={styles.missionContentWrapper}>
            <FaLightbulb className={styles.missionIcon} />
            <div className={styles.missionContent}>
              <h3 className={styles.missionTitle}>
                {t("ourMission.missionTitle")}
              </h3>
              <p className={styles.missionText}>
                {t("ourMission.missionText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="section">
        <div className="content">
          <h2 className="title">{t("ourMission.commitmentTitle")}</h2>
          <p className="subtitle">{t("ourMission.commitmentSubtitle")}</p>
        </div>
        <div className={styles.commitmentGrid}>
          {commitmentCards.map((card, index) => (
            <RequirementsCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default OurMission;
