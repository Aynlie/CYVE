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
    signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// LocalStorage-based authentication (works without XAMPP)
const USERS_KEY = 'cyve_users';
const CURRENT_USER_KEY = 'cyve_current_user';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const storedUser = localStorage.getItem(CURRENT_USER_KEY);
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem(CURRENT_USER_KEY);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string, remember: boolean = false): Promise<{ success: boolean; message: string }> => {
        try {
            // Get all registered users from localStorage
            const usersData = localStorage.getItem(USERS_KEY);
            const users = usersData ? JSON.parse(usersData) : [];

            console.log('Stored users:', users); // Debug log

            // Find user by email or username
            const foundUser = users.find((u: any) => 
                u.email.toLowerCase() === email.toLowerCase() || 
                u.name.toLowerCase() === email.toLowerCase()
            );

            if (!foundUser) {
                return { success: false, message: 'User not found. Please sign up first.' };
            }

            // Check password (in real app, this would be hashed)
            if (foundUser.password !== password) {
                return { success: false, message: 'Invalid password.' };
            }

            // Create user object without password
            const userObj: User = {
                id: foundUser.id,
                email: foundUser.email,
                name: foundUser.name,
                role: foundUser.role || 'user'
            };

            setUser(userObj);
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userObj));

            return { success: true, message: 'Login successful!' };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'An error occurred during login.' };
        }
    };

    const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
        try {
            // Get existing users
            const usersData = localStorage.getItem(USERS_KEY);
            const users = usersData ? JSON.parse(usersData) : [];

            // Check if email already exists
            const existingUser = users.find((u: any) => u.email === email);
            if (existingUser) {
                return { success: false, message: 'Email already registered. Please login instead.' };
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                password, // In real app, this should be hashed
                role: 'user',
                createdAt: new Date().toISOString()
            };

            // Add to users array
            users.push(newUser);
            localStorage.setItem(USERS_KEY, JSON.stringify(users));

            // Auto-login after signup
            const userObj: User = {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role
            };

            setUser(userObj);
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userObj));

            return { success: true, message: 'Registration successful!' };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, message: 'An error occurred during registration.' };
        }
    };

    const logout = async () => {
        setUser(null);
        localStorage.removeItem(CURRENT_USER_KEY);
        // Redirect to static landing page
        window.location.href = 'file:///C:/Users/Jaynielilie/Documents/Projects/CYVE/index.html';
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
