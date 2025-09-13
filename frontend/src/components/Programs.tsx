import { useTranslation } from "react-i18next";
import styles from "../styles/Programs.module.css";

interface ProgramsProps {
  programType:
    | "surrogacyWithOwnGametes"
    | "surrogacyWithEggDonor"
    | "eggFreezing"
    | "vipConciergeServices";
}

const Programs = ({ programType }: ProgramsProps) => {
  const { t } = useTranslation();

  const getProgramData = () => {
    switch (programType) {
      case "surrogacyWithOwnGametes":
        return {
          title: t("surrogacyWithOwnGametes.title"),
          description: t("surrogacyWithOwnGametes.description"),
          sections: [
            {
              title: t("surrogacyWithOwnGametes.ivfProcess.title"),
              steps: [
                t("surrogacyWithOwnGametes.ivfProcess.step1"),
                t("surrogacyWithOwnGametes.ivfProcess.step2"),
                t("surrogacyWithOwnGametes.ivfProcess.step3"),
              ],
            },
            {
              title: t("surrogacyWithOwnGametes.embryoTransfer.title"),
              steps: [
                t("surrogacyWithOwnGametes.embryoTransfer.step1"),
                t("surrogacyWithOwnGametes.embryoTransfer.step2"),
                t("surrogacyWithOwnGametes.embryoTransfer.step3"),
              ],
            },
          ],
        };
      case "surrogacyWithEggDonor":
        return {
          title: t("surrogacyWithEggDonor.title"),
          description: t("surrogacyWithEggDonor.description"),
          sections: [
            {
              title: t("surrogacyWithEggDonor.process.title"),
              steps: [
                t("surrogacyWithEggDonor.process.step1"),
                t("surrogacyWithEggDonor.process.step2"),
                t("surrogacyWithEggDonor.process.step3"),
              ],
            },
            {
              title: t("surrogacyWithEggDonor.benefits.title"),
              steps: [
                t("surrogacyWithEggDonor.benefits.step1"),
                t("surrogacyWithEggDonor.benefits.step2"),
                t("surrogacyWithEggDonor.benefits.step3"),
              ],
            },
          ],
        };
      case "eggFreezing":
        return {
          title: t("eggFreezing.title"),
          description: t("eggFreezing.description"),
          sections: [
            {
              title: t("eggFreezing.process.title"),
              steps: [
                t("eggFreezing.process.step1"),
                t("eggFreezing.process.step2"),
                t("eggFreezing.process.step3"),
              ],
            },
            {
              title: t("eggFreezing.benefits.title"),
              steps: [
                t("eggFreezing.benefits.step1"),
                t("eggFreezing.benefits.step2"),
                t("eggFreezing.benefits.step3"),
              ],
            },
          ],
        };
      case "vipConciergeServices":
        return {
          title: t("vipConciergeServices.title"),
          description: t("vipConciergeServices.description"),
          sections: [
            {
              title: t("vipConciergeServices.services.title"),
              steps: [
                t("vipConciergeServices.services.step1"),
                t("vipConciergeServices.services.step2"),
                t("vipConciergeServices.services.step3"),
              ],
            },
            {
              title: t("vipConciergeServices.benefits.title"),
              steps: [
                t("vipConciergeServices.benefits.step1"),
                t("vipConciergeServices.benefits.step2"),
                t("vipConciergeServices.benefits.step3"),
              ],
            },
          ],
        };
      default:
        return {
          title: "",
          description: "",
          sections: [],
        };
    }
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
    </section>
  );
};

export default Programs;
