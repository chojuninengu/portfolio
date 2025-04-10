// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Skills
const skills = [
    { name: 'HTML', level: 'Learning' },
    { name: 'CSS', level: 'Learning' },
    { name: 'JavaScript', level: 'Learning' },
    { name: 'Git', level: 'Learning' }
];

const skillsGrid = document.querySelector('.skills-grid');

skills.forEach(skill => {
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-card';
    skillCard.innerHTML = `
        <h3>${skill.name}</h3>
        <p>${skill.level}</p>
    `;
    skillsGrid.appendChild(skillCard);
});

// Projects
async function loadProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        const projectsGrid = document.querySelector('.projects-grid');

        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card">
                <img src="${project.image}" alt="${project.name}" class="project-image">
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.link}" target="_blank" class="btn primary">Live Demo</a>
                        <a href="${project.github}" target="_blank" class="btn secondary">GitHub</a>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Certificates
async function loadCertificates() {
    try {
        const response = await fetch('/api/certificates');
        const certificates = await response.json();
        const certificatesContainer = document.getElementById('certificates-container');

        certificatesContainer.innerHTML = certificates.map(cert => `
            <div class="certificate-card">
                <img src="${cert.image}" alt="${cert.name}" class="certificate-image">
                <div class="certificate-info">
                    <h3>${cert.name}</h3>
                    <p>${cert.description}</p>
                    <p class="certificate-date">Achieved: ${new Date(cert.date).toLocaleDateString()}</p>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading certificates:', error);
    }
}

// Contact Form
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    // Remove the default form handling since Formspree will handle it
    // Just add a success message after submission
    setTimeout(() => {
        alert('Message sent successfully!');
        contactForm.reset();
    }, 1000);
});

// Initialize content
loadProjects();
loadCertificates();