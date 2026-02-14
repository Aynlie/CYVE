<<<<<<< Updated upstream
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CalendarTask {
    id: string;
    date: string; // YYYY-MM-DD format
    title: string;
    description: string;
    completed: boolean;
    notes: string;
}

interface CalendarContextType {
    tasks: CalendarTask[];
    addTask: (task: Omit<CalendarTask, 'id'>) => void;
    updateTask: (id: string, updates: Partial<CalendarTask>) => void;
    deleteTask: (id: string) => void;
    getTasksForDate: (date: string) => CalendarTask[];
    toggleTaskCompletion: (id: string) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<CalendarTask[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem('cyve_calendar_tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        } else {
            // Initialize with some sample tasks
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate() + 7);

            const sampleTasks: CalendarTask[] = [
                {
                    id: '1',
                    date: today.toISOString().split('T')[0],
                    title: 'Complete Cybersecurity Fundamentals',
                    description: 'Finish the first module',
                    completed: false,
                    notes: '',
                },
                {
                    id: '2',
                    date: tomorrow.toISOString().split('T')[0],
                    title: 'Networking Quiz',
                    description: 'Take the TCP/IP quiz',
                    completed: false,
                    notes: '',
                },
                {
                    id: '3',
                    date: nextWeek.toISOString().split('T')[0],
                    title: 'Start Penetration Testing',
                    description: 'Begin the ethical hacking module',
                    completed: false,
                    notes: '',
                },
            ];
            setTasks(sampleTasks);
            localStorage.setItem('cyve_calendar_tasks', JSON.stringify(sampleTasks));
        }
    }, []);

    const saveTasks = (newTasks: CalendarTask[]) => {
        setTasks(newTasks);
        localStorage.setItem('cyve_calendar_tasks', JSON.stringify(newTasks));
    };

    const addTask = (task: Omit<CalendarTask, 'id'>) => {
        const newTask: CalendarTask = {
            ...task,
            id: Date.now().toString(),
        };
        saveTasks([...tasks, newTask]);
    };

    const updateTask = (id: string, updates: Partial<CalendarTask>) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, ...updates } : task
        );
        saveTasks(updatedTasks);
    };

    const deleteTask = (id: string) => {
        saveTasks(tasks.filter(task => task.id !== id));
    };

    const getTasksForDate = (date: string) => {
        return tasks.filter(task => task.date === date);
    };

    const toggleTaskCompletion = (id: string) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks(updatedTasks);
    };

    return (
        <CalendarContext.Provider
            value={{ tasks, addTask, updateTask, deleteTask, getTasksForDate, toggleTaskCompletion }}
        >
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendar() {
    const context = useContext(CalendarContext);
    if (context === undefined) {
        throw new Error('useCalendar must be used within a CalendarProvider');
    }
    return context;
}
=======
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CalendarTask {
    id: string;
    date: string; // YYYY-MM-DD format
    title: string;
    description: string;
    completed: boolean;
    notes: string;
}

interface CalendarContextType {
    tasks: CalendarTask[];
    addTask: (task: Omit<CalendarTask, 'id'>) => void;
    updateTask: (id: string, updates: Partial<CalendarTask>) => void;
    deleteTask: (id: string) => void;
    getTasksForDate: (date: string) => CalendarTask[];
    toggleTaskCompletion: (id: string) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<CalendarTask[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem('cyve_calendar_tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        } else {
            // Initialize with some sample tasks
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate() + 7);

            const sampleTasks: CalendarTask[] = [
                {
                    id: '1',
                    date: today.toISOString().split('T')[0],
                    title: 'Complete Cybersecurity Fundamentals',
                    description: 'Finish the first module',
                    completed: false,
                    notes: '',
                },
                {
                    id: '2',
                    date: tomorrow.toISOString().split('T')[0],
                    title: 'Networking Quiz',
                    description: 'Take the TCP/IP quiz',
                    completed: false,
                    notes: '',
                },
                {
                    id: '3',
                    date: nextWeek.toISOString().split('T')[0],
                    title: 'Start Penetration Testing',
                    description: 'Begin the ethical hacking module',
                    completed: false,
                    notes: '',
                },
            ];
            setTasks(sampleTasks);
            localStorage.setItem('cyve_calendar_tasks', JSON.stringify(sampleTasks));
        }
    }, []);

    const saveTasks = (newTasks: CalendarTask[]) => {
        setTasks(newTasks);
        localStorage.setItem('cyve_calendar_tasks', JSON.stringify(newTasks));
    };

    const addTask = (task: Omit<CalendarTask, 'id'>) => {
        const newTask: CalendarTask = {
            ...task,
            id: Date.now().toString(),
        };
        saveTasks([...tasks, newTask]);
    };

    const updateTask = (id: string, updates: Partial<CalendarTask>) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, ...updates } : task
        );
        saveTasks(updatedTasks);
    };

    const deleteTask = (id: string) => {
        saveTasks(tasks.filter(task => task.id !== id));
    };

    const getTasksForDate = (date: string) => {
        return tasks.filter(task => task.date === date);
    };

    const toggleTaskCompletion = (id: string) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks(updatedTasks);
    };

    return (
        <CalendarContext.Provider
            value={{ tasks, addTask, updateTask, deleteTask, getTasksForDate, toggleTaskCompletion }}
        >
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendar() {
    const context = useContext(CalendarContext);
    if (context === undefined) {
        throw new Error('useCalendar must be used within a CalendarProvider');
    }
    return context;
}
>>>>>>> Stashed changes
