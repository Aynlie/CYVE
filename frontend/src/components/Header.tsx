'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

export default function Header() {
    const pathname = usePathname();
    const { isAuthenticated, user, logout } = useAuth();

    const isActive = (path: string) => pathname === path;
    const isAuthPage = pathname === '/login' || pathname === '/signup';

    if (isAuthPage) {
        return null; // Don't render header at all on auth pages
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    CYVE
                </Link>

                <nav className={styles.nav}>
                    <Link
                        href="/"
                        className={`${styles.navLink} ${styles.navHome} ${isActive('/') ? styles.active : ''}`}
                    >
                        Home
                    </Link>

                    <Link
                        href="/roadmap"
                        className={`${styles.navLink} ${isActive('/roadmap') ? styles.active : ''}`}
                    >
                        Roadmap
                    </Link>
                    <Link
                        href="/calendar"
                        className={`${styles.navLink} ${isActive('/calendar') ? styles.active : ''}`}
                    >
                        Calendar
                    </Link>
                    <Link
                        href="/league"
                        className={`${styles.navLink} ${isActive('/league') || pathname?.startsWith('/league/') ? styles.active : ''}`}
                    >
                        League
                    </Link>
                    <Link
                        href="/contact"
                        className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}
                    >
                        About
                    </Link>
                </nav>

                <div className={styles.actions}>
                    {isAuthenticated ? (
                        <>
                            <Link href="/profile" className={styles.profileLink}>
                                {user?.name || 'Profile'}
                            </Link>
                            <button onClick={logout} className={styles.btnLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className={styles.authButtons}>
                            <Link href="/login" className={styles.btnLogin}>
                                Log In
                            </Link>
                            <Link href="/signup" className={styles.btnSignup}>
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
