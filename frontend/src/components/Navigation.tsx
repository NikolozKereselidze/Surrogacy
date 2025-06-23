import styles from "../styles/Navigation.module.css";
import { IoIosArrowDown } from "react-icons/io";

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>Surrogacy</h1>
      </div>
      <ul className={styles.navigationList}>
        <li className={styles.navigationItem}>
          <a>About Us</a>
          <IoIosArrowDown size={18} className={styles.arrowIcon} />
          <ul className={styles.submenu}>
            <li>
              <a href="/our-mission">Our Mission</a>
            </li>
            <li>
              <a href="/who-we-are">Who We Are</a>
            </li>
            <li>
              <a href="/our-team">Our Team</a>
            </li>
            <li>
              <a href="/why-choose-us">Why Choose Us?</a>
            </li>
          </ul>
        </li>
        <li className={styles.navigationItem}>
          <a>Surrogates</a>
          <IoIosArrowDown size={18} className={styles.arrowIcon} />
          <ul className={styles.submenu}>
            <li>
              <a href="/surrogacy-process">Surrogacy Process</a>
            </li>
            <li>
              <a href="/who-can-become-a-surrogate">
                Who Can Become a Surrogate?
              </a>
            </li>
            <li>
              <a href="/screening-process">Screening Process</a>
            </li>
            <li>Compensation & Support</li>
            <li>
              <a href="/compensation-and-support">Compensation & Support</a>
            </li>
            <button className={styles.applyButton}>Apply Now</button>
          </ul>
        </li>
        <li className={styles.navigationItem}>
          <a>Intended Parents</a>
          <IoIosArrowDown size={18} className={styles.arrowIcon} />
          <ul className={styles.submenu}>
            <li>
              <a href="/who-can-become-a-parent">Who Can Become a Parent?</a>
            </li>
            <li>
              <a href="/screening-process">Screening Process</a>
            </li>
            <li>
              <a href="/compensation-and-support">Compensation & Support</a>
            </li>
            <button className={styles.applyButton}>Apply Now</button>
          </ul>
        </li>
        <li className={styles.navigationItem}>
          <a>Egg Donors</a>
          <IoIosArrowDown size={18} className={styles.arrowIcon} />
          <ul className={styles.submenu}>
            <li>
              <a href="/why-become-a-donor">Why Become a Donor?</a>
            </li>
            <li>
              <a href="/who-can-apply">Who Can Apply?</a>
            </li>
            <li>
              <a href="/compensation">Compensation</a>
            </li>
            <button className={styles.applyButton}>Apply Now</button>
          </ul>
        </li>
        <li className={styles.navigationItem}>
          <a>Programs</a>
          <IoIosArrowDown size={18} className={styles.arrowIcon} />
          <ul className={styles.submenu}>
            <li>
              <a href="/surrogacy-with-own-gametes">
                Surrogacy with Own Gametes
              </a>
            </li>
            <li>
              <a href="/surrogacy-with-egg-donor">Surrogacy with Egg Donor</a>
            </li>
            <li>
              <a href="/egg-freezing-preservation">
                Egg Freezing / Preservation
              </a>
            </li>
            <li>
              <a href="/vip-concierge-services">
                VIP Concierge Services (housing, translation, transport)
              </a>
            </li>
          </ul>
        </li>
        <li className={styles.navigationItem}>
          <a>Blog</a>
        </li>
      </ul>
      <div className={styles.contactUsContainer}>
        <button className={styles.contactUsButton}>Contact Us</button>
      </div>
    </nav>
  );
};

export default Navigation;
