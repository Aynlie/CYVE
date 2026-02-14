<<<<<<< Updated upstream
import Link from 'next/link';
import styles from '../team.module.css';

export default function PurpleTeamPage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Link href="/league" className={styles.backLink}>← Back to Teams</Link>

                <header className={styles.header} style={{ borderColor: '#a855f7' }}>
                    <div className={styles.icon}>🟣</div>
                    <h1>Purple Team - Hybrid Security</h1>
                    <p>Combine offensive and defensive expertise for maximum impact</p>
                </header>

                <section className={styles.section}>
                    <h2>What is Purple Team?</h2>
                    <p>
                        Purple Team professionals bridge the gap between Red and Blue teams, combining offensive
                        testing with defensive strategy. They facilitate collaboration, improve security posture,
                        and ensure continuous security improvement through shared knowledge.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Core Skills to Develop</h2>
                    <div className={styles.skillsGrid}>
                        <div className={styles.skillCard}>
                            <h3>🔄 Collaboration</h3>
                            <p>Facilitate communication between offensive and defensive teams</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>📈 Threat Intelligence</h3>
                            <p>Analyze and apply threat intelligence to improve security posture</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>🧪 Security Testing</h3>
                            <p>Design and execute comprehensive security testing programs</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>📊 Metrics & Reporting</h3>
                            <p>Measure and communicate security effectiveness to stakeholders</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>🎓 Training & Education</h3>
                            <p>Develop and deliver security training for team members</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>🔧 Tool Integration</h3>
                            <p>Integrate offensive and defensive tools for better visibility</p>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>Career Opportunities</h2>
                    <div className={styles.careerGrid}>
                        <div className={styles.careerCard}>
                            <h3>Purple Team Lead</h3>
                            <p className={styles.salary}>$110,000 - $180,000/year</p>
                            <p>Coordinate collaboration between Red and Blue teams</p>
                        </div>
                        <div className={styles.careerCard}>
                            <h3>Security Consultant</h3>
                            <p className={styles.salary}>$100,000 - $170,000/year</p>
                            <p>Provide comprehensive security guidance to organizations</p>
                        </div>
                        <div className={styles.careerCard}>
                            <h3>Security Architect</h3>
                            <p className={styles.salary}>$120,000 - $200,000/year</p>
                            <p>Design holistic security architectures combining all aspects</p>
                        </div>
                        <div className={styles.careerCard}>
                            <h3>Threat Intelligence Analyst</h3>
                            <p className={styles.salary}>$85,000 - $150,000/year</p>
                            <p>Analyze threats and translate findings into actionable defenses</p>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>Top Companies Hiring</h2>
                    <div className={styles.companiesGrid}>
                        <div className={styles.company}>Deloitte</div>
                        <div className={styles.company}>PwC</div>
                        <div className={styles.company}>Accenture</div>
                        <div className={styles.company}>KPMG</div>
                        <div className={styles.company}>EY</div>
                        <div className={styles.company}>NCC Group</div>
                        <div className={styles.company}>Bishop Fox</div>
                        <div className={styles.company}>Rapid7</div>
                    </div>
                </section>

                <div className={styles.cta}>
                    <h2>Ready to Start Your Purple Team Journey?</h2>
                    <Link href="/roadmap" className="btn btn-primary btn-large">
                        View Roadmap
                    </Link>
                </div>
            </div>
        </div>
    );
}
=======
import Link from 'next/link';
import styles from '../team.module.css';

export default function PurpleTeamPage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Link href="/league" className={styles.backLink}>← Back to Teams</Link>

                <header className={styles.header} style={{ borderColor: '#a855f7' }}>
                    <div className={styles.icon}>🟣</div>
                    <h1>Purple Team - Hybrid Security</h1>
                    <p>Combine offensive and defensive expertise for maximum impact</p>
                </header>

                <section className={styles.section}>
                    <h2>What is Purple Team?</h2>
                    <p>
                        Purple Team professionals bridge the gap between Red and Blue teams, combining offensive
                        testing with defensive strategy. They facilitate collaboration, improve security posture,
                        and ensure continuous security improvement through shared knowledge.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Core Skills to Develop</h2>
                    <div className={styles.skillsGrid}>
                        <div className={styles.skillCard}>
                            <h3>🔄 Collaboration</h3>
                            <p>Facilitate communication between offensive and defensive teams</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>📈 Threat Intelligence</h3>
                            <p>Analyze and apply threat intelligence to improve security posture</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>🧪 Security Testing</h3>
                            <p>Design and execute comprehensive security testing programs</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>📊 Metrics & Reporting</h3>
                            <p>Measure and communicate security effectiveness to stakeholders</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>🎓 Training & Education</h3>
                            <p>Develop and deliver security training for team members</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>🔧 Tool Integration</h3>
                            <p>Integrate offensive and defensive tools for better visibility</p>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>Career Opportunities</h2>
                    <div className={styles.careerGrid}>
                        <div className={styles.careerCard}>
                            <h3>Purple Team Lead</h3>
                            <p className={styles.salary}>$110,000 - $180,000/year</p>
                            <p>Coordinate collaboration between Red and Blue teams</p>
                        </div>
                        <div className={styles.careerCard}>
                            <h3>Security Consultant</h3>
                            <p className={styles.salary}>$100,000 - $170,000/year</p>
                            <p>Provide comprehensive security guidance to organizations</p>
                        </div>
                        <div className={styles.careerCard}>
                            <h3>Security Architect</h3>
                            <p className={styles.salary}>$120,000 - $200,000/year</p>
                            <p>Design holistic security architectures combining all aspects</p>
                        </div>
                        <div className={styles.careerCard}>
                            <h3>Threat Intelligence Analyst</h3>
                            <p className={styles.salary}>$85,000 - $150,000/year</p>
                            <p>Analyze threats and translate findings into actionable defenses</p>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>Top Companies Hiring</h2>
                    <div className={styles.companiesGrid}>
                        <div className={styles.company}>Deloitte</div>
                        <div className={styles.company}>PwC</div>
                        <div className={styles.company}>Accenture</div>
                        <div className={styles.company}>KPMG</div>
                        <div className={styles.company}>EY</div>
                        <div className={styles.company}>NCC Group</div>
                        <div className={styles.company}>Bishop Fox</div>
                        <div className={styles.company}>Rapid7</div>
                    </div>
                </section>

                <div className={styles.cta}>
                    <h2>Ready to Start Your Purple Team Journey?</h2>
                    <Link href="/roadmap" className="btn btn-primary btn-large">
                        View Roadmap
                    </Link>
                </div>
            </div>
        </div>
    );
}
>>>>>>> Stashed changes
