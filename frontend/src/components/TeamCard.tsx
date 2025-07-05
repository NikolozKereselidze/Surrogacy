import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";
import Button from "./Button";

interface TeamMember {
  image: string;
  honorific: string;
  name: string;
  role: string;
  description?: string;
}

const TeamCard = ({ member }: { member: TeamMember }) => (
  <Link
    to={`/team/${member.name.toLowerCase().replace(/\s+/g, "-")}`}
    className={styles.ourTeamCardLink}
  >
    <div className={styles.ourTeamCard} key={member.name}>
      <img
        src={member.image}
        alt={member.name}
        className={styles.ourTeamImage}
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
      <Link to={`/team/${member.name.toLowerCase().replace(/\s+/g, "-")}`}>
        <Button className={styles.ourTeamButton}>Read More</Button>
      </Link>
    </div>
  </Link>
);
export default TeamCard;
