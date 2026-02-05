import React, { useState, useEffect, useRef } from 'react';
import HealthReport from './HealthReport';
import EditProfile from './EditProfile';
import MarketplaceTray from './MarketplaceTray';
import BookingTray from './BookingTray';
import WalletAndInsurance from './WalletAndInsurance';

// Health Agent definitions
const HEALTH_AGENTS = [
  {
    id: 'general',
    name: 'General Health',
    emoji: '🏥',
    color: '#9333EA',
    description: 'Your everyday health companion',
    prompts: [
      "I have a question about my health",
      "Help me understand a medical term",
      "What vitamins should I take?"
    ]
  },
  {
    id: 'triage',
    name: 'Triage Agent',
    emoji: '🩺',
    color: '#7C3AED',
    description: 'Assess urgency and route to care',
    prompts: [
      "I have a fever of 102°F, should I go to ER?",
      "My child has a rash and is lethargic",
      "Evaluate my symptoms for urgency"
    ]
  },
  {
    id: 'medication',
    name: 'Medication Guide',
    emoji: '💊',
    color: '#A855F7',
    description: 'Drug interactions, dosages & reminders',
    prompts: [
      "Can I take ibuprofen with my current meds?",
      "What are the side effects of metformin?",
      "Set a reminder for my medication"
    ]
  },
  {
    id: 'chronic',
    name: 'Chronic Care Coach',
    emoji: '📈',
    color: '#8B5CF6',
    description: 'Manage diabetes, hypertension & more',
    prompts: [
      "Help me understand my diabetes readings",
      "Foods to avoid with high blood pressure",
      "Upload my lab results for review"
    ]
  },
  {
    id: 'nutrition',
    name: 'Metabolism & Nutrition',
    emoji: '🥗',
    color: '#65A30D',
    description: 'Glycemic load, calories & Nigerian foods',
    prompts: [
      "Is Pounded Yam good for my condition?",
      "Scan my meal for glycemic index",
      "Low calorie Nigerian dinner ideas"
    ]
  },
  {
    id: 'sleep',
    name: 'Sleep & Recovery',
    emoji: '🌙',
    color: '#4F46E5',
    description: 'Circadian rhythms & recovery metrics',
    prompts: [
      "Analyze my sleep patterns",
      "I wake up tired every morning",
      "Wind-down routine for better sleep"
    ]
  },
  {
    id: 'activity',
    name: 'Physical Activity & Mobility',
    emoji: '🏃',
    color: '#EA580C',
    description: 'Functional strength & activity nudges',
    prompts: [
      "20-minute indoor workout",
      "Is it cool enough for a walk in Lagos?",
      "Exercises for lower back strength"
    ]
  },
  {
    id: 'stress',
    name: 'Stress & Resilience',
    emoji: '🌬️',
    color: '#0D9488',
    description: 'Physiological stress & breathwork',
    prompts: [
      "Start a guided breathing session",
      "Check my heart rate variability",
      "Why is my resting heart rate high?"
    ]
  },
  {
    id: 'maternal',
    name: 'Maternal Health',
    emoji: '🤱',
    color: '#C084FC',
    description: 'Pregnancy, postnatal & family planning',
    prompts: [
      "I'm 12 weeks pregnant, what should I expect?",
      "Breastfeeding tips for new mothers",
      "When should I start prenatal vitamins?"
    ]
  },
  {
    id: 'mental',
    name: 'Mental Health',
    emoji: '🧠',
    color: '#F472B6',
    description: 'Emotional support & mindfulness',
    prompts: [
      "I'm feeling anxious lately",
      "Techniques for stress management",
      "Help me improve my sleep hygiene"
    ]
  },
  {
    id: 'pediatric',
    name: 'Pediatric & Family',
    emoji: '🧸',
    color: '#FB923C',
    description: 'Vaccinations, milestones & child health',
    prompts: [
      "When is the next vaccination due?",
      "My baby isn't gaining weight",
      "Signs of hand, foot, and mouth disease"
    ]
  },
  {
    id: 'longevity',
    name: 'Longevity & Aging',
    emoji: '🌳',
    color: '#10B981',
    description: 'Preventative care for 50+ & vitality',
    prompts: [
      "Exercises for bone density",
      "Screenings recommended for age 55",
      "Tips for cognitive health"
    ]
  },
  {
    id: 'recovery',
    name: 'Post-Op & Recovery',
    emoji: '🩹',
    color: '#60A5FA',
    description: 'Surgery aftercare & wound management',
    prompts: [
      "How to care for my stitches",
      "Is this swelling normal?",
      "Safe exercises after knee surgery"
    ]
  },
  {
    id: 'hormonal',
    name: 'Hormonal Health',
    emoji: '🧬',
    color: '#EC4899',
    description: 'Menopause, prostate & hormonal balance',
    prompts: [
      "Symptoms of low testosterone",
      "Managing hot flashes naturally",
      "Diet for hormonal balance"
    ]
  }
];

// User health memory data (would come from backend)
const USER_HEALTH_MEMORY = {
  name: "Oluwaseun",
  joinedDate: "Jan 2025",
  healthScore: 78,
  conditions: ["Type 2 Diabetes", "Mild Hypertension"],
  allergies: ["Penicillin", "Shellfish"],
  currentMedications: [
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" }
  ],
  recentTopics: [
    { topic: "Blood sugar management", date: "2 days ago", agent: "chronic" },
    { topic: "Diet recommendations", date: "5 days ago", agent: "lifestyle" },
    { topic: "Medication timing", date: "1 week ago", agent: "medication" }
  ],
  upcomingReminders: [
    { title: "Take evening medication", time: "8:00 PM today" },
    { title: "Blood pressure check", time: "Tomorrow morning" },
    { title: "Lab results follow-up", time: "Friday" }
  ],
  identifiedNeeds: [
    { need: "Regular glucose monitoring", status: "in_progress" },
    { need: "Low on Metformin? Refill now", status: "action_required", type: "commerce" },
    { need: "Dietary consultation", status: "suggested", type: "booking" },
    { need: "Annual eye exam", status: "upcoming", type: "booking" }
  ],
  healthInsights: [
    "Your blood sugar readings have improved 12% this month",
    "You've been consistent with morning medication",
    "Consider adding more fiber to your diet"
  ]
};

const CONTEXTUAL_PROMPTS = [
  {
    type: 'upload',
    emoji: '📄',
    text: 'Upload lab results for analysis',
    subtext: 'PDF, images, or photos of your results'
  },
  {
    type: 'question',
    emoji: '✨',
    text: 'Track a new symptom',
    subtext: 'Log symptoms to identify patterns'
  },
  {
    type: 'action',
    emoji: '🧘',
    text: 'Start a mindfulness session',
    subtext: 'Reduce stress with guided breathing'
  },
  {
    type: 'action',
    emoji: '⏰',
    text: 'Schedule a follow-up reminder',
    subtext: 'Never miss important health check-ins'
  }
];

export default function Dashboard({ onLogout, userData }) {
  // Merge forwarded userData with default memory
  const memory = {
    ...USER_HEALTH_MEMORY,
    ...(userData ? {
      name: userData.name || USER_HEALTH_MEMORY.name
    } : {})
  };
  const [selectedAgent, setSelectedAgent] = useState(HEALTH_AGENTS[0]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showMobileAgents, setShowMobileAgents] = useState(false);
  const [showMemoryPanel, setShowMemoryPanel] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showBookingTray, setShowBookingTray] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [inputMode, setInputMode] = useState('text'); // 'text' or 'voice'
  const [memoryTab, setMemoryTab] = useState('profile');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateResponse = (userMessage) => {
    setIsTyping(true);
    setTimeout(() => {
      const responses = {
        general: `Hi ${memory.name}! Based on your health profile, I can see you're managing Type 2 Diabetes and mild hypertension. How can I help you today?\n\n💡 **Quick tip:** Your blood sugar readings have been improving - keep up the good work!`,
        symptom: `I understand you're concerned, ${memory.name}. Given your current medications (Metformin and Lisinopril), let me ask a few follow-up questions to better assess this.\n\n⚠️ **Note:** I'll factor in your Penicillin allergy when suggesting any treatments.`,
        medication: `${memory.name}, I can see you're currently taking Metformin (500mg twice daily) and Lisinopril (10mg once daily). Before I advise on any interactions:\n\n• Are you taking any supplements?\n• When did you last take your medications today?`,
        chronic: `Good to see you again, ${memory.name}! Looking at your diabetes management journey:\n\n📊 **Your Progress:**\n• Blood sugar improved 12% this month\n• Morning medication consistency: Excellent\n\nWhat would you like to focus on today?`,
        lifestyle: `Hi ${memory.name}! Based on your health goals and current conditions, I'll create recommendations that work with your diabetes management.\n\n🎯 **Personalized for you:**\n• Low glycemic meal options\n• Blood sugar-friendly exercises\n• Sleep tips for better glucose control`,
        maternal: `Hello ${memory.name}! I'm here to support your maternal health journey. Given your existing conditions, I'll ensure all guidance is coordinated with your current care plan.\n\nHow can I help you today?`
      };

      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'assistant',
        agent: selectedAgent.id,
        content: responses[selectedAgent.id],
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!inputValue.trim() && uploadedFiles.length === 0) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      files: uploadedFiles,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setUploadedFiles([]);
    simulateResponse(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePromptClick = (prompt) => {
    setInputValue(prompt);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_progress': return 'bg-purple-100 text-purple-700';
      case 'suggested': return 'bg-amber-100 text-amber-700';
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'action_required': return 'bg-red-100 text-red-700 animate-pulse font-bold';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'in_progress': return 'In Progress';
      case 'suggested': return 'Suggested';
      case 'upcoming': return 'Upcoming';
      default: return status;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@400;500;600;700&display=swap');
        
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }
        
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        
        .recording-pulse::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: #ef4444;
          animation: pulse-ring 1.2s ease-out infinite;
        }
        
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        
        .typing-dot { animation: typing 1.4s ease-in-out infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        
        .gradient-purple {
          background: linear-gradient(135deg, #9333EA 0%, #7C3AED 50%, #6D28D9 100%);
        }
        
        .gradient-purple-light {
          background: linear-gradient(135deg, #A855F7 0%, #9333EA 100%);
        }
        
        .health-score-ring {
          background: conic-gradient(#9333EA 0% 78%, #E9D5FF 78% 100%);
        }
      `}</style>

      {/* Left Sidebar - Agent Selection */}
      <aside className="hidden md:flex w-72 bg-white border-r border-gray-200 flex-col">
        <div className="p-5 gradient-purple">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-display font-semibold text-lg">
              🏥
            </div>
            <div>
              <span className="font-display text-xl font-semibold text-white">Amina</span>
              <div className="text-white/70 text-xs">{selectedAgent.name}</div>
            </div>
          </div>
        </div>

        {/* Quick Switch Banner */}
        <div className="mx-4 mt-4 p-3 bg-purple-50 rounded-xl border border-purple-100">
          <div className="flex items-center gap-2 text-purple-700 text-sm font-medium">
            <span className="text-lg">{selectedAgent.emoji}</span>
            Switch Health Agent
            <span className="ml-auto text-purple-400">▾</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3 px-2">
            Choose Your Specialist
          </div>
          <div className="grid grid-cols-2 gap-2">
            {HEALTH_AGENTS.map(agent => (
              <button
                key={agent.id}
                className={`p-3 rounded-xl transition-all text-left ${selectedAgent.id === agent.id
                  ? 'gradient-purple text-white shadow-lg shadow-purple-200'
                  : 'bg-gray-50 hover:bg-purple-50 border border-gray-100'
                  }`}
                onClick={() => setSelectedAgent(agent)}
              >
                <div className="text-2xl mb-2">{agent.emoji}</div>
                <div className={`font-semibold text-xs ${selectedAgent.id === agent.id ? 'text-white' : 'text-gray-700'}`}>
                  {agent.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors relative"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-10 h-10 rounded-full gradient-purple flex items-center justify-center text-white font-semibold">
              {memory.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{memory.name}</div>
              <div className="text-xs text-gray-500">Member since {memory.joinedDate}</div>
            </div>
            <span className="text-gray-400">▾</span>
          </div>

          {showUserMenu && (
            <div className="absolute bottom-20 left-4 right-4 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-50">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-sm">
                👤 Health Profile
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-sm">
                ⚙️ Settings
              </button>
              <button
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-sm"
                onClick={() => {
                  setShowWallet(true);
                  setShowUserMenu(false);
                }}
              >
                💳 Wallet & Insurance
              </button>
              <button onClick={onLogout} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-sm text-red-600">
                🚪 Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-lg gradient-purple"
              onClick={() => setShowMobileAgents(true)}
            >
              <span className="text-white">{selectedAgent.emoji}</span>
            </button>

            <div
              className="hidden md:flex w-11 h-11 rounded-xl items-center justify-center text-xl text-white gradient-purple"
            >
              {selectedAgent.emoji}
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg md:text-xl text-gray-900">{selectedAgent.name}</h2>
              <p className="text-xs md:text-sm text-gray-500 hidden sm:block">{selectedAgent.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${showMemoryPanel
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                }`}
              onClick={() => setShowMemoryPanel(!showMemoryPanel)}
            >
              <span>🧠</span>
              <span>Health Memory</span>
            </button>
            <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-full text-xs md:text-sm text-purple-700">
              <span>🛡️</span>
              <span className="hidden sm:inline">Private & Secure</span>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto">
                {/* Personalized Welcome */}
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl text-white mb-6 gradient-purple shadow-lg shadow-purple-200">
                  {selectedAgent.emoji}
                </div>
                <h1 className="font-display text-2xl md:text-3xl font-semibold mb-2">
                  Hello, {memory.name}! 👋
                </h1>
                <p className="text-gray-500 mb-2 text-sm md:text-base">
                  I'm your {selectedAgent.name}. {selectedAgent.description}.
                </p>

                {/* Personalized Context */}
                <div className="w-full p-4 bg-purple-50 rounded-2xl mb-8 text-left">
                  <div className="flex items-center gap-2 text-purple-700 font-medium text-sm mb-2">
                    <span>✨</span> Personalized for you
                  </div>
                  <p className="text-sm text-purple-600">
                    I remember you're managing {memory.conditions.join(' and ')}.
                    Your recent focus has been on {memory.recentTopics[0]?.topic.toLowerCase()}.
                  </p>
                </div>

                {/* Action Cards */}
                <div className="w-full space-y-3 mb-8">
                  {CONTEXTUAL_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      className="w-full flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl hover:border-purple-400 hover:shadow-md transition-all text-left group"
                      onClick={() => prompt.type === 'upload' ? setShowUploadModal(true) : null}
                    >
                      <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-xl group-hover:bg-purple-100 transition-colors">
                        {prompt.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-900">{prompt.text}</div>
                        <div className="text-xs text-gray-500">{prompt.subtext}</div>
                      </div>
                      <span className="text-gray-400 group-hover:text-purple-600 transition-colors">→</span>
                    </button>
                  ))}
                </div>

                {/* Quick Prompts */}
                <div className="w-full">
                  <div className="text-xs text-gray-400 mb-3">Or try asking:</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {selectedAgent.prompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all"
                        onClick={() => handlePromptClick(prompt)}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto">
                {/* Contextual Banner */}
                {messages.length > 2 && (
                  <div className="flex items-center gap-4 p-4 gradient-purple rounded-2xl mb-6 text-white shadow-lg shadow-purple-200">
                    <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                      📋
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">Have lab results to share?</div>
                      <div className="text-xs opacity-85">Upload them for personalized guidance</div>
                    </div>
                    <button
                      className="px-5 py-2 bg-white text-purple-700 rounded-full font-semibold text-sm hover:scale-105 transition-transform"
                      onClick={() => setShowUploadModal(true)}
                    >
                      Upload
                    </button>
                  </div>
                )}

                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex gap-3 mb-6 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${message.type === 'assistant'
                        ? 'gradient-purple text-white'
                        : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                      {message.type === 'assistant' ? selectedAgent.emoji : memory.name.charAt(0)}
                    </div>
                    <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                      <div
                        className={`inline-block p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${message.type === 'assistant'
                          ? 'bg-white border border-gray-200 rounded-bl-sm text-left shadow-sm'
                          : 'gradient-purple text-white rounded-br-sm shadow-lg shadow-purple-200'
                          }`}
                      >
                        {message.content}
                      </div>
                      {message.files && message.files.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2 justify-end">
                          {message.files.map((file, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs">
                              📄 {file.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="text-xs text-gray-400 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 mb-6">
                    <div className="w-9 h-9 rounded-lg gradient-purple flex items-center justify-center text-white">
                      {selectedAgent.emoji}
                    </div>
                    <div className="flex gap-1 p-4 bg-white border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm">
                      <div className="w-2 h-2 bg-purple-400 rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full typing-dot"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Health Memory Panel */}
          {showMemoryPanel && (
            <aside className="hidden lg:flex w-80 bg-white border-l border-gray-200 flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-lg">Health Memory</h3>
                  <button
                    className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400"
                    onClick={() => setShowMemoryPanel(false)}
                  >
                    ✕
                  </button>
                </div>

                {/* Health Score */}
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
                  <div className="relative w-16 h-16">
                    <div className="w-16 h-16 rounded-full health-score-ring flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <span className="font-display font-bold text-xl text-purple-700">{memory.healthScore}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Health Score</div>
                    <div className="text-xs text-gray-500">↑ 5 points this month</div>
                  </div>
                </div>
              </div>

              {/* Memory Tabs */}
              <div className="flex border-b border-gray-200">
                {['profile', 'history', 'insights'].map(tab => (
                  <button
                    key={tab}
                    className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${memoryTab === tab
                      ? 'text-purple-700 border-b-2 border-purple-700'
                      : 'text-gray-500 hover:text-gray-700'
                      }`}
                    onClick={() => setMemoryTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
                {memoryTab === 'profile' && (
                  <div className="space-y-4">
                    {/* Conditions */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                        Health Conditions
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {memory.conditions.map((condition, idx) => (
                          <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Allergies */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                        Allergies
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {memory.allergies.map((allergy, idx) => (
                          <span key={idx} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm">
                            ⚠️ {allergy}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Current Medications */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                        Current Medications
                      </div>
                      <div className="space-y-2">
                        {memory.currentMedications.map((med, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                            <div className="font-medium text-sm">{med.name}</div>
                            <div className="text-xs text-gray-500">{med.dosage} • {med.frequency}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Identified Needs */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                        Identified Health Needs
                      </div>
                      <div className="space-y-3">
                        {memory.identifiedNeeds.map((item, i) => (
                          <div
                            key={i}
                            className={`p-3 rounded-lg text-sm border transition-all ${item.type === 'commerce'
                              ? 'border-red-200 bg-red-50 cursor-pointer hover:bg-red-100 hover:shadow-sm'
                              : item.type === 'booking'
                                ? 'border-blue-200 bg-blue-50 cursor-pointer hover:bg-blue-100 hover:shadow-sm'
                                : 'border-gray-100 bg-gray-50'
                              }`}
                            onClick={() => {
                              if (item.type === 'commerce') {
                                setSelectedNeed({ name: 'Metformin', ...item });
                                setShowMarketplace(true);
                              } else if (item.type === 'booking') {
                                setSelectedNeed(item);
                                setShowBookingTray(true);
                              }
                            }}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className={item.type === 'commerce' || item.type === 'booking' ? 'font-bold text-gray-900' : 'font-medium'}>
                                {item.need}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(item.status)}`}>
                                {item.status.replace('_', ' ')}
                              </span>
                            </div>
                            {item.type === 'commerce' && (
                              <div className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                                <span>Tap to Refill</span>
                                <span>→</span>
                              </div>
                            )}
                            {item.type === 'booking' && (
                              <div className="text-xs text-blue-600 font-medium mt-1 flex items-center gap-1">
                                <span>Tap to Book</span>
                                <span>→</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {memoryTab === 'history' && (
                  <div className="space-y-4">
                    {/* Recent Topics */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                        Recent Conversations
                      </div>
                      <div className="space-y-2">
                        {memory.recentTopics.map((item, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-xl hover:bg-purple-50 cursor-pointer transition-colors">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{HEALTH_AGENTS.find(a => a.id === item.agent)?.emoji}</span>
                              <span className="font-medium text-sm">{item.topic}</span>
                            </div>
                            <div className="text-xs text-gray-500">{item.date}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Upcoming Reminders */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                        Upcoming Reminders
                      </div>
                      <div className="space-y-2">
                        {memory.upcomingReminders.map((reminder, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                              ⏰
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{reminder.title}</div>
                              <div className="text-xs text-purple-600">{reminder.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {memoryTab === 'insights' && (
                  <div className="space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                      Your Health Insights
                    </div>
                    {memory.healthInsights.map((insight, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                        <div className="flex items-start gap-3">
                          <span className="text-lg">💡</span>
                          <p className="text-sm text-gray-700">{insight}</p>
                        </div>
                      </div>
                    ))}

                    <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center">
                      <div className="text-2xl mb-2">📊</div>
                      <div className="font-medium text-sm mb-1">Want detailed analytics?</div>
                      <div className="text-xs text-gray-500 mb-3">Track trends over time</div>
                      <button
                        className="px-4 py-2 gradient-purple text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                        onClick={() => setShowReport(true)}
                      >
                        View Full Report
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Memory Panel Footer */}
              <div className="p-4 border-t border-gray-200">
                <button
                  className="w-full flex items-center justify-center gap-2 p-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors text-sm font-medium"
                  onClick={() => setShowEditProfile(true)}
                >
                  <span>✏️</span>
                  Edit Health Profile
                </button>
              </div>
            </aside>
          )}
        </div>

        {/* Input Area */}
        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4 md:p-6 relative z-10">

          {/* Mode Switcher */}
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 p-1 rounded-full flex text-sm font-medium relative cursor-pointer">
              <button
                onClick={() => setInputMode('text')}
                className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-2 ${inputMode === 'text'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <span>⌨️</span> Type
              </button>
              <button
                onClick={() => setInputMode('voice')}
                className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-2 ${inputMode === 'voice'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <span>🎙️</span> Voice
              </button>
            </div>
          </div>

          {inputMode === 'text' ? (
            <>
              {uploadedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {uploadedFiles.map((file, idx) => (
                    <span key={idx} className="inline-flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm">
                      📄 {file.name}
                      <button
                        className="text-purple-400 hover:text-purple-600"
                        onClick={() => removeFile(idx)}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-end gap-2 bg-gray-100 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-purple-500 focus-within:bg-purple-50">
                <button
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 hover:bg-white hover:text-purple-600 transition-all"
                  onClick={() => setShowUploadModal(true)}
                >
                  📎
                </button>
                <button
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 hover:bg-white hover:text-purple-600 transition-all"
                  onClick={() => setInputMode('voice')}
                >
                  🎙️
                </button>

                <textarea
                  className="flex-1 bg-transparent border-none outline-none resize-none py-3 px-2 text-sm min-h-[24px] max-h-[120px] font-sans"
                  placeholder={`Ask ${selectedAgent.name} anything...`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows={1}
                />

                <button
                  className="w-11 h-11 rounded-xl gradient-purple text-white flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-200"
                  onClick={handleSend}
                  disabled={!inputValue.trim() && uploadedFiles.length === 0}
                >
                  ➤
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-400">
                <span>🛡️ End-to-end encrypted</span>
                <span>Press Enter to send</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-4 min-h-[160px] animate-fade-in">
              <div
                className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all cursor-pointer ${isRecording
                  ? 'bg-red-500 scale-110 shadow-xl shadow-red-200'
                  : 'gradient-purple shadow-lg shadow-purple-200 hover:scale-105'
                  }`}
                onClick={() => setIsRecording(!isRecording)}
              >
                {/* Ripple effects if recording */}
                {isRecording && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20 duration-1000"></div>
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-pulse opacity-40 delay-75"></div>
                  </>
                )}
                <span className="text-4xl text-white relative z-10 transition-transform duration-300">
                  {isRecording ? '⏹️' : '🎙️'}
                </span>
              </div>

              <div className="mt-6 text-center space-y-1">
                <div className={`font-display font-bold text-xl transition-colors ${isRecording ? 'text-red-600' : 'text-gray-900'}`}>
                  {isRecording ? 'Listening...' : 'Tap to start talking'}
                </div>
                <div className="text-sm text-gray-500">
                  {isRecording ? 'Amina is listening to you' : `Have a natural conversation with ${selectedAgent.name}`}
                </div>
              </div>

              {isRecording && (
                <div className="flex items-center justify-center gap-1 mt-6 h-8">
                  <div className="w-1 bg-red-400 rounded-full animate-wave h-3"></div>
                  <div className="w-1 bg-red-400 rounded-full animate-wave h-5 animation-delay-100"></div>
                  <div className="w-1 bg-red-400 rounded-full animate-wave h-8 animation-delay-200"></div>
                  <div className="w-1 bg-red-400 rounded-full animate-wave h-6 animation-delay-150"></div>
                  <div className="w-1 bg-red-400 rounded-full animate-wave h-4 animation-delay-75"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </main >

      {/* Upload Modal */}
      {
        showUploadModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <div
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-semibold">Upload Documents</h3>
                <button
                  className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  onClick={() => setShowUploadModal(false)}
                >
                  ✕
                </button>
              </div>

              <div
                className="border-2 border-dashed border-purple-300 rounded-2xl p-8 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all"
                onClick={() => {
                  setUploadedFiles([{ name: 'lab_results.pdf', type: 'pdf' }]);
                  setShowUploadModal(false);
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-3xl mx-auto mb-4">
                  📤
                </div>
                <div className="font-semibold mb-1">Drag & drop or click to upload</div>
                <div className="text-sm text-gray-500">Lab results, prescriptions, medical records</div>
              </div>

              <div className="flex justify-center gap-6 mt-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-xl mx-auto mb-1">📄</div>
                  <span className="text-xs text-gray-500">PDF</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-xl mx-auto mb-1">🖼️</div>
                  <span className="text-xs text-gray-500">Images</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-xl mx-auto mb-1">📝</div>
                  <span className="text-xs text-gray-500">Docs</span>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Mobile Agent Selector */}
      {
        showMobileAgents && (
          <div
            className="fixed inset-0 bg-black/50 flex items-end z-50 md:hidden"
            onClick={() => setShowMobileAgents(false)}
          >
            <div
              className="bg-white rounded-t-3xl p-6 w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
              <h3 className="font-display text-xl font-semibold mb-4">Choose Your Health Agent</h3>
              <p className="text-sm text-gray-500 mb-4">Select the specialist for your needs</p>
              <div className="grid grid-cols-2 gap-3">
                {HEALTH_AGENTS.map(agent => (
                  <button
                    key={agent.id}
                    className={`p-4 rounded-2xl text-left transition-all ${selectedAgent.id === agent.id
                      ? 'gradient-purple text-white shadow-lg shadow-purple-200'
                      : 'bg-gray-100 hover:bg-purple-50'
                      }`}
                    onClick={() => {
                      setSelectedAgent(agent);
                      setShowMobileAgents(false);
                    }}
                  >
                    <div className="text-2xl mb-2">{agent.emoji}</div>
                    <div className="font-semibold text-sm">{agent.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      }

      {/* Full Health Report Overlay */}
      {
        showReport && (
          <HealthReport
            onClose={() => setShowReport(false)}
            memory={memory}
          />
        )
      }

      {/* Edit Profile Overlay */}
      {showEditProfile && (
        <EditProfile
          onClose={() => setShowEditProfile(false)}
          memory={memory}
        />
      )}

      {/* Marketplace Tray Overlay */}
      {showMarketplace && (
        <MarketplaceTray
          item={selectedNeed}
          onClose={() => setShowMarketplace(false)}
          onComplete={() => {
            // In a real app, update memory here
            console.log('Order completed');
          }}
        />
      )}

      {/* Booking Tray Overlay */}
      {showBookingTray && (
        <BookingTray
          service={selectedNeed}
          onClose={() => setShowBookingTray(false)}
          onComplete={() => {
            console.log('Booking confirmed');
          }}
        />
      )}

      {/* Wallet & Insurance Overlay */}
      {showWallet && (
        <WalletAndInsurance
          onClose={() => setShowWallet(false)}
          memory={memory}
        />
      )}
    </div>
  );
}
