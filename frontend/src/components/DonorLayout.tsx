import Navigation from "./Navigation";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { FaSignOutAlt } from "react-icons/fa";
import styles from "../styles/Donors.module.css";

const DonorLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, redirect to login page
      navigate("/login");
    }
  };

  return (
    <>
      <Navigation />
      <div className={styles.donorsPageContainer}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              background: "var(--color-primary)",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default DonorLayout;
