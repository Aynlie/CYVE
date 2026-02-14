<<<<<<< Updated upstream
'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './contact.module.css';
import { ShieldIcon, TargetIcon, UserIcon, LibraryIcon } from '@/components/Icons';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Contact form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>About CYVE</h1>
                    <p>
                        We are building the next generation of cybersecurity experts
                        through interactive roadmaps, community collaboration, and
                        hands-on skill development.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className={`${styles.section} ${styles.missionSection}`}>
                <div className={styles.missionGrid}>
                    <div className={styles.missionText}>
                        <h2>Our Mission</h2>
                        <p>
                            At CYVE, we believe that the path to becoming a cybersecurity
                            professional shouldn't be a mystery. Our mission is to democratize
                            cybersecurity education by providing clear, structured roadmaps
                            for every aspiring defender, attacker, and strategist.
                        </p>
                        <p>
                            We provide the tools, the community, and the guidance you need
                            to transform from a curious beginner into a battle-ready
                            cybersecurity operative.
                        </p>
                    </div>
                    <div className={styles.missionCards}>
                        <div className={styles.card}>
                            <span className={styles.cardIcon}>🛡️</span>
                            <h3>Defensive Excellence</h3>
                            <p>Master the art of protection and threat detection.</p>
                        </div>
                        <div className={styles.card}>
                            <span className={styles.cardIcon}>🎯</span>
                            <h3>Offensive Security</h3>
                            <p>Learn to think like an attacker to find vulnerabilities.</p>
                        </div>
                        <div className={styles.card}>
                            <span className={styles.cardIcon}>🤝</span>
                            <h3>Collaboration</h3>
                            <p>Connect with peers and mentors in our league system.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Why Choose CYVE?</h2>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <LibraryIcon width={48} height={48} color="#f5be1e" />
                        <div style={{ marginTop: '1rem' }}>
                            <h3>Structured Learning</h3>
                            <p>No more guessing what to learn next. Our roadmaps follow industry standards like NIST and NICE.</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <ShieldIcon width={48} height={48} color="#f5be1e" />
                        <div style={{ marginTop: '1rem' }}>
                            <h3>Real-World Focus</h3>
                            <p>We focus on the skills and tools that employers actually care about in today's threat landscape.</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <UserIcon width={48} height={48} color="#f5be1e" />
                        <div style={{ marginTop: '1rem' }}>
                            <h3>Community Driven</h3>
                            <p>Learn together, solve challenges as a team, and build a network that lasts a lifetime.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className={styles.section}>
                <h2 className={styles.sectionTitle}>Connect With Us</h2>
                <div className={styles.contactLayout}>
                    <div className={styles.formCard}>
                        {submitted ? (
                            <div className={styles.successOverlay}>
                                <h2>✓ Transmission Received</h2>
                                <p>We've logged your request in our comms channel and will reach out shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Full Name</label>
                                    <input
                                        name="name"
                                        className={styles.input}
                                        placeholder="Juan Dela Cruz"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        className={styles.input}
                                        placeholder="juan@cyve.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Subject</label>
                                    <input
                                        name="subject"
                                        className={styles.input}
                                        placeholder="Objective"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Details</label>
                                    <textarea
                                        name="message"
                                        className={styles.textarea}
                                        placeholder="Detailed brief..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                    />
                                </div>
                                <button type="submit" className={styles.submitBtn}>
                                    Send
                                </button>
                            </form>
                        )}
                    </div>

                    <div className={styles.infoCards}>
                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>📍</div>
                            <div className={styles.infoContent}>
                                <h4>Headquarters</h4>
                                <p>Angeles City, Philippines</p>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>✉️</div>
                            <div className={styles.infoContent}>
                                <h4>Encryption Channel</h4>
                                <p>ops@cyve.com</p>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>🛡️</div>
                            <div className={styles.infoContent}>
                                <h4>Status</h4>
                                <p>Operational 24/7</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
=======
'use client';

import { useState } from 'react';
import styles from './contact.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, this would send to a backend API
        console.log('Contact form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Get In Touch</h1>
                    <p>Have questions? We'd love to hear from you</p>
                </header>

                <div className={styles.content}>
                    <div className={styles.formSection}>
                        {submitted ? (
                            <div className={styles.successMessage}>
                                <h2>✓ Message Sent!</h2>
                                <p>Thank you for contacting us. We'll get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Your Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="form-input"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-input"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject" className="form-label">Subject</label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        className="form-input"
                                        placeholder="What's this about?"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="form-textarea"
                                        placeholder="Tell us more..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }}>
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                    <div className={styles.infoSection}>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>📍</div>
                            <h3>Location</h3>
                            <p>Angeles City, Philippines</p>
                        </div>

                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>📞</div>
                            <h3>Phone</h3>
                            <p>+63 000 000 0000</p>
                        </div>

                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>✉️</div>
                            <h3>Email</h3>
                            <p>contact@cyve.com</p>
                        </div>

                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>⏰</div>
                            <h3>Hours</h3>
                            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
>>>>>>> Stashed changes
