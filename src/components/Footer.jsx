import styles from "../styles/Layout.module.css";

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.footerContent}>
            <p>
                &copy; {new Date().getFullYear()} CloudBot - Simplifying Cloud
                Management
            </p>
        </div>
    </footer>
);

export default Footer;
