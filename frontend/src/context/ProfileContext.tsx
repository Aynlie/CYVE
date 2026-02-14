'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Education {
    id: string;
    school: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    description: string;
    startDate: string;
    endDate: string;
}

export type PreferredRole = 'red' | 'blue' | 'purple';

export interface ProfileData {
    name: string;
    email: string;
    location: string;
    bio: string;
    phone: string;
    /** User's chosen cybersecurity role path: Red (Offensive), Blue (Defensive), Purple (Hybrid) */
    preferredRole: PreferredRole | null;
    education: Education[];
    experience: Experience[];
    skills: string[];
    certifications: string[];
}

interface ProfileContextType {
    profile: ProfileData;
    updateProfile: (updates: Partial<ProfileData>) => void;
    addEducation: (edu: Omit<Education, 'id'>) => void;
    removeEducation: (id: string) => void;
    addExperience: (exp: Omit<Experience, 'id'>) => void;
    removeExperience: (id: string) => void;
    addSkill: (skill: string) => void;
    removeSkill: (skill: string) => void;
    addCertification: (cert: string) => void;
    removeCertification: (cert: string) => void;
}

const defaultProfile: ProfileData = {
    name: '',
    email: '',
    location: '',
    bio: '',
    phone: '',
    preferredRole: null,
    education: [],
    experience: [],
    skills: [],
    certifications: [],
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<ProfileData>(defaultProfile);

    useEffect(() => {
        const storedProfile = localStorage.getItem('cyve_profile');
        if (storedProfile) {
            const parsed = { ...defaultProfile, ...JSON.parse(storedProfile) };
            if (parsed.preferredRole === undefined) parsed.preferredRole = null;
            setProfile(parsed);
        }
    }, []);

    const saveProfile = (newProfile: ProfileData) => {
        setProfile(newProfile);
        localStorage.setItem('cyve_profile', JSON.stringify(newProfile));
    };

    const updateProfile = (updates: Partial<ProfileData>) => {
        saveProfile({ ...profile, ...updates });
    };

    const addEducation = (edu: Omit<Education, 'id'>) => {
        const newEdu: Education = { ...edu, id: Date.now().toString() };
        saveProfile({ ...profile, education: [...profile.education, newEdu] });
    };

    const removeEducation = (id: string) => {
        saveProfile({ ...profile, education: profile.education.filter(e => e.id !== id) });
    };

    const addExperience = (exp: Omit<Experience, 'id'>) => {
        const newExp: Experience = { ...exp, id: Date.now().toString() };
        saveProfile({ ...profile, experience: [...profile.experience, newExp] });
    };

    const removeExperience = (id: string) => {
        saveProfile({ ...profile, experience: profile.experience.filter(e => e.id !== id) });
    };

    const addSkill = (skill: string) => {
        if (!profile.skills.includes(skill)) {
            saveProfile({ ...profile, skills: [...profile.skills, skill] });
        }
    };

    const removeSkill = (skill: string) => {
        saveProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
    };

    const addCertification = (cert: string) => {
        if (!profile.certifications.includes(cert)) {
            saveProfile({ ...profile, certifications: [...profile.certifications, cert] });
        }
    };

    const removeCertification = (cert: string) => {
        saveProfile({ ...profile, certifications: profile.certifications.filter(c => c !== cert) });
    };

    return (
        <ProfileContext.Provider
            value={{
                profile,
                updateProfile,
                addEducation,
                removeEducation,
                addExperience,
                removeExperience,
                addSkill,
                removeSkill,
                addCertification,
                removeCertification,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
}
