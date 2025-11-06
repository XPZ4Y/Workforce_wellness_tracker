const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;  
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle POST request
app.post('/oiia', (req, res) => {
    console.log('Received POST request to /oiia');
    res.json({ message: 'HI' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});