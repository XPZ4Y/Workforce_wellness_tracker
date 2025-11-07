import { useState, useEffect } from 'react';
// import './App.css'; // Removed this line as the file was causing an error.

function App() {
  const [message, setMessage] = useState('Loading...');

  // This runs once when the component loads
  useEffect(() => {
    // We fetch from '/api/greeting'. 
    // We don't need 'http://localhost:3000' because
    // we are being served from the *same* server.
    fetch('/api/greeting')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage('Error connecting to server'));
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      <h1>Welcome to Synhapse!</h1>
      <p>This React app is being served by your Node.js server.</p>
      <p style={{
        padding: '10px 15px',
        backgroundColor: '#eee',
        borderRadius: '8px'
      }}>
        <strong>Server says:</strong> "{message}"
      </p>
    </div>
  );
}

export default App;