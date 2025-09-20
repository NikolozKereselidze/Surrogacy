import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { teamMembers, type TeamMember } from "../../data/teamMembers";
import styles from "../../styles/TeamMemberDetails.module.css";
import { FaArrowLeft, FaEnvelope, FaLinkedin, FaUser } from "react-icons/fa";

const TeamMemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = useMemo(
    () => teamMembers.find((m: TeamMember) => m.id === id),
    [id]
  );

  const personSchema = useMemo(
    () =>
      member
        ? {
            "@context": "https://schema.org",
            "@type": "Person",
            name: `${member.honorific} ${member.name}`,
            jobTitle: member.role,
            email: `mailto:${member.email}`,
            url: `${window.location.origin}/team/${member.id}`,
            image: new URL(member.image, window.location.origin).toString(),
            sameAs: [member.linkedin],
            description: member.detailedDescription,
          }
        : null,
    [member]
  );

  const handleBack = () => {
    const ref = document.referrer;
    const sameSite = ref && ref.startsWith(window.location.origin);
    if (sameSite) {
      navigate(-1);
      return;
    }
    navigate("/our-team", { replace: true });
  };

  if (!member) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <FaUser className={styles.notFoundIcon} />
          <h1>Team Member Not Found</h1>
          <p>The team member you're looking for doesn't exist.</p>
          <button onClick={handleBack} className={styles.backButton}>
            <FaArrowLeft /> Back to Team
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.teamMemberPage}>
      {personSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      )}
      <div className={styles.backButtonContainer}>
        <button onClick={handleBack} className={styles.backButton}>
          <FaArrowLeft /> Back to Team
        </button>
      </div>

      <section className={`section ${styles.teamMemberSection}`}>
        <div className={styles.teamMemberWrapper}>
          <div className={styles.teamMemberInfo}>
            <div className={styles.teamMemberHeader}>
              <div className={styles.memberNameContainer}>
                <h1 className={styles.memberName}>
                  {member.honorific} {member.name}
                </h1>
                <p className={styles.memberRole}>{member.role}</p>
              </div>
              <div className={styles.imageContainer}>
                <img
                  src={member.image}
                  alt={`${member.honorific} ${member.name}`}
                  className={styles.memberImage}
                />
              </div>
            </div>

            <div className={styles.memberDescription}>
              <p>{member.detailedDescription}</p>
            </div>

            <div className={styles.teamMemberContact}>
              <h2 className={styles.contactTitle}>Contact Information</h2>
              <div className={styles.contactLinks}>
                <a
                  href={`mailto:${member.email}`}
                  className={styles.contactLink}
                  aria-label={`Email ${member.name}`}
                >
                  <FaEnvelope className={styles.contactIcon} />
                  <span>{member.email}</span>
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                  aria-label={`LinkedIn profile of ${member.name}`}
                >
                  <FaLinkedin className={styles.contactIcon} />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamMemberDetails;
