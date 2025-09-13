import { useTranslation } from "react-i18next";
import styles from "../../styles/SurrogacyWithOwnGametes.module.css";

const SurrogacyWithOwnGametes = () => {
  const { t } = useTranslation();

  return (
    <section className={`${styles.gametesSection} section`}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t("surrogacyWithOwnGametes.title")}</h1>

        <p className={styles.description}>
          {t("surrogacyWithOwnGametes.description")}
        </p>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>
          {t("surrogacyWithOwnGametes.ivfProcess.title")}
        </h2>

        <ul className={styles.programList}>
          <li>{t("surrogacyWithOwnGametes.ivfProcess.step1")}</li>
          <li>{t("surrogacyWithOwnGametes.ivfProcess.step2")}</li>
          <li>{t("surrogacyWithOwnGametes.ivfProcess.step3")}</li>
        </ul>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>
          {t("surrogacyWithOwnGametes.embryoTransfer.title")}
        </h2>

        <ul className={styles.programList}>
          <li>{t("surrogacyWithOwnGametes.embryoTransfer.step1")}</li>
          <li>{t("surrogacyWithOwnGametes.embryoTransfer.step2")}</li>
          <li>{t("surrogacyWithOwnGametes.embryoTransfer.step3")}</li>
        </ul>
      </div>
    </section>
  );
};

export default SurrogacyWithOwnGametes;
