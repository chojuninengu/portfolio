const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Rate limiting for login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // limit each IP to 5 requests per windowMs
});

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'public/uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '$2b$10$YourHashedPasswordHere'; // This will be generated

// Generate hashed password
async function generateHashedPassword() {
    const password = 'admin123'; // Change this to your desired password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Generated hashed password:', hashedPassword);
    return hashedPassword;
}

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Login endpoint
app.post('/api/login', loginLimiter, async (req, res) => {
    const { username, password } = req.body;

    if (username !== ADMIN_USERNAME) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, ADMIN_PASSWORD);
    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
    res.json({ token });
});

// Protected routes
app.post('/api/projects', authenticateToken, upload.single('image'), (req, res) => {
    // Handle project creation
});

app.delete('/api/projects/:id', authenticateToken, (req, res) => {
    // Handle project deletion
});

app.post('/api/certificates', authenticateToken, upload.single('image'), (req, res) => {
    // Handle certificate creation
});

app.delete('/api/certificates/:id', authenticateToken, (req, res) => {
    // Handle certificate deletion
});

app.post('/api/cv', authenticateToken, upload.single('cv'), (req, res) => {
    // Handle CV upload
});

// Public routes
app.get('/api/projects', (req, res) => {
    // Return projects
});

app.get('/api/certificates', (req, res) => {
    // Return certificates
});

app.get('/api/cv', (req, res) => {
    // Return CV file
});

// Initialize server
async function startServer() {
    const hashedPassword = await generateHashedPassword();
    console.log('Server starting...');
    console.log('Admin credentials:');
    console.log('Username:', ADMIN_USERNAME);
    console.log('Password: admin123'); // This is the password you'll use to log in
    console.log('Hashed password:', hashedPassword);
    
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer(); 