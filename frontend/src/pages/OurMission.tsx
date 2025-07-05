import { FaHandsHelping, FaUserGraduate, FaHeart } from "react-icons/fa";
import MiracleCard from "../components/MiracleCard";
import styles from "../styles/OurMission.module.css";
import { useTranslation } from "react-i18next";

const OurMission = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className={`${styles.ourMissionSection} section`}>
        <div className="content">
          <h2 className="title">{t("ourMission.title")}</h2>
          <p className="subtitle">{t("ourMission.subtitle")}</p>
        </div>

        <div className={styles.valuesGrid}>
          <MiracleCard
            to="/"
            icon={<FaHeart className="miracleIcon" />}
            title={t("ourMission.valueCompassion")}
            description={t("ourMission.valueCompassionDesc")}
          />
          <MiracleCard
            to="/"
            icon={<FaUserGraduate className="miracleIcon" />}
            title={t("ourMission.valueExpertise")}
            description={t("ourMission.valueExpertiseDesc")}
          />
          <MiracleCard
            to="/"
            icon={<FaHandsHelping className="miracleIcon" />}
            title={t("ourMission.valueSupport")}
            description={t("ourMission.valueSupportDesc")}
          />
        </div>
      </section>
    </>
  );
};

export default OurMission;
