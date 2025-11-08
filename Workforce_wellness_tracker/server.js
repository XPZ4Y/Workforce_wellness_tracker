import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Setup ---
// These lines are necessary to use __dirname in ES Modules (which package.json enables)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// --- API Routes ---
// We put API routes *before* serving static files.
app.get('/api/greeting', (req, res) => {
  res.json({ message: 'Hello from the unified Synhapse server!' });
});


// --- Static File Serving ---
// 1. Tell Express to serve all static files (JS, CSS, images) 
//    from the React 'dist' folder.
app.use(express.static(path.join(__dirname, 'client/dist')));

// --- Catch-All Route ---
// 2. For any other request (like /about, /contact), 
//    send the main index.html file.
//    React Router will then take over on the client-side.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
  console.log('Serving React app from client/dist');
});