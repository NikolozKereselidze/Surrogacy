import styles from "../../styles/AdminDashboard.module.css";
import { FaBlog, FaUser, FaUserPlus } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [blogPostsCount, setBlogPostsCount] = useState(0);

  useEffect(() => {
    const fetchBlogPostsCount = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blog/count");
        const data = await response.json();
        setBlogPostsCount(data.count);
      } catch (error) {
        console.error("Error fetching blog posts count:", error);
        setBlogPostsCount(0);
      }
    };

    fetchBlogPostsCount();
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
            <p className={styles.statCardValue}>28</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statCardIcon}>
            <FaUserPlus />
          </div>
          <div className={styles.statCardContent}>
            <h2 className={styles.statCardTitle}>Sperm Donors</h2>
            <p className={styles.statCardValue}>15</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statCardIcon}>
            <MdFamilyRestroom />
          </div>
          <div className={styles.statCardContent}>
            <h2 className={styles.statCardTitle}>Surrogates</h2>
            <p className={styles.statCardValue}>34</p>
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
