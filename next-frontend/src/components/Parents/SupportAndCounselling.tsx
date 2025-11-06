"use client";

import {
  FaHeart,
  FaUsers,
  FaShieldAlt,
  FaComments,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import RequirementsCard from "@/components/RequirementsCard";
import styles from "@/styles/Parents/SupportAndCounselling.module.css";

const SupportAndCounselling = () => {
  const { t } = useTranslation();

  const cards = [
    {
      icon: FaHeart,
      title: t("supportAndCounselling.cards.emotional.title"),
      text: t("supportAndCounselling.cards.emotional.description"),
    },
    {
      icon: FaUsers,
      title: t("supportAndCounselling.cards.community.title"),
      text: t("supportAndCounselling.cards.community.description"),
    },
    {
      icon: FaShieldAlt,
      title: t("supportAndCounselling.cards.legal.title"),
      text: t("supportAndCounselling.cards.legal.description"),
    },
    {
      icon: FaComments,
      title: t("supportAndCounselling.cards.counselling.title"),
      text: t("supportAndCounselling.cards.counselling.description"),
    },
    {
      icon: FaDollarSign,
      title: t("supportAndCounselling.cards.financial.title"),
      text: t("supportAndCounselling.cards.financial.description"),
    },
    {
      icon: FaClock,
      title: t("supportAndCounselling.cards.support24.title"),
      text: t("supportAndCounselling.cards.support24.description"),
    },
  ];

  return (
    <section className="section">
      <div className="content">
        <h2 className="title">
          {t("submenu.intendedParents.compensationSupport")}
        </h2>
        <p className="subtitle">{t("supportAndCounselling.subtitle")}</p>
      </div>
      <div className={styles.cards}>
        {cards.map((card, index) => (
          <RequirementsCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.text}
          />
        ))}
      </div>
    </section>
  );
};

export default SupportAndCounselling;
