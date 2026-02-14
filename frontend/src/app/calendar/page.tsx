<<<<<<< Updated upstream
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useCalendar, CalendarTask } from '@/context/CalendarContext';
import { useState } from 'react';
import styles from './calendar.module.css';

export default function CalendarPage() {
    return (
        <ProtectedRoute>
            <CalendarContent />
        </ProtectedRoute>
    );
}

function CalendarContent() {
    const { tasks, toggleTaskCompletion, addTask, updateTask } = useCalendar();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [taskForm, setTaskForm] = useState({ title: '', description: '', notes: '' });

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek };
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

    const formatDate = (day: number) => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        return new Date(year, month, day).toISOString().split('T')[0];
    };

    const getTasksForDay = (day: number) => {
        const dateStr = formatDate(day);
        return tasks.filter(task => task.date === dateStr);
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDayClick = (day: number) => {
        setSelectedDate(formatDate(day));
        setShowTaskModal(true);
    };

    const handleAddTask = () => {
        if (selectedDate && taskForm.title) {
            addTask({
                date: selectedDate,
                title: taskForm.title,
                description: taskForm.description,
                completed: false,
                notes: taskForm.notes,
            });
            setTaskForm({ title: '', description: '', notes: '' });
            setShowTaskModal(false);
        }
    };

    const selectedDayTasks = selectedDate ? tasks.filter(t => t.date === selectedDate) : [];

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Task Calendar</h1>
                    <p>Track your roadmap deadlines and manage tasks</p>
                </header>

                <div className={styles.calendarContainer}>
                    <div className={styles.calendarHeader}>
                        <button onClick={handlePrevMonth} className={styles.navBtn}>←</button>
                        <h2>
                            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h2>
                        <button onClick={handleNextMonth} className={styles.navBtn}>→</button>
                    </div>

                    <div className={styles.calendar}>
                        <div className={styles.weekdays}>
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className={styles.weekday}>{day}</div>
                            ))}
                        </div>

                        <div className={styles.days}>
                            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                                <div key={`empty-${i}`} className={styles.dayEmpty}></div>
                            ))}

                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const dayTasks = getTasksForDay(day);
                                const isToday = formatDate(day) === new Date().toISOString().split('T')[0];

                                return (
                                    <div
                                        key={day}
                                        className={`${styles.day} ${isToday ? styles.today : ''}`}
                                        onClick={() => handleDayClick(day)}
                                    >
                                        <span className={styles.dayNumber}>{day}</span>
                                        {dayTasks.length > 0 && (
                                            <div className={styles.taskIndicators}>
                                                {dayTasks.slice(0, 3).map(task => (
                                                    <div
                                                        key={task.id}
                                                        className={`${styles.taskDot} ${task.completed ? styles.completed : ''}`}
                                                        title={task.title}
                                                    ></div>
                                                ))}
                                                {dayTasks.length > 3 && (
                                                    <span className={styles.moreIndicator}>+{dayTasks.length - 3}</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {showTaskModal && selectedDate && (
                    <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Tasks for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>

                            <div className={styles.tasksList}>
                                {selectedDayTasks.map(task => (
                                    <div key={task.id} className={styles.taskItem}>
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => toggleTaskCompletion(task.id)}
                                            className={styles.checkbox}
                                        />
                                        <div className={styles.taskInfo}>
                                            <h4>{task.title}</h4>
                                            <p>{task.description}</p>
                                            {task.notes && <p className={styles.notes}>📝 {task.notes}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.addTaskForm}>
                                <h3>Add New Task</h3>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Task title"
                                    value={taskForm.title}
                                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Description"
                                    value={taskForm.description}
                                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                                />
                                <textarea
                                    className="form-textarea"
                                    placeholder="Notes (optional)"
                                    value={taskForm.notes}
                                    onChange={(e) => setTaskForm({ ...taskForm, notes: e.target.value })}
                                />
                                <button onClick={handleAddTask} className="btn btn-primary">
                                    Add Task
                                </button>
                            </div>

                            <button
                                onClick={() => setShowTaskModal(false)}
                                className="btn btn-ghost"
                                style={{ marginTop: '1rem' }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
=======
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useCalendar, CalendarTask } from '@/context/CalendarContext';
import { useState } from 'react';
import styles from './calendar.module.css';

export default function CalendarPage() {
    return (
        <ProtectedRoute>
            <CalendarContent />
        </ProtectedRoute>
    );
}

function CalendarContent() {
    const { tasks, toggleTaskCompletion, addTask, updateTask } = useCalendar();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [taskForm, setTaskForm] = useState({ title: '', description: '', notes: '' });

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek };
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

    const formatDate = (day: number) => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        return new Date(year, month, day).toISOString().split('T')[0];
    };

    const getTasksForDay = (day: number) => {
        const dateStr = formatDate(day);
        return tasks.filter(task => task.date === dateStr);
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDayClick = (day: number) => {
        setSelectedDate(formatDate(day));
        setShowTaskModal(true);
    };

    const handleAddTask = () => {
        if (selectedDate && taskForm.title) {
            addTask({
                date: selectedDate,
                title: taskForm.title,
                description: taskForm.description,
                completed: false,
                notes: taskForm.notes,
            });
            setTaskForm({ title: '', description: '', notes: '' });
            setShowTaskModal(false);
        }
    };

    const selectedDayTasks = selectedDate ? tasks.filter(t => t.date === selectedDate) : [];

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Task Calendar</h1>
                    <p>Track your roadmap deadlines and manage tasks</p>
                </header>

                <div className={styles.calendarContainer}>
                    <div className={styles.calendarHeader}>
                        <button onClick={handlePrevMonth} className={styles.navBtn}>←</button>
                        <h2>
                            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h2>
                        <button onClick={handleNextMonth} className={styles.navBtn}>→</button>
                    </div>

                    <div className={styles.calendar}>
                        <div className={styles.weekdays}>
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className={styles.weekday}>{day}</div>
                            ))}
                        </div>

                        <div className={styles.days}>
                            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                                <div key={`empty-${i}`} className={styles.dayEmpty}></div>
                            ))}

                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const dayTasks = getTasksForDay(day);
                                const isToday = formatDate(day) === new Date().toISOString().split('T')[0];

                                return (
                                    <div
                                        key={day}
                                        className={`${styles.day} ${isToday ? styles.today : ''}`}
                                        onClick={() => handleDayClick(day)}
                                    >
                                        <span className={styles.dayNumber}>{day}</span>
                                        {dayTasks.length > 0 && (
                                            <div className={styles.taskIndicators}>
                                                {dayTasks.slice(0, 3).map(task => (
                                                    <div
                                                        key={task.id}
                                                        className={`${styles.taskDot} ${task.completed ? styles.completed : ''}`}
                                                        title={task.title}
                                                    ></div>
                                                ))}
                                                {dayTasks.length > 3 && (
                                                    <span className={styles.moreIndicator}>+{dayTasks.length - 3}</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {showTaskModal && selectedDate && (
                    <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Tasks for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>

                            <div className={styles.tasksList}>
                                {selectedDayTasks.map(task => (
                                    <div key={task.id} className={styles.taskItem}>
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => toggleTaskCompletion(task.id)}
                                            className={styles.checkbox}
                                        />
                                        <div className={styles.taskInfo}>
                                            <h4>{task.title}</h4>
                                            <p>{task.description}</p>
                                            {task.notes && <p className={styles.notes}>📝 {task.notes}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.addTaskForm}>
                                <h3>Add New Task</h3>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Task title"
                                    value={taskForm.title}
                                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Description"
                                    value={taskForm.description}
                                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                                />
                                <textarea
                                    className="form-textarea"
                                    placeholder="Notes (optional)"
                                    value={taskForm.notes}
                                    onChange={(e) => setTaskForm({ ...taskForm, notes: e.target.value })}
                                />
                                <button onClick={handleAddTask} className="btn btn-primary">
                                    Add Task
                                </button>
                            </div>

                            <button
                                onClick={() => setShowTaskModal(false)}
                                className="btn btn-ghost"
                                style={{ marginTop: '1rem' }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
>>>>>>> Stashed changes
