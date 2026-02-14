'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './Signup.module.css';

/**
 * Signup component refactored from signup.php
 */
const Signup: React.FC = () => {
    const router = useRouter();
    const { signup } = useAuth();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setLoading(true);

        try {
            const result = await signup(fullName, email, password);
            if (result.success) {
                setSuccess('Welcome to CYVE! Your account has been created successfully.');
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Sorry, something went wrong during registration. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <div className={styles.authHeader}>
                    <h1>CYVE</h1>
                    <p>Secure your future in cybersecurity</p>
                </div>

                {error && (
                    <div className={`${styles.message} ${styles.error}`}>
                        {error}
                    </div>
                )}

                {success && (
                    <div className={`${styles.message} ${styles.success}`}>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="full_name">Full Name</label>
                        <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Min 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                        />
                    </div>

                    <button type="submit" className={styles.btnSignup} disabled={loading}>
                        {loading ? 'Processing...' : 'Create Account'}
                    </button>
                </form>

                <div className={styles.authFooter}>
                    Already have an account? <Link href="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
