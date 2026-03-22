const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'passport_demo_secret'; // In production, use env var

// Setup persistence via a JSON file so that data isn't lost on restart but doesn't require DB setup
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize dummy storage
let storage = {
    users: [
        {
            id: 'u-1',
            email: 'hire-me@anshumat.org',
            password: 'HireMe@2025!',
            name: 'Demo User'
        }
    ],
    applications: []
};

// Load storage from file if exists
if (fs.existsSync(DATA_FILE)) {
    try {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
        const parsed = JSON.parse(fileContent);
        storage = { ...storage, ...parsed };
    } catch (err) {
        console.error('Error reading DB:', err);
    }
}

const saveStorage = () => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(storage, null, 2));
};

app.use(cors());
app.use(bodyParser.json());

// Auth Middleware
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// --- AUTH ENDPOINTS ---

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Check user
    const user = storage.users.find(u => u.email === email && u.password === password);
    
    if (user) {
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } else {
        res.status(401).json({ error: 'Invalid email or password' });
    }
});

app.post('/api/signup', (req, res) => {
    const { email, password, name } = req.body;
    
    if (storage.users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'User already exists' });
    }
    
    const newUser = { id: uuidv4(), email, password, name };
    storage.users.push(newUser);
    saveStorage();
    
    const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token, user: { id: newUser.id, email: newUser.email, name: newUser.name } });
});

app.get('/api/me', authenticate, (req, res) => {
    res.json({ user: req.user });
});

// --- PASSPORT APPLICATION ENDPOINTS ---

// Get all applications for current user
app.get('/api/applications', authenticate, (req, res) => {
    const userApps = storage.applications.filter(app => app.userId === req.user.id);
    res.json(userApps);
});

// Get a single application
app.get('/api/applications/:id', authenticate, (req, res) => {
    const application = storage.applications.find(a => a.id === req.params.id && a.userId === req.user.id);
    if (!application) return res.status(404).json({ error: 'Application not found' });
    res.json(application);
});

// Create a new draft application
app.post('/api/applications', authenticate, (req, res) => {
    const newApp = {
        id: uuidv4(),
        userId: req.user.id,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        formData: req.body // partial form data
    };
    storage.applications.push(newApp);
    saveStorage();
    res.json(newApp);
});

// Update / Autosave an application
app.put('/api/applications/:id', authenticate, (req, res) => {
    const index = storage.applications.findIndex(a => a.id === req.params.id && a.userId === req.user.id);
    if (index === -1) return res.status(404).json({ error: 'Application not found' });
    
    const existing = storage.applications[index];
    storage.applications[index] = {
        ...existing,
        formData: req.body.formData || existing.formData,
        status: req.body.status || existing.status, // can change draft -> submitted
        updatedAt: new Date().toISOString()
    };
    
    saveStorage();
    res.json(storage.applications[index]);
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
