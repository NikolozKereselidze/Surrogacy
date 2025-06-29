import Button from "../components/Button";
import styles from "../styles/Home.module.css";
import { useTranslation } from "react-i18next";
import { FaBaby, FaUserPlus, FaGift } from "react-icons/fa";
import MiracleCard from "../components/MiracleCard";
import TeamCard from "../components/TeamCard";

const Home = () => {
  const { t, i18n } = useTranslation();

  // Set RTL for Hebrew
  const isRTL = i18n.language === "he";

  // Team members data
  const teamMembers = [
    {
      image: "src/assets/img/team/test-doctor.png",
      honorific: "Dr.",
      name: "Kelvin Smith",
      role: "Fertility Specialist",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      image: "src/assets/img/team/natia-devdariani.jpg",
      honorific: "Mrs.",
      name: "Natia Devdariani",
      role: "Founder & CEO",
      description:
        "Over 15 years of experience in healthcare and professional service consulting, helping families grow.  Ms. Devdariani graduated from Tbilisi State Medical University and Tbilisi State University.",
    },
    {
      image: "src/assets/img/team/test-doctor2.jpg",
      honorific: "Dr.",
      name: "Anna Smith",
      role: "Coordinator & IVF Specialist",
      description:
        "Over 15 years of experience helping families grow. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

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
        <div className={styles.beginYourMiracleContent}>
          <h2 className="title">{t("beginYourMiracle.title")}</h2>
          <p className="subtitle">{t("beginYourMiracle.subtitle")}</p>
        </div>

        <div className={styles.beginYourMiracleGrid}>
          <MiracleCard
            to="/intended-parents"
            icon={<FaBaby className={styles.beginYourMiracleIcon} />}
            title={t("beginYourMiracle.intendedParentsTitle")}
            description={t("beginYourMiracle.intendedParentsDesc")}
          />
          <MiracleCard
            to="/surrogates"
            icon={<FaUserPlus className={styles.beginYourMiracleIcon} />}
            title={t("beginYourMiracle.surrogatesTitle")}
            description={t("beginYourMiracle.surrogatesDesc")}
          />
          <MiracleCard
            to="/egg-donors"
            icon={<FaGift className={styles.beginYourMiracleIcon} />}
            title={t("beginYourMiracle.eggDonorsTitle")}
            description={t("beginYourMiracle.eggDonorsDesc")}
          />
        </div>
      </section>

      <section className={`${styles.ourTeamSection} section`}>
        <div className="content">
          <h2 className="title">{t("ourTeam.title")}</h2>
          <p className="subtitle">{t("ourTeam.subtitle")}</p>
        </div>

        <div className={styles.ourTeamGrid}>
          <TeamCard teamMembers={teamMembers} />
        </div>
      </section>
    </div>
  );
};

export default Home;
