"use client";

import { FaHandshake, FaClipboardCheck, FaFileSignature } from "react-icons/fa";
import ScreeningProcess from "@/components/ScreeningProcess";
import { useTranslation } from "react-i18next";

const ParentScreening = () => {
  const { t } = useTranslation();

  const screeningProcessSteps = [
    {
      stepTitle: t("screening.parent.consultation.title"),
      stepContent: t("screening.parent.consultation.content"),
      stepIcon: <FaHandshake />,
    },
    {
      stepTitle: t("screening.parent.review.title"),
      stepContent: t("screening.parent.review.content"),
      stepIcon: <FaClipboardCheck />,
    },
    {
      stepTitle: t("screening.parent.legal.title"),
      stepContent: t("screening.parent.legal.content"),
      stepIcon: <FaFileSignature />,
    },
  ];

  return <ScreeningProcess screeningProcessSteps={screeningProcessSteps} />;
};

export default ParentScreening;
