const express = require('express');
const path = require('path');

// Use the port provided by the environment (e.g., Heroku, Render)
// or default to 3000 for local development.
const port = process.env.PORT || 3000;

const app = express();

// 1. Serve static files
// This tells Express to serve all the production-ready files
// from the 'dist' folder.
app.use(express.static(path.join(__dirname, 'dist')));

// 2. SPA Fallback
// This is the key for a Single Page Application (SPA).
// We use a middleware function without a path. This means it will
// be executed for any request that hasn't been handled by
// 'express.static' (i.e., any request that wasn't for a static file).
// This middleware then sends the 'index.html' file.
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  console.log(`View your app at http://localhost:${port}`);
});