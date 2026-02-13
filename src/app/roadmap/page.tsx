'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useRoadmap } from '@/context/RoadmapContext';
import Link from 'next/link';
import styles from './roadmap.module.css';

export default function RoadmapPage() {
    return (
        <ProtectedRoute>
            <RoadmapContent />
        </ProtectedRoute>
    );
}

function RoadmapContent() {
    const { steps, selectedField, selectField, toggleStepCompletion, getProgress } = useRoadmap();

    const filteredSteps = selectedField
        ? steps.filter(s => s.field === selectedField)
        : steps;

    const teamInfo = {
        red: {
            name: 'Red Team - Offensive Security',
            description: 'Learn penetration testing, ethical hacking, and offensive security techniques',
            color: '#ff4444'
        },
        blue: {
            name: 'Blue Team - Defensive Security',
            description: 'Master defensive security, SOC operations, and incident response',
            color: '#4488ff'
        },
        purple: {
            name: 'Purple Team - Hybrid Security',
            description: 'Combine offensive and defensive skills for comprehensive security',
            color: '#a855f7'
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Your Cybersecurity Roadmap</h1>
                    <p>Follow your personalized path to success</p>
                </header>

                <div className={styles.teamSelector}>
                    <button
                        className={`${styles.teamBtn} ${!selectedField ? styles.active : ''}`}
                        onClick={() => selectField(null as any)}
                    >
                        All Paths
                    </button>
                    <button
                        className={`${styles.teamBtn} ${styles.teamRed} ${selectedField === 'red' ? styles.active : ''}`}
                        onClick={() => selectField('red')}
                    >
                        Red Team
                    </button>
                    <button
                        className={`${styles.teamBtn} ${styles.teamBlue} ${selectedField === 'blue' ? styles.active : ''}`}
                        onClick={() => selectField('blue')}
                    >
                        Blue Team
                    </button>
                    <button
                        className={`${styles.teamBtn} ${styles.teamPurple} ${selectedField === 'purple' ? styles.active : ''}`}
                        onClick={() => selectField('purple')}
                    >
                        Purple Team
                    </button>
                </div>

                {selectedField && (
                    <div className={styles.teamInfo} style={{ borderColor: teamInfo[selectedField].color }}>
                        <h2>{teamInfo[selectedField].name}</h2>
                        <p>{teamInfo[selectedField].description}</p>
                        <Link href={`/league/${selectedField}-team`} className={styles.learnMore}>
                            Learn more about {teamInfo[selectedField].name.split(' - ')[0]} →
                        </Link>
                    </div>
                )}

                <div className={styles.progressSection}>
                    <div className={styles.progressHeader}>
                        <span>Overall Progress</span>
                        <span className={styles.progressPercent}>{getProgress()}%</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${getProgress()}%` }}></div>
                    </div>
                </div>

                <div className={styles.roadmap}>
                    {filteredSteps.map((step, index) => (
                        <div key={step.id} className={styles.stepContainer}>
                            <div className={`${styles.step} ${step.completed ? styles.completed : ''}`}>
                                <div className={styles.stepNumber}>{index + 1}</div>
                                <div className={styles.stepContent}>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                    <div className={styles.stepActions}>
                                        <button
                                            className={`btn ${step.completed ? 'btn-ghost' : 'btn-primary'}`}
                                            onClick={() => toggleStepCompletion(step.id)}
                                        >
                                            {step.completed ? '✓ Completed' : 'Mark Complete'}
                                        </button>
                                        <span className={`badge ${step.field === 'red' ? 'badge-red' :
                                                step.field === 'blue' ? 'badge-blue' :
                                                    'badge-purple'
                                            }`}>
                                            {step.field.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {index < filteredSteps.length - 1 && (
                                <div className={styles.connector}></div>
                            )}
                        </div>
                    ))}
                </div>

                {getProgress() === 100 && (
                    <div className={styles.congratulations}>
                        <h2>🎉 Congratulations!</h2>
                        <p>You've completed
                            your roadmap! Check out the Career Map to see opportunities.</p>
                        <Link href="/league" className="btn btn-primary btn-large">
                            Explore Career Opportunities
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
