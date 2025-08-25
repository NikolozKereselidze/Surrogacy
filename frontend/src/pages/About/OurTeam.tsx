import { useTranslation } from "react-i18next";
import { useState } from "react";
import styles from "../../styles/OurTeam.module.css";
import { getAllTeamMembers } from "../../data/teamMembers";
import TeamCard from "../../components/TeamCard";
import Button from "../../components/Button";

const OurTeam = () => {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(3);

  const teamMembers = getAllTeamMembers();
  const visibleMembers = teamMembers.slice(0, visibleCount);
  const hasMoreMembers = visibleCount < teamMembers.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, teamMembers.length));
  };

  return (
    <>
      <div className={styles.ourTeamContainer}>
        <section className={styles.teamSection}>
          <div className="section">
            <div className="content">
              <h2 className="title">{t("ourTeam.introTitle")}</h2>
              <p className="subtitle">{t("ourTeam.introText")}</p>
            </div>

            <div className={styles.teamContainer}>
              <div className={styles.teamGrid}>
                {visibleMembers.map((member, index) => (
                  <TeamCard key={index} member={member} />
                ))}
              </div>
              {hasMoreMembers && (
                <div className={styles.showMoreContainer}>
                  <Button
                    className={styles.showMoreButton}
                    onClick={handleShowMore}
                  >
                    {t("ourTeam.showMore") || "Show More"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className={styles.valuesSection}>
          <div className="section">
            <div className="content">
              <h2 className="title">{t("ourTeam.valuesTitle")}</h2>
              <p className="subtitle">{t("ourTeam.valuesDesc")}</p>
            </div>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🎯</div>
                <h3 className={styles.valueTitle}>
                  {t("ourTeam.value1Title")}
                </h3>
                <p className={styles.valueDesc}>{t("ourTeam.value1Desc")}</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🤝</div>
                <h3 className={styles.valueTitle}>
                  {t("ourTeam.value2Title")}
                </h3>
                <p className={styles.valueDesc}>{t("ourTeam.value2Desc")}</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>💡</div>
                <h3 className={styles.valueTitle}>
                  {t("ourTeam.value3Title")}
                </h3>
                <p className={styles.valueDesc}>{t("ourTeam.value3Desc")}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OurTeam;
