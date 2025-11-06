const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle POST request to /oiia
app.post('/oiia', (req, res) => {
    console.log('Received POST request to /oiia');
    res.json({ message: 'HI' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
