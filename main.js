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
const projects = [
    {
        name: 'Project 1',
        description: 'Description of project 1',
        link: '#',
        github: '#',
        image: 'project1.jpg'
    },
    {
        name: 'Project 2',
        description: 'Description of project 2',
        link: '#',
        github: '#',
        image: 'project2.jpg'
    }
];

const projectsGrid = document.querySelector('.projects-grid');

projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.name}" class="project-image">
        <div class="project-info">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-links">
                <a href="${project.link}" target="_blank" class="btn primary">Live Demo</a>
                <a href="${project.github}" target="_blank" class="btn secondary">GitHub</a>
            </div>
        </div>
    `;
    projectsGrid.appendChild(projectCard);
});

// Certificates
const certificates = [
    {
        name: 'Certificate 1',
        description: 'Description of certificate 1',
        date: '2024-01-01',
        image: 'certificate1.jpg'
    },
    {
        name: 'Certificate 2',
        description: 'Description of certificate 2',
        date: '2024-02-01',
        image: 'certificate2.jpg'
    }
];

const certificatesContainer = document.getElementById('certificates-container');

certificates.forEach(cert => {
    const certCard = document.createElement('div');
    certCard.className = 'certificate-card';
    certCard.innerHTML = `
        <img src="${cert.image}" alt="${cert.name}" class="certificate-image">
        <div class="certificate-info">
            <h3>${cert.name}</h3>
            <p>${cert.description}</p>
            <p class="certificate-date">Achieved: ${new Date(cert.date).toLocaleDateString()}</p>
        </div>
    `;
    certificatesContainer.appendChild(certCard);
});

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