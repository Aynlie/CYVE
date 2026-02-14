// CYVE - Main JavaScript

// Career Path Database
const careerDatabase = [
    {
        title: "Penetration Tester",
        team: "Red Team",
        description: "Focuses on identifying and exploiting vulnerabilities in systems, networks, and applications to help organizations improve their security posture.",
        skills: ["Ethical Hacking", "Python/Bash Scripting", "Network Security", "Metasploit", "Web App Security"],
        certs: ["OSCP", "CEH", "GPEN", "eJPT"],
        learningPath: "Learn networking basics -> Master Linux & Scripting -> Study common vulnerabilities (OWASP) -> Get OSCP certification."
    },
    {
        title: "Ethical Hacker",
        team: "Red Team",
        description: "Uses the same techniques as malicious hackers to find and patch security holes, working legally to protect organizations.",
        skills: ["Vulnerability Assessment", "Cryptography", "Reverse Engineering", "Social Engineering"],
        certs: ["CEH", "CompTIA PenTest+", "GIAC Technical Certs"],
        learningPath: "Start with CompTIA Security+ -> Learn penetration testing methodologies -> Practice on platforms like TryHackMe/HackTheBox."
    },
    {
        title: "SOC Analyst",
        team: "Blue Team",
        description: "Monitors organization's infrastructure to detect and respond to cybersecurity threats in real-time.",
        skills: ["SIEM (Splunk/ELK)", "Incident Response", "Log Analysis", "Threat Detection", "Traffic Analysis"],
        certs: ["CySA+", "GCIH", "BTL1"],
        learningPath: "Understand TCP/IP and networking -> Learn SIEM tools -> Study incident response frameworks -> Achieve CySA+."
    },
    {
        title: "Security Analyst",
        team: "Blue Team",
        description: "Analyzes security policies and technical controls to ensure an organization remains secure and compliant with standards.",
        skills: ["Risk Management", "Compliance Standards", "Firewall Management", "IAM", "Data Protection"],
        certs: ["CompTIA Security+", "SSCP", "GSEC"],
        learningPath: "Build strong IT foundation -> Master Security+ topics -> Specialize in Governance/Risk/Compliance or Technical analysis."
    },
    {
        title: "Digital Forensics",
        team: "Blue Team",
        description: "Investigates digital evidence after a security breach to understand the 'how' and 'who' behind a cybercrime.",
        skills: ["Evidence Collection", "File System Analysis", "Memory Forensics", "Malware Analysis", "Chain of Custody"],
        certs: ["GCFE", "GCFA", "CHFI", "EnCE"],
        learningPath: "Learn computer hardware & file systems -> Study forensic tools (Autopsy/FTK) -> Understand legal procedures for digital evidence."
    },
    {
        title: "Threat Intelligence Analyst",
        team: "Purple Team",
        description: "Gathers and analyzes information about current and emerging cyber threats to help organizations proactively defend themselves.",
        skills: ["OSINT", "Dark Web Monitoring", "Threat Modeling", "Indicators of Compromise (IoCs)", "Data Analysis"],
        certs: ["GCTI", "CTIA"],
        learningPath: "Learn about the cyber threat landscape -> Master OSINT techniques -> Study the Diamond Model and Lockheed Martin Kill Chain."
    },
    {
        title: "Cloud Security Specialist",
        team: "Blue/Purple Team",
        description: "Focuses on securing cloud infrastructure and services (AWS, Azure, GCP) from threats and misconfigurations.",
        skills: ["Cloud Architecture", "Identity & Access Management (IAM)", "DevSecOps", "Cloud Compliance", "Serverless Security"],
        certs: ["CCSP", "AWS Certified Security Specialty", "Azure Security Engineer"],
        learningPath: "Get a baseline cloud certification (Cloud Practitioner) -> Learn cloud-native security tools -> Implement DevSecOps pipelines."
    }
];

// Check if user is logged in
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const authButtons = document.getElementById('authButtons');
    const profileLink = document.getElementById('profileLink');

    if (isLoggedIn) {
        if (authButtons) authButtons.style.display = 'none';
        if (profileLink) profileLink.style.display = 'block';
    } else {
        if (authButtons) authButtons.style.display = 'flex';
        if (profileLink) profileLink.style.display = 'none';
    }
}

// Search functionality with dropdown
function initializeSearch() {
    const searchInput = document.getElementById('pathwaySearch');
    const suggestionBox = document.getElementById('searchSuggestions');
    const careerDetails = document.getElementById('careerDetails');
    const closeBtn = document.getElementById('closeDetails');

    if (searchInput && suggestionBox) {
        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase().trim();
            suggestionBox.innerHTML = '';

            if (query.length > 0) {
                const matches = careerDatabase.filter(career =>
                    career.title.toLowerCase().includes(query) ||
                    career.team.toLowerCase().includes(query)
                );

                if (matches.length > 0) {
                    matches.forEach(match => {
                        const div = document.createElement('div');
                        div.className = 'suggestion-item';
                        div.textContent = `${match.title} (${match.team})`;
                        div.addEventListener('click', () => {
                            displayCareerDetails(match);
                            suggestionBox.style.display = 'none';
                            searchInput.value = match.title;
                        });
                        suggestionBox.appendChild(div);
                    });
                    suggestionBox.style.display = 'block';
                } else {
                    suggestionBox.style.display = 'none';
                }
            } else {
                suggestionBox.style.display = 'none';
            }
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestionBox.contains(e.target)) {
                suggestionBox.style.display = 'none';
            }
        });

        // Handle close button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                careerDetails.style.display = 'none';
            });
        }
    }
}

function displayCareerDetails(career) {
    const careerDetails = document.getElementById('careerDetails');
    const title = document.getElementById('careerTitle');
    const desc = document.getElementById('careerDesc');
    const skills = document.getElementById('careerSkills');
    const certs = document.getElementById('careerCerts');
    const learning = document.getElementById('careerLearning');

    title.textContent = career.title;
    desc.textContent = career.description;
    learning.textContent = career.learningPath;

    // Clear and populate lists
    skills.innerHTML = career.skills.map(skill => `<li>${skill}</li>`).join('');
    certs.innerHTML = career.certs.map(cert => `<li>${cert}</li>`).join('');

    careerDetails.style.display = 'block';
    careerDetails.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Scroll to specific team section
function scrollToTeam(teamClass) {
    const teamElement = document.querySelector(`.${teamClass}`);
    if (teamElement) {
        teamElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    checkAuthStatus();
    initializeSearch();
});

// For testing purposes
function simulateLogin() {
    localStorage.setItem('userLoggedIn', 'true');
    checkAuthStatus();
}

function simulateLogout() {
    localStorage.removeItem('userLoggedIn');
    checkAuthStatus();
}
