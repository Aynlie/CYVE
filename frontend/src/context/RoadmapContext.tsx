'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface RoadmapStep {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    field: 'red' | 'blue' | 'purple';
}

interface RoadmapContextType {
    steps: RoadmapStep[];
    selectedField: 'red' | 'blue' | 'purple' | null;
    selectField: (field: 'red' | 'blue' | 'purple') => void;
    toggleStepCompletion: (stepId: string) => void;
    getProgress: () => number;
}

const defaultSteps: RoadmapStep[] = [
    { id: '1', title: 'Cybersecurity Fundamentals', description: 'Learn the basics of cybersecurity', completed: false, field: 'red' },
    { id: '2', title: 'Networking Essentials', description: 'Understand TCP/IP and network protocols', completed: false, field: 'red' },
    { id: '3', title: 'Penetration Testing Basics', description: 'Introduction to ethical hacking', completed: false, field: 'red' },
    { id: '4', title: 'Web Application Security', description: 'Learn about OWASP Top 10', completed: false, field: 'red' },
    { id: '5', title: 'Security Operations', description: 'Learn SOC analyst fundamentals', completed: false, field: 'blue' },
    { id: '6', title: 'Incident Response', description: 'Handle security incidents effectively', completed: false, field: 'blue' },
    { id: '7', title: 'Security Monitoring', description: 'Master SIEM tools and threat detection', completed: false, field: 'blue' },
    { id: '8', title: 'Threat Hunting & Analysis', description: 'Proactive threat detection and investigation', completed: false, field: 'blue' },
    { id: '9', title: 'Security Foundations', description: 'Core security concepts for hybrid roles', completed: false, field: 'purple' },
    { id: '10', title: 'Defensive Operations', description: 'SOC and monitoring fundamentals', completed: false, field: 'purple' },
    { id: '11', title: 'Offensive Basics', description: 'Ethical hacking and vulnerability assessment', completed: false, field: 'purple' },
    { id: '12', title: 'Threat Intelligence & Collaboration', description: 'Analyze threats and bridge red-blue teams', completed: false, field: 'purple' },
];

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export function RoadmapProvider({ children }: { children: ReactNode }) {
    const [steps, setSteps] = useState<RoadmapStep[]>(defaultSteps);
    const [selectedField, setSelectedField] = useState<'red' | 'blue' | 'purple' | null>(null);

    useEffect(() => {
        const storedSteps = localStorage.getItem('cyve_roadmap_steps');
        if (storedSteps) {
            setSteps(JSON.parse(storedSteps));
        }
        const storedField = localStorage.getItem('cyve_selected_field');
        if (storedField) {
            setSelectedField(storedField as 'red' | 'blue' | 'purple');
        }
    }, []);

    const selectField = (field: 'red' | 'blue' | 'purple') => {
        setSelectedField(field);
        localStorage.setItem('cyve_selected_field', field);
    };

    const toggleStepCompletion = (stepId: string) => {
        const updatedSteps = steps.map(step =>
            step.id === stepId ? { ...step, completed: !step.completed } : step
        );
        setSteps(updatedSteps);
        localStorage.setItem('cyve_roadmap_steps', JSON.stringify(updatedSteps));
    };

    const getProgress = () => {
        const filteredSteps = selectedField
            ? steps.filter(s => s.field === selectedField)
            : steps;
        if (filteredSteps.length === 0) return 0;
        const completedCount = filteredSteps.filter(s => s.completed).length;
        return Math.round((completedCount / filteredSteps.length) * 100);
    };

    return (
        <RoadmapContext.Provider value={{ steps, selectedField, selectField, toggleStepCompletion, getProgress }}>
            {children}
        </RoadmapContext.Provider>
    );
}

export function useRoadmap() {
    const context = useContext(RoadmapContext);
    if (context === undefined) {
        throw new Error('useRoadmap must be used within a RoadmapProvider');
    }
    return context;
}
