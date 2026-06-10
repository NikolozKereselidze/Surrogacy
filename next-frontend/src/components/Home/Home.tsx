"use client";

import styles from "@/styles/Home.module.css";
import { useTranslation } from "react-i18next";
import { FaBaby, FaUserPlus, FaGift } from "react-icons/fa";

import MiracleCard from "@/components/MiracleCard";
import PageCtaSection from "@/components/PageCtaSection/PageCtaSection";
import TeamCard from "@/components/TeamCard";
import StatisticsSection from "@/components/StatisticsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProgramsOverviewSection from "@/components/ProgramsOverviewSection";
import FaqSection from "@/components/FaqSection/FaqSection";
import { getFeaturedTeamMembers } from "@/data/teamMembers";
import { useMemo } from "react";
import TextContent from "@/components/TextContent";
import { useLocale } from "@/hooks/useLocale";

const Home = () => {
  const { t, i18n } = useTranslation();
  const locale = useLocale();

  const isRTL = i18n.language === "he";

  const teamMembers = useMemo(() => getFeaturedTeamMembers(), []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const localePrefix = `/${locale}`;

  return (
    <div className={styles.home} dir={isRTL ? "rtl" : "ltr"}>
      <section className={`${styles.beginYourMiracleSection} section`}>
        <div className="content">
          <h2 className="title">{t("beginYourMiracle.title")}</h2>
          <p className="subtitle">{t("beginYourMiracle.subtitle")}</p>
        </div>

        <div className={styles.beginYourMiracleGrid}>
          <MiracleCard
            icon={<FaBaby className="miracleIcon" />}
            title={t("beginYourMiracle.intendedParentsTitle")}
            description={t("beginYourMiracle.intendedParentsDesc")}
            list={useMemo(
              () =>
                t("beginYourMiracle.intendedParentsList", {
                  returnObjects: true,
                }) as string[],
              [t],
            )}
            href={`/${locale}/surrogacy-in-georgia`}
            buttonText={t("beginYourMiracle.intendedParentsCta")}
          />
          <MiracleCard
            icon={<FaUserPlus className="miracleIcon" />}
            title={t("beginYourMiracle.surrogatesTitle")}
            description={t("beginYourMiracle.surrogatesDesc")}
            list={useMemo(
              () =>
                t("beginYourMiracle.surrogatesList", {
                  returnObjects: true,
                }) as string[],
              [t],
            )}
            href={`/${locale}/who-can-become-a-surrogate`}
            buttonText={t("beginYourMiracle.surrogatesCta")}
          />
          <MiracleCard
            icon={<FaGift className="miracleIcon" />}
            title={t("beginYourMiracle.eggDonorsTitle")}
            description={t("beginYourMiracle.eggDonorsDesc")}
            list={useMemo(
              () =>
                t("beginYourMiracle.eggDonorsList", {
                  returnObjects: true,
                }) as string[],
              [t],
            )}
            href={`/${locale}/why-become-a-donor`}
            buttonText={t("beginYourMiracle.eggDonorsCta")}
          />
        </div>
      </section>

      <TextContent
        reverse={true}
        title={t("homepage.supportSection.title")}
        description={t("homepage.supportSection.description")}
        highlightBadge={t("homepage.supportSection.highlightBadge")}
        eyebrow={t("homepage.supportSection.eyebrow")}
        contents={[
          {
            subtitle: t("homepage.supportSection.subtitle"),
            content: t("homepage.supportSection.content"),
          },
        ]}
        image={{
          src: "/img/home/textContent/child.webp",
          alt: t("homepage.supportSection.imageAlt"),
        }}
      />

      <ProgramsOverviewSection />

      <TextContent
        reverse={false}
        highlightBadge={t("homepage.experienceSection.highlightBadge")}
        title={t("homepage.experienceSection.title")}
        description={t("homepage.experienceSection.description")}
        eyebrow={t("homepage.experienceSection.eyebrow")}
        contents={[
          {
            subtitle: t("homepage.experienceSection.value1Title"),
            content: t("homepage.experienceSection.value1Content"),
          },
          {
            subtitle: t("homepage.experienceSection.value2Title"),
            content: t("homepage.experienceSection.value2Content"),
          },
        ]}
        image={{
          src: "/img/home/textContent/surrogate-mother.webp",
          alt: t("homepage.experienceSection.imageAlt"),
        }}
      />

      <section className={`${styles.ourTeamSection} section`}>
        <div className="content">
          <h2 className="title">{t("ourTeam.title")}</h2>
          <p className="subtitle">{t("ourTeam.subtitle")}</p>
        </div>
        <div className={styles.ourTeamGrid}>
          {teamMembers.map((member, index) => (
            <TeamCard key={`${member.name}-${index}`} member={member} />
          ))}
        </div>
      </section>

      <TestimonialsSection />

      <FaqSection
        id="homepage-faq-title"
        idPrefix="homepage-faq"
        translationKey="homepage.faq"
      />

      <PageCtaSection
        id="homepage-cta-title"
        translationKey="homepage.cta"
        localePrefix={localePrefix}
        onPrimaryClick={scrollToContact}
      />

      <section className="section">
        <StatisticsSection />
      </section>
    </div>
  );
};

export default Home;
