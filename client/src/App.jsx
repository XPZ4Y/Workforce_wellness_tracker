import React, { useState } from 'react';
import { X, Play, GraduationCap, Code, Globe, Cpu } from 'lucide-react';

// Mock data for the quizzes
const QUIZ_DATA = [
  { id: 1, title: "React Mastery", desc: "Test your component knowledge.", icon: <Code size={40} /> },
  { id: 2, title: "General Trivia", desc: "A bit of everything for everyone.", icon: <Globe size={40} /> },
  { id: 3, title: "Tech History", desc: "From vacuum tubes to silicon.", icon: <Cpu size={40} /> },
  { id: 4, title: "JS Fundamentals", desc: "Scope, closures, and more.", icon: <GraduationCap size={40} /> },
];

export default function App() {
  const [activeQuiz, setActiveQuiz] = useState(null);

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-red-600 selection:text-white">
      
      {/* --- Hero Section --- */}
      <header className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-6xl font-black tracking-tighter md:text-8xl">
            WELCOME <br className="sm:hidden" />
            <span className="text-red-600">STEVE</span>
          </h1>
          <p className="mt-6 text-lg font-medium text-neutral-400 md:text-2xl">
            Select a module below to begin your assessment.
          </p>
        </div>
      </header>

      {/* --- Quiz Card Grid --- */}
      <main className="container mx-auto max-w-5xl px-4 pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {QUIZ_DATA.map((quiz) => (
            <button
              key={quiz.id}
              onClick={() => setActiveQuiz(quiz)}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-neutral-900 p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/20 active:scale-95"
            >
              {/* Decorative top border that glows on hover */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neutral-800 via-red-600 to-neutral-800 opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800 text-red-500 transition-colors group-hover:bg-red-600 group-hover:text-white">
                {quiz.icon}
              </div>
              <h3 className="mb-2 text-2xl font-bold">{quiz.title}</h3>
              <p className="text-sm text-neutral-400 group-hover:text-neutral-200">
                {quiz.desc}
              </p>
              <div className="mt-8 flex items-center text-sm font-bold text-red-500 transition-colors group-hover:text-red-400">
                START QUIZ <Play size={16} className="ml-2" />
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* --- Quiz Execution Modal --- */}
      {activeQuiz && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/70 animate-in fade-in duration-200"
          onClick={() => setActiveQuiz(null)}
        >
          {/* Stop propagation prevents closing when clicking inside the modal */}
          <div 
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-red-600 p-6">
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">
                Running Module
              </h2>
              <button 
                onClick={() => setActiveQuiz(null)}
                className="rounded-full p-1 text-red-100 hover:bg-red-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 text-center">
              <div className="mb-6 flex justify-center text-red-500">
                {activeQuiz.icon}
              </div>
              <h3 className="text-3xl font-bold mb-2">
                {activeQuiz.title}
              </h3>
              <p className="text-neutral-400 mb-8">
                Initializing quiz environment...
              </p>
              
              {/* Simulated Loader */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                <div className="h-full w-1/2 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] bg-red-600 rounded-full" />
              </div>
              <p className="mt-4 text-xs font-mono text-neutral-500">
                 EXECUTING CODE: QZ_{activeQuiz.id.toString().padStart(3, '0')}_INIT
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}