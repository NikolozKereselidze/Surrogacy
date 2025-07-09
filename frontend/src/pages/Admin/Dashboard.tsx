import styles from "../../styles/AdminDashboard.module.css";
import { FaBlog, FaUser, FaUserPlus } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [blogPostsCount, setBlogPostsCount] = useState(0);
  const [eggDonorsCount, setEggDonorsCount] = useState(0);
  const [spermDonorsCount, setSpermDonorsCount] = useState(0);
  const [surrogatesCount, setSurrogatesCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [blogResponse, eggResponse, spermResponse, surrogateResponse] =
          await Promise.all([
            fetch("http://localhost:3000/api/blog/count"),
            fetch("http://localhost:3000/api/egg-donors/count"),
            fetch("http://localhost:3000/api/sperm-donors/count"),
            fetch("http://localhost:3000/api/surrogates/count"),
          ]);

        const [blogData, eggData, spermData, surrogateData] = await Promise.all(
          [
            blogResponse.json(),
            eggResponse.json(),
            spermResponse.json(),
            surrogateResponse.json(),
          ]
        );

        setBlogPostsCount(blogData.count);
        setEggDonorsCount(eggData.count);
        setSpermDonorsCount(spermData.count);
        setSurrogatesCount(surrogateData.count);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className={styles.dashboardContent}>
      <h1 className={styles.dashboardWelcome}>
        Welcome, <span>Admin</span>
      </h1>
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statCardIcon}>
            <FaBlog />
          </div>
          <div className={styles.statCardContent}>
            <h2 className={styles.statCardTitle}>Blog Posts</h2>
            <p className={styles.statCardValue}>{blogPostsCount}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statCardIcon}>
            <FaUser />
          </div>
          <div className={styles.statCardContent}>
            <h2 className={styles.statCardTitle}>Egg Donors</h2>
            <p className={styles.statCardValue}>{eggDonorsCount}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statCardIcon}>
            <FaUserPlus />
          </div>
          <div className={styles.statCardContent}>
            <h2 className={styles.statCardTitle}>Sperm Donors</h2>
            <p className={styles.statCardValue}>{spermDonorsCount}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statCardIcon}>
            <MdFamilyRestroom />
          </div>
          <div className={styles.statCardContent}>
            <h2 className={styles.statCardTitle}>Surrogates</h2>
            <p className={styles.statCardValue}>{surrogatesCount}</p>
          </div>
        </div>
      </div>
      <div className={styles.quickActions}>
        <button className={styles.quickActionBtn}>Add New Blog Post</button>
        <button className={styles.quickActionBtn}>Add Egg Donor</button>
        <button className={styles.quickActionBtn}>Add Surrogate</button>
        <button className={styles.quickActionBtn}>Add Sperm Donor</button>
      </div>
      <div className={styles.recentActivity}>
        <h2>Recent Activity</h2>
        <ul>
          <li>Blog post "Surrogacy 101" added</li>
          <li>Egg donor Jane Doe approved</li>
          <li>Surrogate application from Anna Smith received</li>
          <li>Sperm donor John Doe profile updated</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
