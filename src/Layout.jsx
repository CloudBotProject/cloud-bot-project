import { useState, useEffect } from 'react';
import styles from './styles/Layout.module.css';
import PropTypes from 'prop-types';

const Layout = ({ children, signOut }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div className={styles.container}>
      <nav className={`${styles.navbar} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.logoContainer}>
          <div className={styles.cloudIcon}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1 className={styles.logo}>CloudBot</h1>
        </div>
        
        <div className={styles.mobileMenuToggle} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={`${styles.navLinks} ${menuOpen ? styles.menuOpen : ''}`}>
          <li><a href="/" className={styles.navLink}>Home</a></li>
          <li><a href="/dashboard" className={styles.navLink} onClick={signOut}>Dashboard</a></li>

          <li><button onClick={signOut} className={`${styles.navLink} ${styles.logoutBtn}`}>Logout</button></li>
        </ul>
      </nav>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.headerTitle}>Welcome to the CloudBot Assistant</h2>
          <p className={styles.headerSubtitle}>Your intelligent cloud management companion</p>
          <div className={styles.headerGraphic}>
            <div className={styles.cloudCluster}>
              <div className={styles.cloud}></div>
              <div className={styles.cloud}></div>
              <div className={styles.cloud}></div>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainContent}>
          {children}
        </div>
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; {new Date().getFullYear()} CloudBot - Simplifying Cloud Management</p>
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  signOut: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Layout;