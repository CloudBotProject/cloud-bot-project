import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Layout.module.css";
import PropTypes from "prop-types";

const Navbar = ({ signOut }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className={`${styles.navbar} ${scrolled ? styles.navScrolled : ""}`}>
                <div className={styles.logoContainer}>
                    <div className={styles.cloudIcon}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <h1 className={styles.logo}>CloudBot</h1>
                </div>

                <div
                    className={styles.mobileMenuToggle}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`${styles.navLinks} ${menuOpen ? styles.menuOpen : ""}`}>
                    <li>
                        <Link to="/" className={styles.navLink}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className={styles.navLink}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className={styles.navLink}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={signOut}
                            className={`${styles.navLink} ${styles.logoutBtn}`}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>

            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h2 className={styles.headerTitle}>
                        Welcome to the CloudBot Assistant
                    </h2>
                    <p className={styles.headerSubtitle}>
                        Your intelligent cloud management companion
                    </p>
                    <div className={styles.headerGraphic}>
                        <div className={styles.cloudCluster}>
                            <div className={styles.cloud}></div>
                            <div className={styles.cloud}></div>
                            <div className={styles.cloud}></div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

Navbar.propTypes = {
    signOut: PropTypes.func.isRequired,
};

export default Navbar;
