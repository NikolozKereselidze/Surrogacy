"use client";

import { useTranslation } from "react-i18next";
import { PROGRAM_CONFIGS, type ProgramType } from "@/config/programConfigs";
import styles from "@/styles/Programs/Programs.module.css";

interface ProgramsProps {
  programType: ProgramType;
}

const Programs = ({ programType }: ProgramsProps) => {
  const { t } = useTranslation();

  const getProgramData = () => {
    const config = PROGRAM_CONFIGS[programType];

    return {
      title: t(config.titleKey),
      description: t(config.descriptionKey),
      sections: config.sections.map((section) => ({
        title: t(section.titleKey),
        steps: section.steps.map((stepKey) => t(stepKey)),
      })),
      questions:
        config.questions?.map((qa) => ({
          question: t(qa.questionKey),
          answer: t(qa.answerKey),
        })) || [],
    };
  };

  const programData = getProgramData();

  return (
    <section className={`${styles.gametesSection} section`}>
      <div className={styles.content}>
        <h1 className={styles.title}>{programData.title}</h1>
        <p className={styles.description}>{programData.description}</p>
      </div>

      {programData.sections.map((section, index) => (
        <div key={index} className={styles.content}>
          <h2 className={styles.title}>{section.title}</h2>
          <ul className={styles.programList}>
            {section.steps.map((step, stepIndex) => (
              <li key={stepIndex}>{step}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Program-Specific FAQ Section */}
      {programData.questions.length > 0 && (
        <div className={styles.faqSection}>
          <h2 className={styles.faqTitle}>{t("programs.commonQuestions")}</h2>
          <div className={styles.faqGrid}>
            {programData.questions.map((qa, idx) => (
              <div key={idx} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{qa.question}</h3>
                <p className={styles.faqAnswer}>{qa.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Programs;
