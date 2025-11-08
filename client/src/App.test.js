import React, { useState, useEffect } from 'react';
import { X, Play, BarChart2, Briefcase, Users, Sun, Coffee, Zap, Info, Wifi, AlertCircle, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';

// --- INITIAL MODULE DATA (Worker Wellbeing Survey) ---
const WELLBEING_MODULES = [
  { id: 1, title: "Workload Management", desc: "Reflect on task distribution and balance.", icon: <Briefcase size={32} /> },
  { id: 2, title: "Support & Resources", desc: "Assess availability of tools and help.", icon: <Users size={32} /> },
  { id: 3, title: "Recognition & Feedback", desc: "Evaluate appreciation and communication.", icon: <Sun size={32} /> },
  { id: 4, title: "Flexibility & Autonomy", desc: "Examine control over work methods.", icon: <Coffee size={32} /> },
  { id: 5, title: "Growth & Development", desc: "Consider career pathing and learning.", icon: <BarChart2 size={32} /> },
  { id: 6, title: "Stress & Burnout", desc: "Identify and mitigate pressure points.", icon: <Zap size={32} /> },
];

// --- MANAGER SURVEY QUESTIONS ---
const MANAGER_SURVEY_QUESTIONS = [
  {
    module_id: 1,
    question: "How do you typically assess the workload of your team members?",
    options: [
      { text: "Mainly through their direct reports and daily updates.", impact: 3 },
      { text: "By regularly reviewing project progress and task allocations.", impact: 4 },
      { text: "Primarily based on project deadlines and deliverables.", impact: 2 },
      { text: "Through a combination of one-on-ones, team meetings, and task tracking systems.", impact: 5 }
    ],
  },
  {
    module_id: 2,
    question: "When an employee faces a significant challenge, how do you most often respond?",
    options: [
      { text: "I expect them to find solutions independently first.", impact: 2 },
      { text: "I offer guidance and suggest resources after they've tried a bit.", impact: 3 },
      { text: "I proactively check in and offer immediate support and resources.", impact: 5 },
      { text: "I connect them with peers who might have faced similar issues.", impact: 4 }
    ],
  },
  {
    module_id: 3,
    question: "How do you ensure your team members feel recognized for their contributions?",
    options: [
      { text: "Formal annual reviews are the main platform for recognition.", impact: 2 },
      { text: "I give praise during team meetings when achievements are high.", impact: 3 },
      { text: "I provide regular, specific feedback and acknowledge efforts both privately and publicly.", impact: 5 },
      { text: "Recognition is usually tied to major project successes.", impact: 4 }
    ],
  },
  {
    module_id: 4,
    question: "To what extent do you allow employees autonomy in how they complete their tasks?",
    options: [
      { text: "I provide clear instructions and prefer tasks are done my way.", impact: 1 },
      { text: "I allow some flexibility, but within predefined methods and timelines.", impact: 3 },
      { text: "I encourage them to find their best methods as long as deadlines are met.", impact: 5 },
      { text: "Autonomy is granted more to senior members of the team.", impact: 2 }
    ],
  },
  {
    module_id: 5,
    question: "How do you support your team members' professional development?",
    options: [
      { text: "I point them to company-wide training portals when available.", impact: 2 },
      { text: "I discuss development during performance reviews, if they bring it up.", impact: 3 },
      { text: "I actively seek out growth opportunities and discuss career paths regularly.", impact: 5 },
      { text: "Development is primarily on-the-job experience.", impact: 4 }
    ],
  },
  {
    module_id: 6,
    question: "What is your typical approach when you notice signs of stress or potential burnout in an employee?",
    options: [
      { text: "I assume they will come to me if it becomes an issue.", impact: 2 },
      { text: "I monitor their output and speak to them if there's a noticeable dip.", impact: 3 },
      { text: "I initiate a private conversation to understand and offer support, suggesting breaks or adjustments.", impact: 5 },
      { text: "I encourage the team to support each other through challenging periods.", impact: 4 }
    ],
  }
];

// --- QUIZ MODULE COMPONENT ---
function QuizModule({ moduleData, onClose }) {
  const moduleQuestions = MANAGER_SURVEY_QUESTIONS.filter(q => q.module_id === moduleData.id);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [totalImpactScore, setTotalImpactScore] = useState(0);
  const [selectedOptionsForQuestions, setSelectedOptionsForQuestions] = useState(Array(moduleQuestions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [serverStatus, setServerStatus] = useState('idle');

  const currentQuestion = moduleQuestions[currentQIndex];

  useEffect(() => {
    if (showResults) {
      reportResults();
    }
  }, [showResults]);

  const reportResults = async () => {
    setServerStatus('sending');
    // Mock payload for demonstration
    const payload = {
      moduleId: moduleData.id,
      leadershipInsightScore: totalImpactScore,
      managerName: "STEVE"
    };

    try {
      console.log("STREAMING DATA:", payload);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating network delay
      setServerStatus('success');
    } catch (error) {
      setServerStatus('error');
    }
  };

  const handleOptionClick = (optionIndex) => {
    if (isAnswerChecked) return;
    setSelectedOptionIndex(optionIndex);
  };

  const handleNext = () => {
    if (!isAnswerChecked && selectedOptionIndex !== null) {
      setIsAnswerChecked(true);
      const chosenOptionImpact = currentQuestion.options[selectedOptionIndex].impact;
      setTotalImpactScore(prev => prev + chosenOptionImpact);
      setSelectedOptionsForQuestions(prev => {
        const newArr = [...prev];
        newArr[currentQIndex] = chosenOptionImpact;
        return newArr;
      });
    } else if (isAnswerChecked) {
      if (currentQIndex < moduleQuestions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        setSelectedOptionIndex(null);
        setIsAnswerChecked(false);
      } else {
        setShowResults(true);
      }
    }
  };

  const getScoreFeedback = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return { text: "Excellent Insight! Strong awareness.", icon: <TrendingUp size={20} />, color: "text-green-500" };
    if (percentage >= 50) return { text: "Good awareness. Areas for development.", icon: <Info size={20} />, color: "text-yellow-500" };
    return { text: "Needs significant reflection.", icon: <TrendingDown size={20} />, color: "text-red-500" };
  };

  const maxPossibleScore = moduleQuestions.length * 5;
  const feedback = getScoreFeedback(totalImpactScore, maxPossibleScore);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl">
        <div className="flex items-center justify-between bg-neutral-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-red-500">{moduleData.icon}</span>
            <h2 className="font-bold uppercase tracking-wider text-white">
              {moduleData.title} <span className="text-neutral-500">// REFLECTION</span>
            </h2>
          </div>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-neutral-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {showResults ? (
            <div className="text-center py-8 animate-in zoom-in-95">
              <div className="mb-8 flex flex-col items-center justify-center gap-2 h-20">
                {serverStatus === 'sending' && (
                  <>
                    <Wifi size={32} className="text-red-500 animate-pulse" />
                    <p className="text-sm font-mono text-red-400">UPLOADING_DATA...</p>
                  </>
                )}
                {serverStatus === 'success' && (
                  <>
                     <CheckCircle size={48} className="text-green-500" />
                     <p className="text-sm font-mono text-green-400">DATA_SECURE</p>
                  </>
                )}
                 {serverStatus === 'error' && (
                  <>
                     <AlertCircle size={48} className="text-red-600" />
                     <p className="text-sm font-mono text-red-600">CONNECTION_ERROR</p>
                  </>
                )}
              </div>

              <h3 className="text-3xl font-black uppercase mb-2">Module Complete</h3>
              <p className="text-xl text-neutral-400 mb-8">
                Insight Score: <span className={`${feedback.color} font-bold`}>{totalImpactScore}</span> / {maxPossibleScore}
              </p>
              <div className="flex items-center justify-center gap-2 text-lg font-medium mb-8">
                {feedback.icon} <span className={feedback.color}>{feedback.text}</span>
              </div>
              <button onClick={onClose} className="w-full px-6 py-4 rounded-xl bg-red-600 hover:bg-red-700 font-bold text-white transition-colors uppercase tracking-widest">
                Return to Dashboard
              </button>
            </div>
          ) : (
             <div>
              <div className="mb-8 flex items-center gap-4 text-sm font-mono text-neutral-500">
                <span>Q_0{currentQIndex + 1}</span>
                 <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-800">
                   <div className="h-full bg-red-600 transition-all duration-500 ease-out" style={{ width: `${((currentQIndex + 1) / moduleQuestions.length) * 100}%` }}/>
                 </div>
                <span>0{moduleQuestions.length}</span>
              </div>
              <h3 className="mb-8 text-2xl font-bold leading-tight md:text-3xl">{currentQuestion.question}</h3>
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={isAnswerChecked}
                    className={`w-full rounded-xl border-2 p-4 text-left font-medium transition-all duration-200 ${
                      isAnswerChecked
                        ? (idx === selectedOptionIndex ? "border-red-500 bg-red-500/10 text-red-500" : "border-neutral-800 opacity-50")
                        : (selectedOptionIndex === idx ? "border-red-500 bg-red-600 text-white" : "border-neutral-800 hover:border-red-500 hover:bg-neutral-800/50")
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-end border-t border-neutral-800 pt-6">
                <button onClick={handleNext} disabled={selectedOptionIndex === null} className="flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-bold text-white disabled:opacity-50 hover:bg-red-700 transition-colors">
                  {isAnswerChecked ? (currentQIndex < moduleQuestions.length - 1 ? "NEXT" : "COMPLETE") : "CONFIRM"} <Play size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- MAIN DASHBOARD ---
export default function App() {
  const [availableModules, setAvailableModules] = useState(WELLBEING_MODULES);
  const [activeQuiz, setActiveQuiz] = useState(null);

  const startModule = (moduleData) => {
    setActiveQuiz(moduleData);
    setAvailableModules(prev => prev.filter(m => m.id !== moduleData.id));
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white font-sans selection:bg-red-600 selection:text-white lg:flex relative">
      
      {/* --- ACCOUNT PROFILE TOP LEFT --- */}
      <div className="absolute top-6 left-6 flex items-center gap-3 animate-in fade-in z-20">
        <img 
          src="https://ui-avatars.com/api/?name=Steve+Doe&background=dc2626&color=fff&bold=true" 
          alt="Profile" 
          className="h-10 w-10 rounded-full border-2 border-neutral-900 shadow-sm md:h-12 md:w-12"
        />
        <div className="leading-tight opacity-90">
           <p className="font-bold text-white text-sm md:text-base">Steve Doe</p>
           <p className="text-[10px] font-medium text-neutral-500 md:text-xs uppercase tracking-wider">Senior Manager</p>
        </div>
      </div>

      {/* Left Panel */}
      <header className="flex min-h-[40vh] w-full flex-col items-center justify-center border-b border-neutral-800 p-8 text-center lg:min-h-screen lg:w-5/12 lg:border-b-0 lg:border-r lg:sticky lg:top-0">
        <div className="animate-fade-in-up max-w-md pt-12 lg:pt-0">
          <h1 className="text-6xl font-black tracking-tighter xl:text-9xl lg:text-8xl">
            HELLO <br /> <span className="text-red-600">STEVE</span>
          </h1>
          <div className="mt-8 h-1 w-24 bg-red-600 mx-auto rounded-full"/>
          <p className="mt-8 text-xl font-medium text-neutral-400 lg:text-2xl">
             {availableModules.length > 0 ? `${availableModules.length} Modules Ready.` : "All modules complete."}
          </p>
        </div>
      </header>

      {/* Right Panel */}
      <main className="flex-1 bg-neutral-950/50 p-6 lg:p-12 lg:min-h-screen lg:overflow-y-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
          {availableModules.map((module) => (
            <button
              key={module.id}
              onClick={() => startModule(module)}
              className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-neutral-900 p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800 hover:shadow-2xl hover:shadow-red-900/30 active:scale-95 border border-neutral-800/50 animate-in fade-in slide-in-from-bottom-4"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-950 text-red-500 shadow-inner transition-colors group-hover:bg-red-600 group-hover:text-white">
                {module.icon}
              </div>
              <h3 className="mb-3 text-2xl font-bold uppercase tracking-wide">{module.title}</h3>
              <p className="flex-1 text-base text-neutral-500 group-hover:text-neutral-300">{module.desc}</p>
              <div className="mt-10 flex items-center text-sm font-black text-red-600 transition-colors group-hover:text-white">
                START <Play size={16} className="ml-2" />
              </div>
            </button>
          ))}
        </div>
        {availableModules.length === 0 && (
           <div className="flex h-full items-center justify-center text-neutral-500 font-mono animate-in fade-in py-20">
              NO_MODULES_DETECTED
           </div>
        )}
      </main>

      {activeQuiz && <QuizModule moduleData={activeQuiz} onClose={() => setActiveQuiz(null)} />}
    </div>
  );
}