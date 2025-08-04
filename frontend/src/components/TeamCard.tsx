import styles from "../styles/Home.module.css";

interface TeamMember {
  image: string;
  honorific: string;
  name: string;
  role: string;
  description?: string;
}

const TeamCard = ({ member }: { member: TeamMember }) => (
  <a
    href={`/team/${member.name.toLowerCase().replace(/\s+/g, "-")}`}
    className={styles.ourTeamCard}
    key={member.name}
  >
    <img src={member.image} alt={member.name} className={styles.ourTeamImage} />
    <div className={styles.ourTeamInfo}>
      <h3 className={styles.ourTeamName}>
        {member.honorific} {member.name}
      </h3>
      <p className={styles.ourTeamRole}>{member.role}</p>
    </div>
    {member.description && (
      <div className={styles.ourTeamDescription}>{member.description}</div>
    )}
  </a>
);
export default TeamCard;
