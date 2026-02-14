-- Database: cyve
-- Description: Database schema for CYVE cybersecurity platform

CREATE DATABASE IF NOT EXISTS cyve;
USE cyve;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table (for calendar)
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATETIME NOT NULL,
    location VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_by INT,
    approved_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Roadmaps table
CREATE TABLE roadmaps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    steps JSON,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Notes table (for user notes on roadmaps)
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    roadmap_id INT,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (roadmap_id) REFERENCES roadmaps(id) ON DELETE CASCADE
);

-- Audit log table
CREATE TABLE audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert sample data
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@cyve.com', '$2y$10$examplehashedpassword', 'admin'),
('user1', 'user1@cyve.com', '$2y$10$examplehashedpassword', 'user');

INSERT INTO roadmaps (title, description, steps, created_by) VALUES
('Red Team Roadmap', 'Learn offensive security', '["Learn basics", "Tools", "Practice"]', 1);

INSERT INTO events (title, description, event_date, location, status, created_by) VALUES
('Cybersecurity Workshop', 'Intro to cybersecurity', '2024-12-01 10:00:00', 'Online', 'approved', 1);
