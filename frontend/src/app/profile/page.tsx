'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { useProfile, type PreferredRole } from '@/context/ProfileContext';
import { useRoadmap } from '@/context/RoadmapContext';
import { useState } from 'react';
import styles from './profile.module.css';

const ROLE_OPTIONS: { value: PreferredRole; label: string; desc: string }[] = [
    { value: 'red', label: 'Red Team', desc: 'Offensive Security' },
    { value: 'blue', label: 'Blue Team', desc: 'Defensive Security' },
    { value: 'purple', label: 'Purple Team', desc: 'Collaboration & Optimization' },
];

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <ProfileContent />
        </ProtectedRoute>
    );
}

function ProfileContent() {
    const { user } = useAuth();
    const { profile, updateProfile, addEducation, removeEducation, addExperience, removeExperience, addSkill, removeSkill } = useProfile();
    const { selectField } = useRoadmap();
    const [editing, setEditing] = useState(false);
    const [basicInfo, setBasicInfo] = useState({
        name: profile.name || user?.name || '',
        email: profile.email || user?.email || '',
        location: profile.location || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
    });
    const [newSkill, setNewSkill] = useState('');

    const handleSaveBasicInfo = () => {
        updateProfile(basicInfo);
        setEditing(false);
    };

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            addSkill(newSkill.trim());
            setNewSkill('');
        }
    };

    const handleRoleSelect = (role: PreferredRole) => {
        updateProfile({ preferredRole: role });
        selectField(role);
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>My Profile</h1>
                    <p>Manage your information and track your achievements</p>
                </header>

                {/* Basic Information */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Basic Information</h2>
                        {!editing ? (
                            <button onClick={() => setEditing(true)} className="btn btn-ghost btn-small">
                                Edit
                            </button>
                        ) : (
                            <div className={styles.editActions}>
                                <button onClick={handleSaveBasicInfo} className="btn btn-primary btn-small">
                                    Save
                                </button>
                                <button onClick={() => setEditing(false)} className="btn btn-ghost btn-small">
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <div className={styles.card}>
                        {editing ? (
                            <div className={styles.formGrid}>
                                <div className="form-group">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={basicInfo.name}
                                        onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        value={basicInfo.email}
                                        onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="City, Country"
                                        value={basicInfo.location}
                                        onChange={(e) => setBasicInfo({ ...basicInfo, location: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="tel"
                                        className="form-input"
                                        placeholder="+63 000 000 0000"
                                        value={basicInfo.phone}
                                        onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
                                    />
                                </div>
                                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                    <label className="form-label">Bio</label>
                                    <textarea
                                        className="form-textarea"
                                        placeholder="Tell us about yourself..."
                                        value={basicInfo.bio}
                                        onChange={(e) => setBasicInfo({ ...basicInfo, bio: e.target.value })}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className={styles.infoDisplay}>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Name:</span>
                                    <span>{profile.name || user?.name || 'Not set'}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Email:</span>
                                    <span>{profile.email || user?.email || 'Not set'}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Location:</span>
                                    <span>{profile.location || 'Not set'}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Phone:</span>
                                    <span>{profile.phone || 'Not set'}</span>
                                </div>
                                {profile.bio && (
                                    <div className={styles.infoItem} style={{ gridColumn: '1 / -1' }}>
                                        <span className={styles.label}>Bio:</span>
                                        <span>{profile.bio}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Career Path / Preferred Role */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Career Path in Cybersecurity</h2>
                    </div>
                    <p className={styles.roleHint}>Choose the role that matches your goals. Your roadmap and recommendations will reflect this choice.</p>
                    <div className={styles.roleGrid}>
                        {ROLE_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => handleRoleSelect(opt.value)}
                                className={`${styles.roleCard} ${profile.preferredRole === opt.value ? styles.roleCardActive : ''}`}
                            >
                                <span className={styles.roleLabel}>{opt.label}</span>
                                <span className={styles.roleDesc}>{opt.desc}</span>
                            </button>
                        ))}
                    </div>
                    {profile.preferredRole && (
                        <p className={styles.roleSelected}>
                            Your roadmap is set to <strong>{ROLE_OPTIONS.find(r => r.value === profile.preferredRole)?.label}</strong>.
                        </p>
                    )}
                </section>

                {/* Skills */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Skills</h2>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.skillsList}>
                            {profile.skills.length > 0 ? (
                                profile.skills.map((skill, index) => (
                                    <div key={index} className={styles.skillTag}>
                                        {skill}
                                        <button
                                            onClick={() => removeSkill(skill)}
                                            className={styles.removeBtn}
                                            aria-label="Remove skill"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.emptyState}>No skills added yet</p>
                            )}
                        </div>
                        <div className={styles.addSkill}>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Add a skill (e.g., Python, Network Security)"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                            />
                            <button onClick={handleAddSkill} className="btn btn-primary">
                                Add
                            </button>
                        </div>
                    </div>
                </section>

                {/* Certifications */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Certifications</h2>
                    </div>
                    <div className={styles.card}>
                        {profile.certifications.length > 0 ? (
                            <div className={styles.certList}>
                                {profile.certifications.map((cert, index) => (
                                    <div key={index} className={styles.certItem}>
                                        <span>🏆 {cert}</span>
                                        <button onClick={() => updateProfile({ certifications: profile.certifications.filter((_, i) => i !== index) })} className={styles.removeBtn}>
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className={styles.emptyState}>No certifications added yet</p>
                        )}
                    </div>
                </section>

                {/* Education */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Education</h2>
                    </div>
                    <div className={styles.card}>
                        {profile.education.length > 0 ? (
                            <div className={styles.list}>
                                {profile.education.map((edu) => (
                                    <div key={edu.id} className={styles.listItem}>
                                        <div className={styles.itemContent}>
                                            <h4>{edu.degree} in {edu.field}</h4>
                                            <p>{edu.school}</p>
                                            <p className={styles.date}>{edu.startYear} - {edu.endYear}</p>
                                        </div>
                                        <button onClick={() => removeEducation(edu.id)} className="btn btn-ghost btn-small">
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className={styles.emptyState}>No education added yet</p>
                        )}
                    </div>
                </section>

                {/* Experience */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Experience</h2>
                    </div>
                    <div className={styles.card}>
                        {profile.experience.length > 0 ? (
                            <div className={styles.list}>
                                {profile.experience.map((exp) => (
                                    <div key={exp.id} className={styles.listItem}>
                                        <div className={styles.itemContent}>
                                            <h4>{exp.position}</h4>
                                            <p>{exp.company}</p>
                                            <p className={styles.description}>{exp.description}</p>
                                            <p className={styles.date}>{exp.startDate} - {exp.endDate}</p>
                                        </div>
                                        <button onClick={() => removeExperience(exp.id)} className="btn btn-ghost btn-small">
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className={styles.emptyState}>No experience added yet</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
