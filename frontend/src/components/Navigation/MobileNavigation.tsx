import NavigationList from "./NavigationList";
import styles from "../../styles/MobileNavigation.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import LanguageSwitcher from "../LanguageSwitcher";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className={styles.mobileNavButtons}>
        <LanguageSwitcher isMobile={true} />
        <GiHamburgerMenu
          onClick={toggleMenu}
          className={styles.hamburgerMenu}
          size={18}
        />
      </div>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <IoClose
          className={styles.closeButton}
          onClick={toggleMenu}
          size={22}
        />
        <NavigationList isMobile={true} />
      </aside>
    </>
  );
};

export default MobileNavigation;
