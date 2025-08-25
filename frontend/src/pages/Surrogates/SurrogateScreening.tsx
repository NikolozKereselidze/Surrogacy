import { FaStethoscope, FaBrain, FaUserCheck } from "react-icons/fa";
import ScreeningProcess from "../../components/ScreeningProcess";
import { useTranslation } from "react-i18next";

const SurrogateScreening = () => {
  const { t } = useTranslation();

  const screeningProcessSteps = [
    {
      stepTitle: t("screening.surrogate.medical.title"),
      stepContent: t("screening.surrogate.medical.content"),
      stepIcon: <FaStethoscope />,
    },
    {
      stepTitle: t("screening.surrogate.psych.title"),
      stepContent: t("screening.surrogate.psych.content"),
      stepIcon: <FaBrain />,
    },
    {
      stepTitle: t("screening.surrogate.background.title"),
      stepContent: t("screening.surrogate.background.content"),
      stepIcon: <FaUserCheck />,
    },
  ];

  return <ScreeningProcess screeningProcessSteps={screeningProcessSteps} />;
};

export default SurrogateScreening;
