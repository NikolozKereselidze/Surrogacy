"use client";

import Button from "@/components/Button";
import styles from "@/styles/Home.module.css";
import { useTranslation } from "react-i18next";
import { FaBaby, FaUserPlus, FaGift } from "react-icons/fa";

import MiracleCard from "@/components/MiracleCard";
import TeamCard from "@/components/TeamCard";
import StatisticsSection from "@/components/StatisticsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProgramsOverviewSection from "@/components/ProgramsOverviewSection";
import { getFeaturedTeamMembers } from "@/data/teamMembers";
import { useMemo } from "react";
import TextContent from "@/components/TextContent";

const Home = () => {
  const { t, i18n } = useTranslation();

  // Set RTL for Hebrew
  const isRTL = i18n.language === "he";

  // Get featured team members for homepage
  const teamMembers = useMemo(() => getFeaturedTeamMembers(), []);

  return (
    <div className={styles.home} dir={isRTL ? "rtl" : "ltr"}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroHeader}>
            <h2 className={styles.heroTitle}>
              <span className={styles.highlight}>
                {t("homepage.heroTitle.together")}
              </span>
              , {t("homepage.heroTitle.weMake")}{" "}
              {t("homepage.heroTitle.miracles")}
            </h2>
            <h3 className={styles.heroSubtitle}>
              {t("homepage.heroSubtitle.compassionate")} <br />
              <span className={styles.highlight}>
                {t("homepage.heroSubtitle.tailored")}
              </span>{" "}
              {t("homepage.heroSubtitle.journey")}
            </h3>
          </div>
          <p className={styles.heroDescription}>
            {t("homepage.heroDescription")}
          </p>
          <Button className={styles.heroButton}>
            {t("homepage.startJourneyButton")}
          </Button>
        </div>
      </section>

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
              [t]
            )}
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
              [t]
            )}
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
              [t]
            )}
          />
        </div>
      </section>

      <TextContent
        reverse={true}
        title="Around the Clock Support"
        description="From the moment your application is accepted, you'll have access to our dedicated team offering round-the-clock support. Whether you have questions at midnight or need guidance on weekends, we're here to ensure your journey is smooth, comfortable, and well-supported every step of the way."
        highlightBadge="24/7 Case Management"
        eyebrow="Support"
        stats={[
          {
            label: "test test tests",
            value: "100%",
          },
        ]}
        contents={[
          {
            subtitle: "Legal & Medical Excellence",
            content:
              "Our comprehensive approach includes expert legal guidance to ensure all contracts and agreements are transparent and secure. We work with top-rated fertility clinics and medical professionals in Georgia, ensuring you receive the highest standard of medical care throughout your journey.",
          },
        ]}
        image={"/img/testing.jpg"}
      />

      <ProgramsOverviewSection />

      <TextContent
        reverse={false}
        highlightBadge="First-Hand Experience"
        title="Experienced & Compassionate Team"
        eyebrow="Experience"
        contents={[
          {
            subtitle: t("ourTeam.value1Title"),
            content: t("ourTeam.value1Desc"),
          },
          {
            subtitle: t("ourTeam.value2Title"),
            content: t("ourTeam.value2Desc"),
          },
        ]}
        image={"/img/testing.jpg"}
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

      <section className="section">
        <StatisticsSection />
      </section>
    </div>
  );
};

export default Home;
