import Link from 'next/link';
import styles from '../team.module.css';

export default function BlueTeamPage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Link href="/league" className={styles.backLink}>← Back to Teams</Link>

                <header className={styles.header} style={{ borderColor: '#4488ff' }}>
                    <div className={styles.icon}>🔵</div>
                    <h1>Blue Team - Defensive Security</h1>
                    <p>Protect, detect, and respond to cyber threats</p>
                </header>

                <section className={styles.section}>
                    <h2>What is Blue Team?</h2>
                    <p>
                        Blue Team professionals are the guardians of digital infrastructure. They monitor systems,
                        detect threats, respond to incidents, and implement security controls to protect organizations
                        from cyber attacks.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Core Skills to Develop</h2>
                    <div className={styles.skillsGrid}>
                        <div className={styles.skillCard}>
                            <h3>🛡️ SOC Operations</h3>
                            <p>Monitor security alerts, analyze threats, and coordinate incident response</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>🔍 Threat Detection</h3>
                            <p>Use SIEM tools and log analysis to identify security incidents</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>🚨 Incident Response</h3>
                            <p>Contain, investigate, and remediate security breaches effectively</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>📊 Security Monitoring</h3>
                            <p>Implement and manage security monitoring tools and processes</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>🔐 Access Control</h3>
                            <p>Design and implement identity and access management solutions</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>📝 Security Policies</h3>
                            <p>Develop and enforce security policies and procedures</p>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>Career Opportunities</h2>
                    <div className={styles.careerGrid}>
                        <div className={styles.careerCard}>
                            <h3>SOC Analyst</h3>
                            <p className={styles.salary}>$60,000 - $100,000/year</p>
                            <p>Monitor and analyze security events in a Security Operations Center</p>
                        </div>
                        <div className={styles.careerCard}>
                            <h3>Incident Responder</h3>
                            <p className={styles.salary}>$80,000 - $140,000/year</p>
                            <p>Lead investigations and remediation of security incidents</p>
                        </div>
                        <div className={styles.careerCard}>
                            <h3>Security Engineer</h3>
                            <p className={styles.salary}>$90,000 - $160,000/year</p>
                            <p>Design and implement security systems and infrastructure</p>
                        </div>
                        <div className={styles.careerCard}>
                            <h3>Threat Hunter</h3>
                            <p className={styles.salary}>$95,000 - $170,000/year</p>
                            <p>Proactively search for advanced threats in networks</p>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>Top Companies Hiring</h2>
                    <div className={styles.companiesGrid}>
                        <div className={styles.company}>IBM</div>
                        <div className={styles.company}>Cisco</div>
                        <div className={styles.company}>Palo Alto Networks</div>
                        <div className={styles.company}>Splunk</div>
                        <div className={styles.company}>FireEye</div>
                        <div className={styles.company}>Lockheed Martin</div>
                        <div className={styles.company}>Raytheon</div>
                        <div className={styles.company}>Booz Allen</div>
                    </div>
                </section>

                <div className={styles.cta}>
                    <h2>Ready to Start Your Blue Team Journey?</h2>
                    <Link href="/roadmap" className="btn btn-primary btn-large">
                        View Roadmap
                    </Link>
                </div>
            </div>
        </div>
    );
}
