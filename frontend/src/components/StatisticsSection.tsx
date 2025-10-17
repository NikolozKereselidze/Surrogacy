import { useTranslation } from "react-i18next";
import styles from "../styles/StatisticsSection.module.css";

const StatisticsSection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      number: t("statistics.stat1Number"),
      label: t("statistics.stat1Label"),
    },
    {
      number: t("statistics.stat2Number"),
      label: t("statistics.stat2Label"),
    },
    {
      number: t("statistics.stat3Number"),
      label: t("statistics.stat3Label"),
    },
    {
      number: t("statistics.stat4Number"),
      label: t("statistics.stat4Label"),
    },
  ];

  return (
    <section className={`${styles.statisticsSection} section`}>
      <div className="content">
        <h2 className="title">{t("statistics.title")}</h2>
        <p className="subtitle">{t("statistics.subtitle")}</p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <h3 className={styles.statNumber}>{stat.number}</h3>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;
