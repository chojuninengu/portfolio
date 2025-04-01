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
let projects = JSON.parse(localStorage.getItem('projects')) || [];
const projectsGrid = document.querySelector('.projects-grid');
const projectModal = document.getElementById('project-modal');
const projectForm = document.getElementById('project-form');
const addProjectBtn = document.getElementById('add-project');
const closeModal = document.querySelector('.close');

function displayProjects() {
    projectsGrid.innerHTML = '';
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image || 'https://via.placeholder.com/300x200'}" alt="${project.name}" class="project-image">
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
}

addProjectBtn.addEventListener('click', () => {
    projectModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    projectModal.style.display = 'none';
});

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProject = {
        name: document.getElementById('project-name').value,
        description: document.getElementById('project-description').value,
        link: document.getElementById('project-link').value,
        github: document.getElementById('github-link').value,
        image: document.getElementById('project-image').files[0] ? 
            URL.createObjectURL(document.getElementById('project-image').files[0]) : 
            'https://via.placeholder.com/300x200'
    };
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    displayProjects();
    projectModal.style.display = 'none';
    projectForm.reset();
});

// Initialize projects display
displayProjects();

// CV Upload and Preview
const cvUpload = document.getElementById('cv-file');
const cvPreview = document.getElementById('cv-preview');

cvUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            localStorage.setItem('cv', e.target.result);
            updateCVPreview();
        };
        reader.readAsDataURL(file);
    }
});

function updateCVPreview() {
    const savedCV = localStorage.getItem('cv');
    if (savedCV) {
        cvPreview.innerHTML = `
            <p>CV uploaded successfully!</p>
            <button class="btn secondary" onclick="downloadCV()">Download CV</button>
        `;
    }
}

function downloadCV() {
    const savedCV = localStorage.getItem('cv');
    if (savedCV) {
        const link = document.createElement('a');
        link.href = savedCV;
        link.download = 'CV.pdf';
        link.click();
    }
}

// Initialize CV preview
updateCVPreview();

// Certificates
let certificates = JSON.parse(localStorage.getItem('certificates')) || [];
const certificatesContainer = document.getElementById('certificates-container');
const certificateModal = document.getElementById('certificate-modal');
const certificateForm = document.getElementById('certificate-form');
const addCertificateBtn = document.getElementById('add-certificate');
const closeCertModal = document.querySelector('.close-cert');

function displayCertificates() {
    certificatesContainer.innerHTML = '';
    certificates.forEach((cert, index) => {
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
}

addCertificateBtn.addEventListener('click', () => {
    certificateModal.style.display = 'block';
});

closeCertModal.addEventListener('click', () => {
    certificateModal.style.display = 'none';
});

certificateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const file = document.getElementById('certificate-image').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const newCertificate = {
                name: document.getElementById('certificate-name').value,
                description: document.getElementById('certificate-description').value,
                date: document.getElementById('certificate-date').value,
                image: e.target.result
            };
            certificates.push(newCertificate);
            localStorage.setItem('certificates', JSON.stringify(certificates));
            displayCertificates();
            certificateModal.style.display = 'none';
            certificateForm.reset();
        };
        reader.readAsDataURL(file);
    }
});

// Initialize certificates display
displayCertificates();

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