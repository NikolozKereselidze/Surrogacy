import styles from "@/styles/Home.module.css";
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";

interface TeamMember {
  id: string;
  image: string;
  honorific: string;
  name: string;
  role: string;
  description?: string;
}

const TeamCard = ({ member }: { member: TeamMember }) => {
  const locale = useLocale();
  return (
    <Link href={`/${locale}/team/${member.id}`} className={styles.ourTeamCard}>
      <Image
        src={member.image}
        alt={member.name}
        className={styles.ourTeamImage}
        width={108}
        height={108}
      />
      <div className={styles.ourTeamInfo}>
        <h3 className={styles.ourTeamName}>
          {member.honorific} {member.name}
        </h3>
        <p className={styles.ourTeamRole}>{member.role}</p>
      </div>
      {member.description && (
        <div className={styles.ourTeamDescription}>{member.description}</div>
      )}
    </Link>
  );
};

export default memo(TeamCard);
