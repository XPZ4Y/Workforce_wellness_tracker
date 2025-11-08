import React, { useCallback } from 'react';

// --- Configuration ---

// Define the game tasks.
// The 'id' will be used for the script filename (e.g., "SimpleReaction.js")
// The 'name' will be used for the button text.
const gameTasks = [
  { id: 'SimpleReaction', name: 'Simple Reaction Task' },
  { id: 'ChoiceReaction', name: 'Choice Reaction Task' },
  { id: 'GoNoGo', name: 'Go/No-Go Task' },
  { id: 'StroopEffect', name: 'Stroop Effect Task' }
];

// The base path for all game scripts
const SCRIPT_BASE_PATH = 'tasks/ReactionTask/';

// The ID to use for the dynamically loaded script tag
const GAME_SCRIPT_ID = 'dynamic-game-script';

/**
 * Main App component
 * Renders the game selection buttons and handles loading game scripts.
 */
function App() {

  /**
   * Loads a game script by dynamically adding a <script> tag to the document head.
   * It removes any previously loaded game script first to prevent conflicts.
   *
   * @param {string} scriptId - The ID of the script to load (e.g., "SimpleReaction").
   */
  const loadGameScript = useCallback((scriptId) => {
    console.log(`Attempting to load game: ${scriptId}`);

    // 1. Remove any existing game script
    const existingScript = document.getElementById(GAME_SCRIPT_ID);
    if (existingScript) {
      console.log('Removing existing game script.');
      existingScript.remove();
    }

    // 2. Create the new script tag
    const script = document.createElement('script');
    script.id = GAME_SCRIPT_ID;
    script.src = `${SCRIPT_BASE_PATH}${scriptId}.js`;
    script.type = 'text/javascript';
    script.async = true; // Ensure async loading

    // 3. Add error handling
    script.onerror = () => {
      console.error(`Error: Could not load script at ${script.src}`);
      // You could show a message to the user here, e.g., by setting state
    };

    script.onload = () => {
      console.log(`Successfully loaded ${script.src}`);
      // You could also assume the script has an `initGame()` function and call it
      // if (typeof window.initGame === 'function') {
      //   window.initGame();
      // }
    };

    // 4. Append the script to the head to execute it
    document.head.appendChild(script);
  }, []); // Empty dependency array as this function doesn't depend on component state

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center font-sans">
      <h1 className="text-4xl font-bold mb-8 text-cyan-400">Reaction Tasks</h1>
      <p className="text-lg text-gray-300 mb-12">
        Select a task to begin.
      </p>

      {/* Container for the game buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {gameTasks.map((task) => (
          <button
            key={task.id}
            onClick={() => loadGameScript(task.id)}
            className="w-full bg-gray-800 text-cyan-300 font-semibold py-4 px-6 rounded-lg shadow-lg
                       border-2 border-gray-700
                       hover:bg-cyan-900 hover:text-white hover:border-cyan-500
                       focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75
                       transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            {task.name}
          </button>
        ))}
      </div>

      {/* This is where the loaded game script might inject its UI.
        For example, if the script looks for an element with id="game-container".
      */}
      <div id="game-container" className="mt-12 w-full max-w-2xl">
        {/* The loaded script will take control of this area */}
      </div>
    </div>
  );
}

export default App;