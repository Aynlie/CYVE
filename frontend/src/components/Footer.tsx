import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <h2 className={styles.logo}>CYVE</h2>
                    <p className={styles.tagline}>PATHS FOR CYBERSECURITY</p>
                    <p className={styles.description}>
                        Empowering the next generation of cybersecurity professionals
                    </p>
                </div>

                <div className={styles.links}>
                    <h4>Navigate</h4>
                    <Link href="/">Home</Link>
                    <Link href="/roadmap">Roadmap</Link>
                    <Link href="/calendar">Calendar</Link>
                    <Link href="/league">League</Link>
                </div>

                <div className={styles.links}>
                    <h4>Learn</h4>
                    <Link href="/league/red-team">Red Team</Link>
                    <Link href="/league/blue-team">Blue Team</Link>
                    <Link href="/league/purple-team">Purple Team</Link>
                </div>

                <div className={styles.links}>
                    <h4>Contact</h4>
                    <Link href="/contact">Get in Touch</Link>
                    <p className={styles.contactInfo}>Angeles City</p>
                    <p className={styles.contactInfo}>+63 000 000 0000</p>
                </div>
            </div>

            <div className={styles.bottom}>
                <p className={styles.copyright}>
                    {currentYear} CYVE. All Rights Reserved
                </p>
            </div>
        </footer>
    );
}
