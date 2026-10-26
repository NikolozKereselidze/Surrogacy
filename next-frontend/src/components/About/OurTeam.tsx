"use client";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import styles from "@/styles/About/OurTeam.module.css";
const OurTeam = ({ teamRoster }: { teamRoster: ReactNode }) => {
    const { t } = useTranslation();
    return (<>
      <div className={styles.ourTeamContainer}>
        <section className={styles.teamSection}>
          <div className="section">
            <div className="content">
              <h1 className="title">{t("ourTeam.introTitle")}</h1>
              <p className="subtitle">{t("ourTeam.introText")}</p>
            </div>

            <div className={styles.teamContainer}>
              <div className={styles.teamGrid}>
                {teamRoster}
              </div>
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
    </>);
};
export default OurTeam;
