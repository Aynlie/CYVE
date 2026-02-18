'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './league.module.css';

interface TeamCard {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    role: string;
    tasks: string[];
    color: string;
    link: string;
    gradient: string;
}

const teams: TeamCard[] = [
    {
        id: 'red',
        name: 'Red Team',
        subtitle: 'Offensive Security',
        description: 'Simulate real-world attacks to test security defenses',
        role: 'Penetration Testers & Ethical Hackers',
        tasks: [
            'Penetration Testing',
            'Vulnerability Assessment',
            'Exploit Development',
            'Social Engineering',
            'Web Application Security'
        ],
        color: '#ff4444',
        link: '/league/red-team',
        gradient: 'linear-gradient(135deg, rgba(255, 68, 68, 0.2), rgba(255, 68, 68, 0.05))'
    },
    {
        id: 'purple',
        name: 'Purple Team',
        subtitle: 'Hybrid Security',
        description: 'Bridge offensive and defensive security operations',
        role: 'Security Consultants & Threat Analysts',
        tasks: [
            'Threat Intelligence',
            'Security Testing',
            'Collaboration Facilitation',
            'Metrics & Reporting',
            'Training & Education'
        ],
        color: '#a855f7',
        link: '/league/purple-team',
        gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(168, 85, 247, 0.05))'
    },
    {
        id: 'blue',
        name: 'Blue Team',
        subtitle: 'Defensive Security',
        description: 'Protect systems and respond to security incidents',
        role: 'SOC Analysts & Incident Responders',
        tasks: [
            'SOC Operations',
            'Incident Response',
            'Threat Detection',
            'Security Monitoring',
            'Forensics Analysis'
        ],
        color: '#4488ff',
        link: '/league/blue-team',
        gradient: 'linear-gradient(135deg, rgba(68, 136, 255, 0.2), rgba(68, 136, 255, 0.05))'
    }
];

export default function LeaguePage() {
    const [currentIndex, setCurrentIndex] = useState(1); // Start with Purple in center

    const handleMouseMove = (e: React.MouseEvent) => {
        // The containerRef is removed, so we need to get the target element directly
        const target = e.currentTarget as HTMLDivElement;
        if (!target) return;

        const { left, width } = target.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const percentage = mouseX / width;

        // Map mouse position to card index
        // 0-33% -> Red (0)
        // 33-66% -> Purple (1)
        // 66-100% -> Blue (2)

        let newIndex = 1;
        if (percentage < 0.33) newIndex = 0;
        else if (percentage > 0.66) newIndex = 2;

        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
        }
    };

    // Keep touch logic for mobile compatibility as "hover" doesn't exist there
    const [touchStartX, setTouchStartX] = useState(0);
    const [isTouching, setIsTouching] = useState(false);

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsTouching(true);
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isTouching) return;
        // Simple touch logic, can be enhanced
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        setIsTouching(false);
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (diff > 50 && currentIndex < teams.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else if (diff < -50 && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Placeholder for handleJoinLeague as it was introduced in the snippet
    const handleJoinLeague = (id: string) => {
        console.log(`Joining league: ${id}`);
        // Implement actual navigation or action here
    };

    return (
        <div className={styles.page}>
            {/* Cybersecurity dotted pattern background */}
            <div className={styles.backgroundPattern}></div>

            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Choose Your Path</h1>
                    <p>Explore specialized cybersecurity teams and find your calling</p>
                </header>

                <div
                    className={styles.cardsWrapper}
                    onMouseMove={handleMouseMove}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseLeave={() => setCurrentIndex(1)} // Return to center on leave
                >
                    <div
                        className={styles.cardsContainer}
                        style={{
                            transform: `translateX(calc(-${currentIndex * 100 / 3}%))`,
                            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    >
                        {teams.map((team, index) => (
                            <div
                                key={team.id}
                                className={`${styles.cardWrapper} ${currentIndex === index ? styles.active : ''
                                    } ${currentIndex > index ? styles.left : ''} ${currentIndex < index ? styles.right : ''
                                    }`}
                            >
                                <div
                                    className={styles.teamCard}
                                    style={{
                                        borderColor: currentIndex === index ? team.color : 'rgba(255, 255, 255, 0.1)',
                                    }}
                                >
                                    {/* Card Visual */}
                                    <div
                                        className={styles.cardVisual}
                                        style={{ background: team.gradient }}
                                    >
                                        <div className={styles.circuitPattern} style={{ borderColor: team.color }}></div>
                                        <div className={styles.glowOrb} style={{ background: team.color }}></div>
                                        {/* Team Icon/Symbol */}
                                        <div className={styles.teamSymbol} style={{ color: team.color }}>
                                            {team.id === 'red' && <RedTeamIcon />}
                                            {team.id === 'blue' && <BlueTeamIcon />}
                                            {team.id === 'purple' && <PurpleTeamIcon />}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className={styles.cardContent}>
                                        <h2 style={{ color: team.color }}>{team.name}</h2>
                                        <h3>{team.subtitle}</h3>
                                        <p className={styles.description}>{team.description}</p>

                                        <div className={styles.roleSection}>
                                            <h4>Role:</h4>
                                            <p>{team.role}</p>
                                        </div>

                                        <div className={styles.tasksSection}>
                                            <h4>Key Tasks:</h4>
                                            <ul>
                                                {team.tasks.map((task, i) => (
                                                    <li key={i}>{task}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <button
                                            onClick={() => handleJoinLeague(team.id)}
                                            className={styles.exploreBtn}
                                            style={{
                                                borderColor: team.color,
                                                color: team.color
                                            }}
                                        >
                                            Explore {team.name} →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className={styles.navigation}>
                    {teams.map((team, index) => (
                        <button
                            key={team.id}
                            className={`${styles.navDot} ${currentIndex === index ? styles.activeDot : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            style={{
                                backgroundColor: currentIndex === index ? team.color : 'rgba(255, 255, 255, 0.3)'
                            }}
                            aria-label={`View ${team.name}`}
                        />
                    ))}
                </div>

                {/* Instructions */}
                <div className={styles.instructions}>
                    <p>← Swipe or click cards to explore → </p>
                </div>
            </div>
        </div>
    );
}

// Team Icons as SVG components
function RedTeamIcon() {
    return (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <path d="M60 20L80 40L60 50L40 40L60 20Z" fill="currentColor" opacity="0.3" />
            <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M45 55L55 65L75 45" stroke="currentColor" strokeWidth="3" />
            <circle cx="60" cy="90" r="5" fill="currentColor" />
            <line x1="60" y1="85" x2="60" y2="65" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
}

function BlueTeamIcon() {
    return (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <path d="M60 25L40 45V75C40 85 50 95 60 95C70 95 80 85 80 75V45L60 25Z"
                stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="60" cy="55" r="8" fill="currentColor" />
            <path d="M50 65L60 75L70 65" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
    );
}

function PurpleTeamIcon() {
    return (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="45" cy="60" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="75" cy="60" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M55 60H65" stroke="currentColor" strokeWidth="3" />
            <circle cx="45" cy="60" r="5" fill="currentColor" />
            <circle cx="75" cy="60" r="5" fill="currentColor" />
        </svg>
    );
}
