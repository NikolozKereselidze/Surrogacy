"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { useLocale } from "@/hooks/useLocale";
import { getTeamImageUrl } from "@/lib/teamMembers";
import type { TeamMember } from "@/types/teamMember";
import styles from "@/styles/Team/TeamMemberDetails.module.css";

const TeamMemberDetails = ({ member }: { member: TeamMember }) => {
  const router = useRouter();
  const locale = useLocale();
  const imageUrl = getTeamImageUrl(member.imagePath);
  const personSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${member.honorific} ${member.name}`,
    jobTitle: member.role,
    ...(member.email ? { email: `mailto:${member.email}` } : {}),
    url: `https://www.ivftourgeorgia.com/${locale}/team/${member.slug}`,
    image: imageUrl.startsWith("http") ? imageUrl : `https://www.ivftourgeorgia.com${imageUrl}`,
    ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
    description: member.longDescription,
  }), [imageUrl, locale, member]);

  const handleBack = () => {
    const sameSite = document.referrer?.startsWith(window.location.origin);
    if (sameSite) router.back();
    else router.push(`/${locale}/our-team`);
  };

  return (<div className={styles.teamMemberPage}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
    <div className={styles.backButtonContainer}>
      <button onClick={handleBack} className={styles.backButton}><FaArrowLeft /> Back to Team</button>
    </div>
    <section className={`section ${styles.teamMemberSection}`}>
      <div className={styles.teamMemberWrapper}>
        <div className={styles.teamMemberInfo}>
          <div className={styles.teamMemberHeader}>
            <div className={styles.memberNameContainer}>
              <h1 className={styles.memberName}>{member.honorific} {member.name}</h1>
              <p className={styles.memberRole}>{member.role}</p>
            </div>
            <div className={styles.imageContainer}>
              <Image src={imageUrl} alt={`${member.honorific} ${member.name}`} className={styles.memberImage} width={108} height={108} />
            </div>
          </div>
          <div className={styles.memberDescription}><p>{member.longDescription}</p></div>
          {(member.email || member.linkedin) && <div className={styles.teamMemberContact}>
            <h2 className={styles.contactTitle}>Contact Information</h2>
            <div className={styles.contactLinks}>
              {member.email && <a href={`mailto:${member.email}`} className={styles.contactLink} aria-label={`Email ${member.name}`}><FaEnvelope className={styles.contactIcon}/><span>{member.email}</span></a>}
              {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactLink} aria-label={`LinkedIn profile of ${member.name}`}><FaLinkedin className={styles.contactIcon}/><span>LinkedIn Profile</span></a>}
            </div>
          </div>}
        </div>
      </div>
    </section>
  </div>);
};

export default TeamMemberDetails;
