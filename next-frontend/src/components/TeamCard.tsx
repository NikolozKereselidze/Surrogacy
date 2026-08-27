import styles from "@/styles/Home.module.css";
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import { getTeamImageUrl } from "@/lib/teamMembers";
import type { TeamMember } from "@/types/teamMember";
const TeamCard = ({ member }: {
    member: TeamMember;
}) => {
    const locale = useLocale();
    return (<Link href={`/${locale}/team/${member.slug}`} className={styles.ourTeamCard}>
      <Image src={getTeamImageUrl(member.imagePath)} alt={member.name} className={styles.ourTeamImage} width={108} height={108}/>
      <div className={styles.ourTeamInfo}>
        <h3 className={styles.ourTeamName}>
          {member.honorific} {member.name}
        </h3>
        <p className={styles.ourTeamRole}>{member.role}</p>
      </div>
      {member.shortDescription && (<div className={styles.ourTeamDescription}>{member.shortDescription}</div>)}
    </Link>);
};
export default memo(TeamCard);
