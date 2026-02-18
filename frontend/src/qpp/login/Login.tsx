'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './Login.module.css';

/**
 * Login component refactored from login.php
 */
const Login: React.FC = () => {
    const router = useRouter();
    const { login } = useAuth();

    const [identity, setIdentity] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(identity, password, remember);
            if (result.success) {
                router.push('/');
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('A connection error occurred. Please check your internet.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <div className={styles.authHeader}>
                    <h1>CYVE</h1>
                    <p>Secure your future in Cybersecurity</p>
                </div>

                {error && (
                    <div className={styles.message}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="identity">Email or Username</label>
                        <input
                            type="text"
                            id="identity"
                            name="identity"
                            placeholder="Enter your email or username"
                            value={identity}
                            onChange={(e) => setIdentity(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <input
                            id="remember"
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            style={{ width: 'auto' }}
                        />
                        <label htmlFor="remember" style={{ marginBottom: 0, cursor: 'pointer', textTransform: 'none', fontSize: '14px' }}>
                            Remember me
                        </label>
                    </div>

                    <button type="submit" className={styles.btnLogin} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Login'}
                    </button>
                </form>

                <div className={styles.authFooter}>
                    New to CYVE? <Link href="/signup">Sign Up Now</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
