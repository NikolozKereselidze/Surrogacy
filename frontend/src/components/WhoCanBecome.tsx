import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaHeart,
  FaUserCheck,
  FaShieldAlt,
  FaCalendarAlt,
  FaBaby,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaUsers,
  FaHandshake,
  FaFileAlt,
  FaDna,
  FaHome,
  FaMoneyBillWave,
  FaGlobe,
  FaUserGraduate,
  FaHeartbeat,
} from "react-icons/fa";
import styles from "../styles/WhoCanBecomeSurrogate.module.css";
import RequirementsCard from "./RequirementsCard";
import ProcessStep from "./ProcessStep";
import SupportCard from "./SupportCard";

interface WhoCanBecomeProps {
  type: "surrogate" | "donor" | "parent";
}

const WhoCanBecome: React.FC<WhoCanBecomeProps> = ({ type }) => {
  const { t } = useTranslation();

  const getRequirements = () => {
    switch (type) {
      case "surrogate":
        return [
          {
            icon: FaBaby,
            title: t("whoCanBecome.requirements.previousPregnancy.title"),
            description: t(
              "whoCanBecome.requirements.previousPregnancy.description"
            ),
          },
          {
            icon: FaUserCheck,
            title: t("whoCanBecome.requirements.ageHealth.title"),
            description: t("whoCanBecome.requirements.ageHealth.description"),
          },
          {
            icon: FaShieldAlt,
            title: t("whoCanBecome.requirements.lifestyle.title"),
            description: t("whoCanBecome.requirements.lifestyle.description"),
          },
          {
            icon: FaCalendarAlt,
            title: t("whoCanBecome.requirements.availability.title"),
            description: t(
              "whoCanBecome.requirements.availability.description"
            ),
          },
          {
            icon: FaGraduationCap,
            title: t("whoCanBecome.requirements.education.title"),
            description: t("whoCanBecome.requirements.education.description"),
          },
          {
            icon: FaMapMarkerAlt,
            title: t("whoCanBecome.requirements.location.title"),
            description: t("whoCanBecome.requirements.location.description"),
          },
        ];
      case "donor":
        return [
          {
            icon: FaUserCheck,
            title: t("whoCanBecome.requirements.ageHealth.title"),
            description: t("whoCanBecome.requirements.ageHealth.description"),
          },
          {
            icon: FaDna,
            title: t("whoCanBecome.requirements.geneticHealth.title"),
            description: t(
              "whoCanBecome.requirements.geneticHealth.description"
            ),
          },
          {
            icon: FaShieldAlt,
            title: t("whoCanBecome.requirements.lifestyle.title"),
            description: t("whoCanBecome.requirements.lifestyle.description"),
          },
          {
            icon: FaCalendarAlt,
            title: t("whoCanBecome.requirements.availability.title"),
            description: t(
              "whoCanBecome.requirements.availability.description"
            ),
          },
          {
            icon: FaGraduationCap,
            title: t("whoCanBecome.requirements.education.title"),
            description: t("whoCanBecome.requirements.education.description"),
          },
          {
            icon: FaMapMarkerAlt,
            title: t("whoCanBecome.requirements.location.title"),
            description: t("whoCanBecome.requirements.location.description"),
          },
        ];
      case "parent":
        return [
          {
            icon: FaHeart,
            title: t("whoCanBecome.requirements.emotionalReadiness.title"),
            description: t(
              "whoCanBecome.requirements.emotionalReadiness.description"
            ),
          },
          {
            icon: FaMoneyBillWave,
            title: t("whoCanBecome.requirements.financialStability.title"),
            description: t(
              "whoCanBecome.requirements.financialStability.description"
            ),
          },
          {
            icon: FaHome,
            title: t("whoCanBecome.requirements.stableHome.title"),
            description: t("whoCanBecome.requirements.stableHome.description"),
          },
          {
            icon: FaUserGraduate,
            title: t("whoCanBecome.requirements.legalStatus.title"),
            description: t("whoCanBecome.requirements.legalStatus.description"),
          },
          {
            icon: FaGlobe,
            title: t("whoCanBecome.requirements.international.title"),
            description: t(
              "whoCanBecome.requirements.international.description"
            ),
          },
          {
            icon: FaHeartbeat,
            title: t("whoCanBecome.requirements.healthCommitment.title"),
            description: t(
              "whoCanBecome.requirements.healthCommitment.description"
            ),
          },
        ];
      default:
        return [];
    }
  };

  const getProcessSteps = () => {
    switch (type) {
      case "surrogate":
        return [
          {
            stepNumber: "1",
            stepTitle: t("whoCanBecome.processSteps.step1.title"),
            stepContent: t("whoCanBecome.processSteps.step1.content"),
            stepIcon: <FaFileAlt />,
          },
          {
            stepNumber: "2",
            stepTitle: t("whoCanBecome.processSteps.step2.title"),
            stepContent: t("whoCanBecome.processSteps.step2.content"),
            stepIcon: <FaUserCheck />,
          },
          {
            stepNumber: "3",
            stepTitle: t("whoCanBecome.processSteps.step3.title"),
            stepContent: t("whoCanBecome.processSteps.step3.content"),
            stepIcon: <FaHeart />,
          },
          {
            stepNumber: "4",
            stepTitle: t("whoCanBecome.processSteps.step4.title"),
            stepContent: t("whoCanBecome.processSteps.step4.content"),
            stepIcon: <FaHandshake />,
          },
        ];
      case "donor":
        return [
          {
            stepNumber: "1",
            stepTitle: t("whoCanBecome.processSteps.donor.step1.title"),
            stepContent: t("whoCanBecome.processSteps.donor.step1.content"),
            stepIcon: <FaFileAlt />,
          },
          {
            stepNumber: "2",
            stepTitle: t("whoCanBecome.processSteps.donor.step2.title"),
            stepContent: t("whoCanBecome.processSteps.donor.step2.content"),
            stepIcon: <FaUserCheck />,
          },
          {
            stepNumber: "3",
            stepTitle: t("whoCanBecome.processSteps.donor.step3.title"),
            stepContent: t("whoCanBecome.processSteps.donor.step3.content"),
            stepIcon: <FaDna />,
          },
          {
            stepNumber: "4",
            stepTitle: t("whoCanBecome.processSteps.donor.step4.title"),
            stepContent: t("whoCanBecome.processSteps.donor.step4.content"),
            stepIcon: <FaHandshake />,
          },
        ];
      case "parent":
        return [
          {
            stepNumber: "1",
            stepTitle: t("whoCanBecome.processSteps.parent.step1.title"),
            stepContent: t("whoCanBecome.processSteps.parent.step1.content"),
            stepIcon: <FaFileAlt />,
          },
          {
            stepNumber: "2",
            stepTitle: t("whoCanBecome.processSteps.parent.step2.title"),
            stepContent: t("whoCanBecome.processSteps.parent.step2.content"),
            stepIcon: <FaUserCheck />,
          },
          {
            stepNumber: "3",
            stepTitle: t("whoCanBecome.processSteps.parent.step3.title"),
            stepContent: t("whoCanBecome.processSteps.parent.step3.content"),
            stepIcon: <FaHeart />,
          },
          {
            stepNumber: "4",
            stepTitle: t("whoCanBecome.processSteps.parent.step4.title"),
            stepContent: t("whoCanBecome.processSteps.parent.step4.content"),
            stepIcon: <FaHandshake />,
          },
        ];
      default:
        return [];
    }
  };

  const requirements = getRequirements();
  const processSteps = getProcessSteps();

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={`${styles.heroSection} section`}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroTitleContent}>
              <h1 className={styles.heroTitle}>
                {t(`whoCanBecome.${type}.heroTitle`)}
              </h1>
              <p className={styles.heroSubtitle}>
                {t(`whoCanBecome.${type}.heroSubtitle`)}
              </p>
            </div>
            <div className={styles.heroHighlight}>
              <FaHeart className={styles.heroIcon} />
              <p>{t(`whoCanBecome.${type}.heroHighlight`)}</p>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.imagePlaceholder}>
              <FaBaby className={styles.placeholderIcon} />
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className={`${styles.requirementsSection} section`}>
        <div className="content">
          <h2 className="title">
            {t(`whoCanBecome.${type}.requirementsTitle`)}
          </h2>
          <p className="subtitle">
            {t(`whoCanBecome.${type}.requirementsSubtitle`)}
          </p>
        </div>

        <div className={styles.requirementsGrid}>
          {requirements.map((requirement) => (
            <RequirementsCard
              key={requirement.title}
              icon={requirement.icon}
              title={requirement.title}
              description={requirement.description}
            />
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className={`${styles.processSection} section`}>
        <div className="content">
          <h2 className="title">{t(`whoCanBecome.${type}.processTitle`)}</h2>
          <p className="subtitle">
            {t(`whoCanBecome.${type}.processSubtitle`)}
          </p>
        </div>

        <div className={styles.processTimeline}>
          {processSteps.map((step) => (
            <ProcessStep
              key={step.stepNumber}
              stepNumber={step.stepNumber}
              stepTitle={step.stepTitle}
              stepContent={step.stepContent}
              stepIcon={step.stepIcon}
            />
          ))}
        </div>
      </section>

      {/* Support Section */}
      <section className={`${styles.supportSection} section`}>
        <div className="content">
          <h2 className="title">{t(`whoCanBecome.${type}.supportTitle`)}</h2>
          <p className="subtitle">
            {t(`whoCanBecome.${type}.supportSubtitle`)}
          </p>
        </div>

        <div className={styles.supportGrid}>
          <SupportCard
            title={t(`whoCanBecome.${type}.support.phone.title`)}
            text={t(`whoCanBecome.${type}.support.phone.text`)}
            icon={<FaPhone />}
          />

          <SupportCard
            title={t(`whoCanBecome.${type}.support.email.title`)}
            text={t(`whoCanBecome.${type}.support.email.text`)}
            icon={<FaEnvelope />}
          />

          <SupportCard
            title={t(`whoCanBecome.${type}.support.coordinator.title`)}
            text={t(`whoCanBecome.${type}.support.coordinator.text`)}
            icon={<FaUsers />}
          />
        </div>
      </section>
    </div>
  );
};

export default WhoCanBecome;
