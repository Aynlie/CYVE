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
