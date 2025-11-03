import NavigationList from "./NavigationList";
import styles from "@/styles/Navigation/MobileNavigation.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Close menu when clicking outside (on overlay)
  const handleOverlayClick = () => {
    closeMenu();
  };

  return (
    <>
      <div className={styles.mobileNavButtons}>
        {/* <LanguageSwitcher isMobile={true} /> */}
        <GiHamburgerMenu
          onClick={toggleMenu}
          className={styles.hamburgerMenu}
          size={24}
          aria-label="Open menu"
        />
      </div>
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        onClick={handleOverlayClick}
      />
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
        role="dialog"
        aria-modal={isOpen}
        aria-label="Mobile navigation"
      >
        <div className={styles.sidebarHeader}>
          <span className={styles.sidebarTitle}>Menu</span>
          <button
            type="button"
            onClick={closeMenu}
            className={styles.closeButton}
            aria-label="Close menu"
          >
            <IoClose size={24} className={styles.closeIcon} />
          </button>
        </div>
        <NavigationList isMobile={true} onLinkClick={closeMenu} />
      </aside>
    </>
  );
};

export default MobileNavigation;
