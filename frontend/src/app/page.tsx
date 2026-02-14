'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRoadmap } from '@/context/RoadmapContext';
import { useCalendar } from '@/context/CalendarContext';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import {
    RoadmapIcon,
    CalendarIcon,
    ShieldIcon,
    UserIcon,
    TargetIcon,
    CheckCircleIcon,
    LibraryIcon,
    NoteIcon,
    MapPinIcon
} from '@/components/Icons';

// Career Path Database
const careerDatabase = [
    {
        title: "Penetration Tester",
        team: "Red Team",
        description: "Focuses on identifying and exploiting vulnerabilities in systems, networks, and applications to help organizations improve their security posture.",
        skills: ["Ethical Hacking", "Python/Bash Scripting", "Network Security", "Metasploit", "Web App Security"],
        certs: ["OSCP", "CEH", "GPEN", "eJPT"],
        learningPath: "Learn networking basics -> Master Linux & Scripting -> Study common vulnerabilities (OWASP) -> Get OSCP certification."
    },
    {
        title: "Ethical Hacker",
        team: "Red Team",
        description: "Uses the same techniques as malicious hackers to find and patch security holes, working legally to protect organizations.",
        skills: ["Vulnerability Assessment", "Cryptography", "Reverse Engineering", "Social Engineering"],
        certs: ["CEH", "CompTIA PenTest+", "GIAC Technical Certs"],
        learningPath: "Start with CompTIA Security+ -> Learn penetration testing methodologies -> Practice on platforms like TryHackMe/HackTheBox."
    },
    {
        title: "SOC Analyst",
        team: "Blue Team",
        description: "Monitors organization's infrastructure to detect and respond to cybersecurity threats in real-time.",
        skills: ["SIEM (Splunk/ELK)", "Incident Response", "Log Analysis", "Threat Detection", "Traffic Analysis"],
        certs: ["CySA+", "GCIH", "BTL1"],
        learningPath: "Understand TCP/IP and networking -> Learn SIEM tools -> Study incident response frameworks -> Achieve CySA+."
    },
    {
        title: "Security Analyst",
        team: "Blue Team",
        description: "Analyzes security policies and technical controls to ensure an organization remains secure and compliant with standards.",
        skills: ["Risk Management", "Compliance Standards", "Firewall Management", "IAM", "Data Protection"],
        certs: ["CompTIA Security+", "SSCP", "GSEC"],
        learningPath: "Build strong IT foundation -> Master Security+ topics -> Specialize in Governance/Risk/Compliance or Technical analysis."
    },
    {
        title: "Digital Forensics",
        team: "Blue Team",
        description: "Investigates digital evidence after a security breach to understand the 'how' and 'who' behind a cybercrime.",
        skills: ["Evidence Collection", "File System Analysis", "Memory Forensics", "Malware Analysis", "Chain of Custody"],
        certs: ["GCFE", "GCFA", "CHFI", "EnCE"],
        learningPath: "Learn computer hardware & file systems -> Study forensic tools (Autopsy/FTK) -> Understand legal procedures for digital evidence."
    },
    {
        title: "Threat Intelligence Analyst",
        team: "Purple Team",
        description: "Gathers and analyzes information about current and emerging cyber threats to help organizations proactively defend themselves.",
        skills: ["OSINT", "Dark Web Monitoring", "Threat Modeling", "Indicators of Compromise (IoCs)", "Data Analysis"],
        certs: ["GCTI", "CTIA"],
        learningPath: "Learn about the cyber threat landscape -> Master OSINT techniques -> Study the Diamond Model and Lockheed Martin Kill Chain."
    },
    {
        title: "Cloud Security Specialist",
        team: "Blue/Purple Team",
        description: "Focuses on securing cloud infrastructure and services (AWS, Azure, GCP) from threats and misconfigurations.",
        skills: ["Cloud Architecture", "Identity & Access Management (IAM)", "DevSecOps", "Cloud Compliance", "Serverless Security"],
        certs: ["CCSP", "AWS Certified Security Specialty", "Azure Security Engineer"],
        learningPath: "Get a baseline cloud certification (Cloud Practitioner) -> Learn cloud-native security tools -> Implement DevSecOps pipelines."
    }
];

export default function Home() {
    const { isAuthenticated, user } = useAuth();
    const { getProgress } = useRoadmap();
    const { tasks } = useCalendar();

    if (isAuthenticated) {
        return <LoggedInHome user={user} progress={getProgress()} upcomingTasks={tasks.slice(0, 3)} />;
    }

    return <LoggedOutHome />;
}

function LoggedOutHome() {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<typeof careerDatabase>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState<typeof careerDatabase[0] | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase().trim();
        setSearchQuery(e.target.value);

        if (query.length > 0) {
            const matches = careerDatabase.filter(career =>
                career.title.toLowerCase().includes(query) ||
                career.team.toLowerCase().includes(query)
            );
            setSuggestions(matches);
            setShowSuggestions(matches.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (career: typeof careerDatabase[0]) => {
        setSelectedCareer(career);
        setSearchQuery(career.title);
        setShowSuggestions(false);
    };

    const handleCloseDetails = () => {
        setSelectedCareer(null);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.search-container')) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className={styles.page}>
            {/* Hero Section - matching index.html design */}
            <section className={styles.hero}>
                <div className={styles.heroMainTitle}>CYVE</div>
                <div className={`${styles.searchContainer} search-container`}>
                    <div className={styles.searchBar}>
                        <input 
                            type="text" 
                            className={styles.searchInput} 
                            placeholder="Search for cybersecurity pathways..." 
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {showSuggestions && (
                        <div className={styles.searchSuggestions}>
                            {suggestions.map((career, index) => (
                                <div 
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(career)}
                                    style={{
                                        padding: '1rem',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #eee',
                                        color: '#000'
                                    }}
                                >
                                    {career.title} ({career.team})
                                </div>
                            ))}
                        </div>
                    )}
                    <p className={styles.tagline}>CREATE. CONNECT. PROTECT.</p>
                </div>

                {/* Career Details Section */}
                {selectedCareer && (
                    <div className="career-details-section" style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        color: '#000',
                        padding: '2rem',
                        borderRadius: '8px',
                        margin: '2rem auto',
                        maxWidth: '800px',
                        position: 'relative'
                    }}>
                        <button 
                            onClick={handleCloseDetails}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer'
                            }}
                        >
                            ×
                        </button>
                        <h2 style={{ marginBottom: '1.5rem' }}>{selectedCareer.title}</h2>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div>
                                <h3>Description</h3>
                                <p>{selectedCareer.description}</p>
                            </div>
                            <div>
                                <h3>Required Skills</h3>
                                <ul>
                                    {selectedCareer.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3>Suggested Certifications</h3>
                                <ul>
                                    {selectedCareer.certs.map((cert, index) => (
                                        <li key={index}>{cert}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3>Recommended Learning Path</h3>
                                <p>{selectedCareer.learningPath}</p>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* Sub-Hero Section */}
            <section className={styles.subHero}>
                <div className={styles.subHeroLeft}>
                    <div className={styles.triangleGraphic}></div>
                    <div className={styles.buildText}>
                        <span>build,</span>
                        <span>your,</span>
                        <span>future</span>
                    </div>
                </div>
                <div className={styles.subHeroRight}>
                    <h2 className={styles.subHeroTitle}>Your Roadmap Starts Here</h2>
                    <p className={styles.subHeroDescription}>
                        Cybersecurity is one of the most in-demand and impactful careers in today&apos;s digital world. Whether you&apos;re a
                        student, career shifter, or tech enthusiast, our platform provides clear, step-by-step roadmaps to help you
                        navigate your journey into the field of cybersecurity.
                    </p>
                </div>
            </section>

            {/* Team Sections */}
            <section className={styles.teamSections}>
                {/* Red Team */}
                <div className={styles.teamCard}>
                    <Link href="/league/red-team" className={styles.teamLink}>
                        <div className={styles.teamContent}>
                            <div className={styles.teamFocalWrapper}>
                                <span className={styles.teamFocalImg}>Red Team</span>
                            </div>
                            <div className={styles.teamLabels}>
                                <span className={styles.teamLabelLeft}>Red Team</span>
                                <span className={styles.teamLabelRight}>Offensive Security</span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Blue Team */}
                <div className={styles.teamCard}>
                    <Link href="/league/blue-team" className={styles.teamLink}>
                        <div className={styles.teamContent}>
                            <div className={styles.teamFocalWrapper}>
                                <span className={styles.teamFocalImg}>Blue Team</span>
                            </div>
                            <div className={styles.teamLabels}>
                                <span className={styles.teamLabelLeft}>Blue Team</span>
                                <span className={styles.teamLabelRight}>Defensive Security</span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Purple Team */}
                <div className={styles.teamCard}>
                    <Link href="/league/purple-team" className={styles.teamLink}>
                        <div className={styles.teamContent}>
                            <div className={styles.teamFocalWrapper}>
                                <span className={styles.teamFocalImg}>Purple Team</span>
                            </div>
                            <div className={styles.teamLabels}>
                                <span className={styles.teamLabelLeft}>Purple Team</span>
                                <span className={styles.teamLabelRight}>Collaboration & Optimization</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
}

function LoggedInHome({ user, progress, upcomingTasks }: any) {
    const today = new Date();
    const todayTasks = upcomingTasks.filter((task: any) =>
        task.date === today.toISOString().split('T')[0]
    );

    return (
        <div className={styles.page}>
            <section className={styles.dashboard}>
                <div className={styles.dashboardHeader}>
                    <div>
                        <h1 className={styles.welcomeTitle}>Welcome back, {user?.name}!</h1>
                        <p className={styles.welcomeSubtitle}>Continue your cybersecurity journey</p>
                    </div>
                </div>

                <div className={styles.statsGrid}>
                    <div className={`${styles.statCard} ${styles.progressCard}`}>
                        <div className={styles.statIcon}>
                            <TargetIcon width={40} height={40} color="#f5be1e" />
                        </div>
                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Roadmap Progress</p>
                            <p className={styles.statValue}>{progress}%</p>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <CheckCircleIcon width={40} height={40} color="#f5be1e" />
                        </div>
                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Tasks Today</p>
                            <p className={styles.statValue}>{todayTasks.length}</p>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <LibraryIcon width={40} height={40} color="#f5be1e" />
                        </div>
                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Total Tasks</p>
                            <p className={styles.statValue}>{upcomingTasks.length}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.quickActions}>
                    <h2 className={styles.sectionHeading}>Quick Actions</h2>
                    <div className={styles.actionGrid}>
                        <Link href="/roadmap" className={styles.actionCard}>
                            <span className={styles.actionIcon}>
                                <RoadmapIcon width={32} height={32} color="#f5be1e" />
                            </span>
                            <span className={styles.actionText}>Continue Roadmap</span>
                        </Link>
                        <Link href="/calendar" className={styles.actionCard}>
                            <span className={styles.actionIcon}>
                                <CalendarIcon width={32} height={32} color="#f5be1e" />
                            </span>
                            <span className={styles.actionText}>View Calendar</span>
                        </Link>
                        <Link href="/league" className={styles.actionCard}>
                            <span className={styles.actionIcon}>
                                <ShieldIcon width={32} height={32} color="#f5be1e" />
                            </span>
                            <span className={styles.actionText}>Explore Teams</span>
                        </Link>
                        <Link href="/profile" className={styles.actionCard}>
                            <span className={styles.actionIcon}>
                                <UserIcon width={32} height={32} color="#f5be1e" />
                            </span>
                            <span className={styles.actionText}>Edit Profile</span>
                        </Link>
                    </div>
                </div>

                {upcomingTasks.length > 0 && (
                    <div className={styles.upcomingSection}>
                        <h2 className={styles.sectionHeading}>Upcoming Tasks</h2>
                        <div className={styles.tasksList}>
                            {upcomingTasks.map((task: any) => (
                                <div key={task.id} className={styles.taskItem}>
                                    <div className={styles.taskDate}>
                                        {new Date(task.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </div>
                                    <div className={styles.taskDetails}>
                                        <h4>{task.title}</h4>
                                        <p>{task.description}</p>
                                    </div>
                                    <div className={styles.taskStatus}>
                                        {task.completed ? (
                                            <span className="badge badge-blue">Completed</span>
                                        ) : (
                                            <span className="badge badge-outline">Pending</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
