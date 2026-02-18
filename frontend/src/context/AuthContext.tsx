'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (email: string, password: string, name: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored user on mount
        const storedUser = localStorage.getItem('cyve_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            // Simulate API call - in production, this would call your backend
            const storedUsers = JSON.parse(localStorage.getItem('cyve_users') || '[]');
            const foundUser = storedUsers.find(
                (u: any) => u.email === email && u.password === password
            );

            if (foundUser) {
                const userWithoutPassword = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
                setUser(userWithoutPassword);
                localStorage.setItem('cyve_user', JSON.stringify(userWithoutPassword));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const signup = async (name: string, email: string, password: string): Promise<boolean> => {
        try {
            // Simulate API call - in production, this would call your backend
            const storedUsers = JSON.parse(localStorage.getItem('cyve_users') || '[]');

            // Check if user already exists
            if (storedUsers.find((u: any) => u.email === email)) {
                return false;
            }

            const newUser = {
                id: Date.now().toString(),
                email,
                password,
                name,
            };

            storedUsers.push(newUser);
            localStorage.setItem('cyve_users', JSON.stringify(storedUsers));

            const userWithoutPassword = { id: newUser.id, email: newUser.email, name: newUser.name };
            setUser(userWithoutPassword);
            localStorage.setItem('cyve_user', JSON.stringify(userWithoutPassword));
            return true;
        } catch (error) {
            console.error('Signup error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('cyve_user');
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
