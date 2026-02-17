'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from '../styles/auth.module.css';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const success = await login(email, password);

        if (success) {
            router.push('/');
        } else {
            setError('Invalid email or password');
        }
        setLoading(false);
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authContainer}>
                <div className={styles.authCard}>
                    <div className={styles.authHeader}>
                        <h1>Welcome Back</h1>
                        <p>Login to continue your cybersecurity journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.authForm}>
                        {error && (
                            <div className={styles.errorMessage}>
                                {error}
                            </div>
                        )}

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
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-large"
                            style={{ width: '100%', marginTop: '1.5rem' }}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className={styles.authFooter}>
                        <p>
                            Don't have an account?{' '}
                            <Link href="/signup" className={styles.authLink}>
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>

                <div className={styles.authInfo}>
                    <h2>Start Your Cybersecurity Journey</h2>
                    <p>
                        Join thousands of aspiring cybersecurity professionals learning through
                        structured roadmaps and community support.
                    </p>
                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>✓</span>
                            <span>Personalized Learning Paths</span>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>✓</span>
                            <span>Progress Tracking</span>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>✓</span>
                            <span>Career Guidance</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
