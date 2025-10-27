"use client";

import {
  FaUserCheck,
  FaFileAlt,
  FaHandshake,
  FaBaby,
  FaCalendarAlt,
  FaShieldAlt,
  FaUsers,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import SupportCard from "@/components/SupportCard";
import styles from "@/styles/Surrogates/SurrogacyProcess.module.css";

const SurrogacyProcess = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={`${styles.surrogacyProcessContainer} section`}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className="content">
            <h1 className="title">{t("surrogacyProcess.title")}</h1>
            <p className="subtitle">{t("surrogacyProcess.subtitle")}</p>
          </div>
        </section>

        {/* Process Steps */}
        <section className={styles.processSection}>
          <div className={styles.processGrid}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepIcon}>
                <FaUserCheck />
              </div>
              <h3 className={styles.stepTitle}>
                {t("surrogacyProcess.step1Title")}
              </h3>
              <p className={styles.stepDescription}>
                {t("surrogacyProcess.step1Description")}
              </p>
              <ul className={styles.stepList}>
                <li>{t("surrogacyProcess.step1Item1")}</li>
                <li>{t("surrogacyProcess.step1Item2")}</li>
                <li>{t("surrogacyProcess.step1Item3")}</li>
              </ul>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepIcon}>
                <FaFileAlt />
              </div>
              <h3 className={styles.stepTitle}>
                {t("surrogacyProcess.step2Title")}
              </h3>
              <p className={styles.stepDescription}>
                {t("surrogacyProcess.step2Description")}
              </p>
              <ul className={styles.stepList}>
                <li>{t("surrogacyProcess.step2Item1")}</li>
                <li>{t("surrogacyProcess.step2Item2")}</li>
                <li>{t("surrogacyProcess.step2Item3")}</li>
              </ul>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepIcon}>
                <FaHandshake />
              </div>
              <h3 className={styles.stepTitle}>
                {t("surrogacyProcess.step3Title")}
              </h3>
              <p className={styles.stepDescription}>
                {t("surrogacyProcess.step3Description")}
              </p>
              <ul className={styles.stepList}>
                <li>{t("surrogacyProcess.step3Item1")}</li>
                <li>{t("surrogacyProcess.step3Item2")}</li>
                <li>{t("surrogacyProcess.step3Item3")}</li>
              </ul>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepIcon}>
                <FaBaby />
              </div>
              <h3 className={styles.stepTitle}>
                {t("surrogacyProcess.step4Title")}
              </h3>
              <p className={styles.stepDescription}>
                {t("surrogacyProcess.step4Description")}
              </p>
              <ul className={styles.stepList}>
                <li>{t("surrogacyProcess.step4Item1")}</li>
                <li>{t("surrogacyProcess.step4Item2")}</li>
                <li>{t("surrogacyProcess.step4Item3")}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className={styles.timelineSection}>
          <div className="content">
            <h2 className="title">{t("surrogacyProcess.timelineTitle")}</h2>
          </div>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <FaCalendarAlt />
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>
                  {t("surrogacyProcess.timeline1Title")}
                </h3>
                <p className={styles.timelineText}>
                  {t("surrogacyProcess.timeline1Text")}
                </p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <FaShieldAlt />
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>
                  {t("surrogacyProcess.timeline2Title")}
                </h3>
                <p className={styles.timelineText}>
                  {t("surrogacyProcess.timeline2Text")}
                </p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <FaUsers />
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>
                  {t("surrogacyProcess.timeline3Title")}
                </h3>
                <p className={styles.timelineText}>
                  {t("surrogacyProcess.timeline3Text")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className={styles.supportSection}>
          <div className="content">
            <h2 className="title">{t("surrogacyProcess.supportTitle")}</h2>
          </div>
          <div className={styles.supportGrid}>
            <SupportCard
              title={t("surrogacyProcess.support1Title")}
              text={t("surrogacyProcess.support1Text")}
              icon={<FaPhone />}
            />
            <SupportCard
              title={t("surrogacyProcess.support2Title")}
              text={t("surrogacyProcess.support2Text")}
              icon={<FaEnvelope />}
            />
            <SupportCard
              title={t("surrogacyProcess.support3Title")}
              text={t("surrogacyProcess.support3Text")}
              icon={<FaUsers />}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default SurrogacyProcess;
