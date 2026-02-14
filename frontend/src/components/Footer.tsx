import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Figma: large C Y V E letters */}
                <div className={styles.brand}>
                    <div className={styles.logoLetters}>
                        <span className={styles.letterC}>C</span>
                        <span className={styles.letterY}>Y</span>
                        <span className={styles.letterV}>V</span>
                        <span className={styles.letterE}>E</span>
                    </div>
                </div>

                <div className={styles.linksColumn}>
                    <p className={styles.contactInfo}>+63 000 000 0000</p>
                    <p className={styles.contactInfo}>Angeles City</p>
                </div>

                <div className={styles.linksColumn}>
                    <h4 className={styles.linksHeading}>Roadmap</h4>
                    <Link href="/roadmap">Roadmap</Link>
                    <Link href="/calendar">Calendar</Link>
                    <Link href="/roadmap">Recommendation</Link>
                </div>

                <div className={styles.linksColumn}>
                    <h4 className={styles.linksHeading}>Contact Us</h4>
                    <Link href="/contact">Contact Us</Link>
                    <h4 className={styles.linksHeading}>Follow Us</h4>
                    <p className={styles.contactInfo}>+63 000 000 0000</p>
                    <p className={styles.contactInfo}>Angeles City</p>
                </div>
            </div>

            <div className={styles.bottom}>
                <p className={styles.copyright}>
                    2026 CYVE. All Rights Reserved
                </p>
            </div>
        </footer>
    );
}
