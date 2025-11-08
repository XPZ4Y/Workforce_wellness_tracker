import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize the express app
const app = express();

// Define the port to run on.
// We use process.env.PORT for compatibility with hosting platforms (like Heroku)
// and default to 8080 if it's not set.
const port = process.env.PORT || 8080;

// --- Define __dirname in ES Module scope ---
// 'import.meta.url' gives the URL of the current module file.
// 'fileURLToPath' converts this URL to a file path.
// 'path.dirname' gets the directory name from that file path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Static File Serving ---
// This middleware tells Express to serve static files from the 'build' directory.
// Any request for a file that exists in /build (like /static/js/main.js)
// will be served directly.
app.use(express.static(path.join(__dirname, 'build')));

// --- Catch-all Route for Client-Side Routing ---
// This route handles all GET requests that haven't been matched yet (i.e., not static files).
// It sends the 'index.html' file from the 'build' directory.
// This is crucial for React Router to take over and handle routing on the client side.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// --- Start the Server ---
// Start listening for requests on the defined port.
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  console.log(`Access your app at http://localhost:${port}`);
});

