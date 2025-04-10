const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Path setup (since server.js is in /scripts, we go up one level to the root)
const ROOT_DIR = path.join(__dirname, '..'); // Points to project root
const USERS_FILE = path.join(ROOT_DIR, 'data/users.json');
const APPOINTMENTS_FILE = path.join(ROOT_DIR, 'data/appointments.csv'); 

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS, images) from the ROOT directory
app.use(express.static(ROOT_DIR));

// API Endpoint for appointments
app.get('/api/appointments', (req, res) => {
    console.log('Looking for CSV at:', APPOINTMENTS_FILE);
    
    if (!fs.existsSync(APPOINTMENTS_FILE)) {
        console.error('File not found at:', APPOINTMENTS_FILE);
        return res.status(404).json({ error: 'Appointments file not found' });
    }

    fs.readFile(APPOINTMENTS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Error reading appointments file' });
        }

        console.log('Raw CSV data:', data);
        
        try {
            const appointments = data
                .trim()
                .split('\n')
                .filter(line => line.trim() !== '')
                .map(line => {
                    const [title, date, startTime, endTime] = line.split(',');
                    return {
                        title: title.trim(),
                        start: `${date.trim()}T${convertTo24Hour(startTime)}`,
                        end: `${date.trim()}T${convertTo24Hour(endTime)}`
                    };
                });

            console.log('Parsed appointments:', appointments);
            res.json(appointments);
        } catch (parseError) {
            console.error('Error parsing CSV:', parseError);
            res.status(500).json({ error: 'Error parsing appointments data' });
        }
    });
});

// Helper function to convert time to 24-hour format
function convertTo24Hour(time) {
    // If already in 24-hour format (HH:MM)
    if (!time.includes('PM') && !time.includes('AM')) {
        return time.trim();
    }
    
    // If in 12-hour format (convert to 24-hour)
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    const isPM = time.includes('PM');
    
    if (isPM && hour < 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    
    return `${hour.toString().padStart(2, '0')}:${minutes.replace(/\D/g, '')}`;
}

// User management functions
function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE));
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();

    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    saveUsers(users);

    res.json({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Serving static files from: ${ROOT_DIR}`);
    console.log(`API endpoint: http://localhost:${PORT}/api/appointments`);
});