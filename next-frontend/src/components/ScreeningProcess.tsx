import ProcessStep from "@/components/ProcessStep";
import { useTranslation } from "react-i18next";

interface ScreeningProcessProps {
  screeningProcessSteps: {
    stepTitle: string;
    stepContent: string;
    stepIcon: React.ReactNode;
  }[];
}

const ScreeningProcess = ({ screeningProcessSteps }: ScreeningProcessProps) => {
  const { t } = useTranslation();

  return (
    <section className="section screening-process">
      <div className="content">
        <h2 className="title">{t("screening.title")}</h2>
        <p className="subtitle">{t("screening.subtitle")}</p>
      </div>

      <div className="processTimeline">
        {screeningProcessSteps.map((step, index) => (
          <ProcessStep
            key={index}
            stepTitle={step.stepTitle}
            stepContent={step.stepContent}
            stepNumber={index + 1}
            stepIcon={step.stepIcon}
          />
        ))}
      </div>
    </section>
  );
};

export default ScreeningProcess;
