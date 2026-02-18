'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from '../styles/auth.module.css';

export default function SignupPage() {
    const router = useRouter();
    const { signup } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        const success = await signup(email, password, name);

        if (success) {
            router.push('/');
        } else {
            setError('Email already exists or signup failed');
        }
        setLoading(false);
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authContainer}>
                <div className={styles.authCard}>
                    <div className={styles.authHeader}>
                        <h1>Create Your Account</h1>
                        <p>Begin your cybersecurity career path today</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.authForm}>
                        {error && (
                            <div className={styles.errorMessage}>
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                className="form-input"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                className="form-input"
                                placeholder="your.email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-input"
                                placeholder="Create a password (min 6 characters)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                className="form-input"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-large"
                            style={{ width: '100%', marginTop: '1.5rem' }}
                            disabled={loading}
                        >
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className={styles.authFooter}>
                        <p>
                            Already have an account? <Link href="/login">Log in</Link>
                        </p>
                    </div>
                </div>

                <div className={styles.authInfo}>
                    <h2>Why Choose CYVE?</h2>
                    <p>
                        Our platform provides everything you need to break into cybersecurity,
                        whether you're interested in offensive, defensive, or hybrid roles.
                    </p>
                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>🎯</span>
                            <span>Structured Roadmaps</span>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>📅</span>
                            <span>Task Management</span>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>🗺️</span>
                            <span>Career Mapping</span>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>👥</span>
                            <span>Team Exploration</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
