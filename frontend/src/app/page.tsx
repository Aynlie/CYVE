'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRoadmap } from '@/context/RoadmapContext';
import { useCalendar } from '@/context/CalendarContext';
import styles from './page.module.css';

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
            {/* Hero Section */}
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
                        Cybersecurity is one of the most in-demand and impactful careers in today&apos;s digital world.
                        Whether you&apos;re a student, career shifter, or tech enthusiast, our platform provides clear,
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
                </div>
            </section>
        </div>
    );
}

function LoggedInHome({ user, progress, upcomingTasks }: { user: any; progress: number; upcomingTasks: any[] }) {
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
                        <div className={styles.statIcon}>🎯</div>
                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Roadmap Progress</p>
                            <p className={styles.statValue}>{progress}%</p>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>✅</div>
                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Tasks Today</p>
                            <p className={styles.statValue}>{todayTasks.length}</p>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>📚</div>
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
