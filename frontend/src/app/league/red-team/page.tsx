import Link from 'next/link';
import styles from '../team.module.css';

export default function RedTeamPage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Link href="/league" className={styles.backLink}>← Back to Teams</Link>

                <header className={styles.header} style={{ borderColor: '#ff4444' }}>
                    <div className={styles.icon}>🔴</div>
                    <h1>Red Team - Offensive Security</h1>
                    <p>Master the art of ethical hacking and penetration testing</p>
                </header>

                <section className={styles.section}>
                    <h2>What is Red Team?</h2>
                    <p>
                        Red Team professionals are ethical hackers who simulate real-world attacks to test an
                        organization's security defenses. They think like adversaries, identifying vulnerabilities
                        before malicious actors can exploit them.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Core Skills to Develop</h2>
                    <div className={styles.skillsGrid}>
                        <div className={styles.skillCard}>
                            <h3>🎯 Penetration Testing</h3>
                            <p>Learn to identify and exploit system vulnerabilities through authorized security testing</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>🔍 Reconnaissance</h3>
                            <p>Master information gathering techniques to understand target systems and infrastructure</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>💻 Exploit Development</h3>
                            <p>Create and customize exploits to test security controls and defenses</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>🌐 Web Application Security</h3>
                            <p>Understand OWASP Top 10 and common web application vulnerabilities</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>📱 Mobile Security</h3>
                            <p>Test iOS and Android applications for security weaknesses</p>
                        </div>
                        <div className={styles.skillCard}>
                            <h3>📡 Network Security</h3>
                            <p>Analyze network protocols and identify network-based vulnerabilities</p>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>Career Opportunities</h2>
                    <div className={styles.careerGrid}>
                        <div className={styles.careerCard}>
                            <h3>Penetration Tester</h3>
                            <p className={styles.salary}>$75,000 - $130,000/year</p>
                            <p>Conduct authorized simulated attacks on systems, networks, and applications</p>
                        </div>
                        <div className={styles.careerCard}>
                            <h3>Security Researcher</h3>
                            <p className={styles.salary}>$90,000 - $160,000/year</p>
                            <p>Discover new vulnerabilities and develop proof-of-concept exploits</p>
                        </div>
                        <div className={styles.careerCard}>
                            <h3>Red Team Operator</h3>
                            <p className={styles.salary}>$100,000 - $180,000/year</p>
                            <p>Lead full-scope adversary simulations against organizations</p>
                        </div>
                        <div className={styles.careerCard}>
                            <h3>Bug Bounty Hunter</h3>
                            <p className={styles.salary}>Variable Income</p>
                            <p>Find and report vulnerabilities in bug bounty programs</p>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>Top Companies Hiring</h2>
                    <div className={styles.companiesGrid}>
                        <div className={styles.company}>Google</div>
                        <div className={styles.company}>Microsoft</div>
                        <div className={styles.company}>Meta</div>
                        <div className={styles.company}>Amazon</div>
                        <div className={styles.company}>Apple</div>
                        <div className={styles.company}>Tesla</div>
                        <div className={styles.company}>Mandiant</div>
                        <div className={styles.company}>CrowdStrike</div>
                    </div>
                </section>

                <div className={styles.cta}>
                    <h2>Ready to Start Your Red Team Journey?</h2>
                    <Link href="/roadmap" className="btn btn-primary btn-large">
                        View Roadmap
                    </Link>
                </div>
            </div>
        </div>
    );
}
