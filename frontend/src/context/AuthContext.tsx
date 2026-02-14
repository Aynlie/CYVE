'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string | number;
    email: string;
    name: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string, remember?: boolean) => Promise<{ success: boolean; message: string }>;
    signup: (email: string, password: string, name: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch('http://localhost/ARZAGA/CYVE/CYVE/backend/api/check_session.php', {
                    credentials: 'include'
                });
                const data = await res.json();
                if (data.success) {
                    setUser(data.user);
                    localStorage.setItem('cyve_user', JSON.stringify(data.user));
                } else {
                    setUser(null);
                    localStorage.removeItem('cyve_user');
                }
            } catch (error) {
                console.error('Session check error:', error);
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, []);

    const login = async (email: string, password: string, remember: boolean = false): Promise<{ success: boolean; message: string }> => {
        try {
            const res = await fetch('http://localhost/ARZAGA/CYVE/CYVE/backend/api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, remember }),
                credentials: 'include'
            });
            const data = await res.json();

            if (data.success) {
                setUser(data.user);
                localStorage.setItem('cyve_user', JSON.stringify(data.user));
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message || 'Authentication failed' };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Server connection failed. Is XAMPP running?' };
        }
    };

    const signup = async (email: string, password: string, name: string): Promise<boolean> => {
        try {
            const res = await fetch('http://localhost/ARZAGA/CYVE/CYVE/backend/api/signup.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
                credentials: 'include'
            });
            const data = await res.json();

            if (data.success) {
                setUser(data.user);
                localStorage.setItem('cyve_user', JSON.stringify(data.user));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Signup error:', error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await fetch('http://localhost/ARZAGA/CYVE/CYVE/backend/api/logout.php', {
                credentials: 'include'
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            localStorage.removeItem('cyve_user');
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
