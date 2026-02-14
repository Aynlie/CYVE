'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

export default function Header() {
    const pathname = usePathname();
    const { isAuthenticated, user, logout } = useAuth();

    const isActive = (path: string) => pathname === path;

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    CYVE
                </Link>

                <nav className={styles.nav}>
                    <Link
                        href="/"
<<<<<<< Updated upstream
                        className={`${styles.navLink} ${styles.navHome} ${isActive('/') ? styles.active : ''}`}
=======
                        className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
>>>>>>> Stashed changes
                    >
                        Home
                    </Link>

<<<<<<< Updated upstream
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
=======
                    {isAuthenticated && (
                        <>
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
                        </>
                    )}

>>>>>>> Stashed changes
                    <Link
                        href="/league"
                        className={`${styles.navLink} ${isActive('/league') || pathname?.startsWith('/league/') ? styles.active : ''}`}
                    >
                        League
                    </Link>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
                    <Link
                        href="/contact"
                        className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}
                    >
<<<<<<< Updated upstream
                        About
=======
                        Contact
>>>>>>> Stashed changes
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
                        <Link href="/login" className={styles.btnLogin}>
<<<<<<< Updated upstream
                            Login/ Sign Up
=======
                            Login / Sign Up
>>>>>>> Stashed changes
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
