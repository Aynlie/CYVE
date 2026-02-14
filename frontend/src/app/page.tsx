'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRoadmap } from '@/context/RoadmapContext';
import { useCalendar } from '@/context/CalendarContext';
import styles from './page.module.css';
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes

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
    return (
        <div className={styles.page}>
<<<<<<< Updated upstream
            {/* Hero Section - Figma order: search, tagline, title, subtitle, description */}
=======
            {/* Hero Section */}
>>>>>>> Stashed changes
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.searchArea}>
                        <div className={styles.searchBar}>
                            <span className={styles.searchPlaceholder}>SEARCH</span>
                        </div>
                        <p className={styles.tagline}>CREATE. CONNECT. PROTECT.</p>
                    </div>
                    <h1 className={styles.heroTitle}>build, your, future</h1>
                    <p className={styles.heroSubtitle}>Your Roadmap Starts Here</p>
                    <p className={styles.heroDescription}>
<<<<<<< Updated upstream
                        Cybersecurity is one of the most in-demand and impactful careers in today&apos;s digital world.
                        Whether you&apos;re a student, career shifter, or tech enthusiast, our platform provides clear,
=======
                        Cybersecurity is one of the most in-demand and impactful careers in today's digital world.
                        Whether you're a student, career shifter, or tech enthusiast, our platform provides clear,
>>>>>>> Stashed changes
                        step-by-step roadmaps to help you navigate your journey into the field of cybersecurity.
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link href="/signup" className="btn btn-primary btn-large">
                            Get Started Free
                        </Link>
                        <Link href="/league" className="btn btn-secondary btn-large">
                            Explore Teams
                        </Link>
                    </div>
                </div>
            </section>

<<<<<<< Updated upstream
            {/* Red Team Section - Figma: tempImageN0l1Kc, labels Red Team / Offensive Security */}
            <section className={styles.teamSection}>
                <Link href="/league/red-team" className={styles.teamLink}>
                    <div className={styles.teamImageWrapper}>
                        <div className={styles.teamImageMain} aria-hidden />
                        <div className={styles.teamImageCard}>
                            <span className={styles.teamImagePlaceholder}>Red Team</span>
                        </div>
                        <div className={styles.teamLabels}>
                            <span className={styles.teamLabelLeft}>Red Team</span>
                            <span className={styles.teamLabelRight}>Offensive Security</span>
                        </div>
                    </div>
                </Link>
            </section>

            {/* Blue Team Section */}
            <section className={styles.teamSection}>
                <Link href="/league/blue-team" className={styles.teamLink}>
                    <div className={styles.teamImageWrapper}>
                        <div className={`${styles.teamImageMain} ${styles.teamBlue}`} aria-hidden />
                        <div className={styles.teamImageCard}>
                            <span className={styles.teamImagePlaceholder}>Blue Team</span>
                        </div>
                        <div className={styles.teamLabels}>
                            <span className={styles.teamLabelLeft}>Blue Team</span>
                            <span className={styles.teamLabelRight}>Deffensive Security</span>
                        </div>
                    </div>
                </Link>
            </section>

            {/* Purple Team Section */}
            <section className={styles.teamSection}>
                <Link href="/league/purple-team" className={styles.teamLink}>
                    <div className={styles.teamImageWrapper}>
                        <div className={`${styles.teamImageMain} ${styles.teamPurple}`} aria-hidden />
                        <div className={styles.teamImageCard}>
                            <span className={styles.teamImagePlaceholder}>Purple Team</span>
                        </div>
                        <div className={styles.teamLabels}>
                            <span className={styles.teamLabelLeft}>Purple Team</span>
                            <span className={styles.teamLabelRight}>Collaboration & Optimization</span>
                        </div>
                    </div>
                </Link>
            </section>

            {/* UniQ Section - Figma: 128px title, 4 gold rectangles with Picture of Roadmap/Map/Note/Calendar */}
            <section className={styles.featuresSection}>
                <h2 className={styles.sectionTitle}>UniQ</h2>
                <div className={styles.featureGrid}>
                    <Link href="/roadmap" className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <RoadmapIcon width={80} height={80} color="#000000" />
                        </div>
                        <h3 className={styles.featureCardTitle}>Picture of Roadmap</h3>
                    </Link>
                    <Link href="/league" className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <MapPinIcon width={80} height={80} color="#000000" />
                        </div>
                        <h3 className={styles.featureCardTitle}>Picture of Map</h3>
                    </Link>
                    <Link href="/roadmap" className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <NoteIcon width={80} height={80} color="#000000" />
                        </div>
                        <h3 className={styles.featureCardTitle}>Picture of Note Capability</h3>
                    </Link>
                    <Link href="/calendar" className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <CalendarIcon width={80} height={80} color="#000000" />
                        </div>
                        <h3 className={styles.featureCardTitle}>Picture of Calendar</h3>
                    </Link>
=======
            {/* Hero Image Section */}
            <section className={styles.heroImageSection}>
                <div className={styles.heroImageWrapper}>
                    {/* Images will be replaced with actual images */}
                    <div className={styles.heroImagePlaceholder}>
                        <span>Cybersecurity Illustration</span>
                    </div>
                    <div className={styles.imageLabels}>
                        <span className={styles.labelLeft}>Red Team</span>
                        <span className={styles.labelRight}>Offensive Security</span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.featuresSection}>
                <h2 className={styles.sectionTitle}>UniQ</h2>
                <div className={styles.featureGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>📍</div>
                        <h3>Personalized Roadmap</h3>
                        <p>Follow a structured path tailored to your cybersecurity career goals</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🗺️</div>
                        <h3>Career Map</h3>
                        <p>Discover companies and positions aligned with your skills and progress</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>📝</div>
                        <h3>Note Capability</h3>
                        <p>Track your learning with notes and custom reminders</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>📅</div>
                        <h3>Smart Calendar</h3>
                        <p>Never miss a deadline with integrated task management</p>
                    </div>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                        <div className={styles.statIcon}>
                            <TargetIcon width={40} height={40} color="#f5be1e" />
                        </div>
=======
                        <div className={styles.statIcon}>🎯</div>
>>>>>>> Stashed changes
                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Roadmap Progress</p>
                            <p className={styles.statValue}>{progress}%</p>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
<<<<<<< Updated upstream
                        <div className={styles.statIcon}>
                            <CheckCircleIcon width={40} height={40} color="#f5be1e" />
                        </div>
=======
                        <div className={styles.statIcon}>✅</div>
>>>>>>> Stashed changes
                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Tasks Today</p>
                            <p className={styles.statValue}>{todayTasks.length}</p>
                        </div>
                    </div>

                    <div className={styles.statCard}>
<<<<<<< Updated upstream
                        <div className={styles.statIcon}>
                            <LibraryIcon width={40} height={40} color="#f5be1e" />
                        </div>
=======
                        <div className={styles.statIcon}>📚</div>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
                            <span className={styles.actionIcon}>🗺️</span>
                            <span className={styles.actionText}>Continue Roadmap</span>
                        </Link>
                        <Link href="/calendar" className={styles.actionCard}>
                            <span className={styles.actionIcon}>📅</span>
                            <span className={styles.actionText}>View Calendar</span>
                        </Link>
                        <Link href="/league" className={styles.actionCard}>
                            <span className={styles.actionIcon}>🛡️</span>
                            <span className={styles.actionText}>Explore Teams</span>
                        </Link>
                        <Link href="/profile" className={styles.actionCard}>
                            <span className={styles.actionIcon}>👤</span>
>>>>>>> Stashed changes
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
