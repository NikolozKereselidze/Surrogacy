import NavigationList from "./NavigationList";
import styles from "@/styles/Navigation/MobileNavigation.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className={styles.mobileNavButtons}>
        {/* <LanguageSwitcher isMobile={true} /> */}
        <GiHamburgerMenu
          onClick={toggleMenu}
          className={styles.hamburgerMenu}
          size={18}
        />
      </div>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <NavigationList isMobile={true} />
      </aside>
    </>
  );
};

export default MobileNavigation;
