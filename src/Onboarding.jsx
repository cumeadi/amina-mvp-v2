import React, { useState } from 'react';

const STEPS = [
    { id: 'login', title: 'Welcome' },
    { id: 'region', title: 'Region & Language' },
    { id: 'profile', title: 'Profile' },
    { id: 'privacy', title: 'Privacy' },
    { id: 'path', title: 'Choose Path' },
    { id: 'survey', title: 'Getting to Know You', optional: true },
    { id: 'goals', title: 'Health Goals', optional: true },
    { id: 'integrations', title: 'Integrations', optional: true }
];

export default function Onboarding({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        location: '',
        language: '',
        name: '',
        age: '',
        agreedToPrivacy: false,
        agreedToData: false,
        sdohAnswers: {},
        healthGoals: [],
        integrations: []
    });

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(curr => curr + 1);
        } else {
            onComplete(formData);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(curr => curr - 1);
        }
    };

    const updateData = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const step = STEPS[currentStep];
    const progress = (currentStep / (STEPS.length - 1)) * 100;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Progress Header */}
            {currentStep > 0 && (
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="max-w-xl mx-auto">
                        <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            <span>Step {currentStep} of {STEPS.length - 1}</span>
                            <span>{step.optional ? 'Optional' : 'Required'}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-xl">
                    <div className="bg-white rounded-3xl shadow-xl shadow-purple-100 p-8 md:p-10 border border-white">

                        {/* Step Content */}
                        <div className="min-h-[400px] flex flex-col">
                            {currentStep === 0 && (
                                <div className="flex-1 flex flex-col items-center text-center animate-fade-in">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-3xl mb-4 shadow-lg shadow-purple-200">
                                        🏥
                                    </div>
                                    <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Welcome to Amina</h1>
                                    <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
                                        Your personal AI health companion.
                                    </p>

                                    <div className="w-full space-y-3 max-w-sm">
                                        <div className="space-y-3 mb-4">
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none transition-all"
                                                autoFocus
                                            />
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none transition-all"
                                            />
                                            <button
                                                onClick={handleNext}
                                                className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-md shadow-purple-200 hover:shadow-lg hover:scale-[1.02] transition-all"
                                            >
                                                Sign In
                                            </button>
                                        </div>

                                        <div className="relative py-2">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-200"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white text-gray-400">Or continue with</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 justify-center">
                                            <button
                                                onClick={handleNext}
                                                className="p-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all flex-1 flex items-center justify-center"
                                            >
                                                <span className="text-xl"></span>
                                            </button>
                                            <button
                                                onClick={handleNext}
                                                className="p-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex-1 flex items-center justify-center"
                                            >
                                                <span className="text-xl">G</span>
                                            </button>
                                            <button
                                                onClick={handleNext}
                                                className="p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-all border border-green-100 flex-1 flex items-center justify-center"
                                            >
                                                <span className="text-xl">💬</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 1 && (
                                <div className="flex-1 flex flex-col animate-fade-in">
                                    <h2 className="font-display text-2xl font-bold mb-2">Where are you based?</h2>
                                    <p className="text-gray-500 mb-6 text-sm">We'll customize your experience based on local guidelines.</p>

                                    <div className="grid grid-cols-2 gap-3 mb-8">
                                        {['🇳🇬 Nigeria', '🇺🇸 USA', '🇿🇦 South Africa', '🌍 Other'].map(loc => (
                                            <button
                                                key={loc}
                                                onClick={() => updateData('location', loc)}
                                                className={`p-4 rounded-xl border-2 text-left transition-all ${formData.location === loc
                                                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                                                    : 'border-gray-100 hover:border-purple-200 text-gray-600'
                                                    }`}
                                            >
                                                <div className="font-semibold">{loc}</div>
                                            </button>
                                        ))}
                                    </div>

                                    <h2 className="font-display text-2xl font-bold mb-2">Preferred Language</h2>
                                    <p className="text-gray-500 mb-6 text-sm">Amina speaks many languages fluently.</p>

                                    <div className="flex flex-wrap gap-2">
                                        {['🇺🇸 English (US)', '🇬🇧 English (UK)', '🇿🇦 Afrikaans', '🇫🇷 French', '🇳🇬 Igbo', '🇳🇬 Hausa', '🇳🇬 Yoruba'].map(lang => (
                                            <button
                                                key={lang}
                                                onClick={() => updateData('language', lang)}
                                                className={`px-4 py-3 rounded-full border transition-all text-sm font-medium ${formData.language === lang
                                                    ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200'
                                                    : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300'
                                                    }`}
                                            >
                                                {lang}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="flex-1 flex flex-col animate-fade-in justify-center">
                                    <div className="text-center mb-8">
                                        <span className="text-4xl">👋</span>
                                    </div>
                                    <h2 className="font-display text-2xl font-bold mb-2 text-center">What should we call you?</h2>
                                    <p className="text-gray-500 mb-8 text-center text-sm">Your privacy is important to us.</p>

                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => updateData('name', e.target.value)}
                                        placeholder="Enter your first name"
                                        className="w-full text-center text-2xl font-display font-medium border-b-2 border-gray-200 py-4 focus:outline-none focus:border-purple-500 transition-colors bg-transparent placeholder-gray-300 mb-6"
                                        autoFocus
                                    />

                                    <div className="flex flex-col items-center">
                                        <label className="text-sm font-medium text-gray-700 mb-2">Your Age</label>
                                        <input
                                            type="number"
                                            value={formData.age}
                                            onChange={(e) => updateData('age', e.target.value)}
                                            placeholder="25"
                                            className="w-24 text-center text-xl font-display font-medium border-2 border-gray-200 rounded-xl py-3 focus:outline-none focus:border-purple-500 transition-colors bg-transparent placeholder-gray-300"
                                            min="13"
                                            max="120"
                                        />
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="flex-1 flex flex-col animate-fade-in">
                                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mb-6 text-blue-500">
                                        🛡️
                                    </div>
                                    <h2 className="font-display text-2xl font-bold mb-2">Privacy & Data</h2>
                                    <p className="text-gray-500 mb-6 text-sm">Before we start, we need your consent to process your health data.</p>

                                    <div className="space-y-4">
                                        <label className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-all">
                                            <input
                                                type="checkbox"
                                                checked={formData.agreedToPrivacy}
                                                onChange={(e) => updateData('agreedToPrivacy', e.target.checked)}
                                                className="w-5 h-5 mt-0.5 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
                                            />
                                            <div className="text-sm">
                                                <div className="font-semibold text-gray-900 mb-1">I agree to the Privacy Policy</div>
                                                <div className="text-gray-500">We encrypt all your data and never share it without permission.</div>
                                            </div>
                                        </label>

                                        <label className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-all">
                                            <input
                                                type="checkbox"
                                                checked={formData.agreedToData}
                                                onChange={(e) => updateData('agreedToData', e.target.checked)}
                                                className="w-5 h-5 mt-0.5 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
                                            />
                                            <div className="text-sm">
                                                <div className="font-semibold text-gray-900 mb-1">I consent to AI Health Processing</div>
                                                <div className="text-gray-500">Allow Amina to analyze your health data to provide personalized recommendations.</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
                                    <h2 className="font-display text-2xl font-bold mb-4">Nice to meet you, {formData.name || 'Friend'}! 🎉</h2>
                                    <p className="text-gray-500 mb-8 max-w-sm">
                                        We can start helping you right away, or you can take a moment to tell us more about your health for better results.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                        <button
                                            onClick={handleNext}
                                            className="p-6 rounded-2xl bg-purple-50 border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100 transition-all group text-left"
                                        >
                                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform origin-left">✨</div>
                                            <div className="font-bold text-gray-900 mb-1">Let's do it!</div>
                                            <div className="text-sm text-gray-500">Take 2 mins to personalize my experience</div>
                                        </button>

                                        <button
                                            onClick={() => onComplete(formData)}
                                            className="p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-gray-300 transition-all group text-left"
                                        >
                                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform origin-left">🚀</div>
                                            <div className="font-bold text-gray-900 mb-1">Skip for now</div>
                                            <div className="text-sm text-gray-500">I'll explore the app first and set up later</div>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {currentStep === 5 && (
                                <div className="flex-1 flex flex-col animate-fade-in">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl">🏠</div>
                                        <div>
                                            <h2 className="font-display text-xl font-bold">Getting to Know You</h2>
                                            <div className="text-xs text-gray-500">Social Determinants of Health</div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">How would you describe your current housing situation?</label>
                                            <select
                                                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none transition-all"
                                                onChange={(e) => updateData('sdohAnswers', { ...formData.sdohAnswers, housing: e.target.value })}
                                            >
                                                <option value="">Select an option</option>
                                                <option value="stable">Stable housing</option>
                                                <option value="temporary">Temporary / Staying with others</option>
                                                <option value="worried">Worried about losing housing</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">Do you have reliable access to transportation for medical appointments?</label>
                                            <div className="flex gap-4">
                                                {['Yes, always', 'Sometimes', 'No'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => updateData('sdohAnswers', { ...formData.sdohAnswers, transport: opt })}
                                                        className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${formData.sdohAnswers?.transport === opt
                                                            ? 'bg-purple-50 border-purple-500 text-purple-700'
                                                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">How often do you feel lonely or isolated?</label>
                                            <input
                                                type="range"
                                                min="1"
                                                max="5"
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                                onChange={(e) => updateData('sdohAnswers', { ...formData.sdohAnswers, loneliness: e.target.value })}
                                            />
                                            <div className="flex justify-between text-xs text-gray-400 mt-2">
                                                <span>Never</span>
                                                <span>Often</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 6 && (
                                <div className="flex-1 flex flex-col animate-fade-in">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xl">🎯</div>
                                        <div>
                                            <h2 className="font-display text-xl font-bold">Health Goals</h2>
                                            <div className="text-xs text-gray-500">Select all that apply</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { id: 'weight', label: 'Weight Management', emoji: '⚖️' },
                                            { id: 'stress', label: 'Reduce Stress', emoji: '🧘' },
                                            { id: 'sleep', label: 'Better Sleep', emoji: '😴' },
                                            { id: 'energy', label: 'More Energy', emoji: '⚡️' },
                                            { id: 'chronic', label: 'Manage Condition', emoji: '🩺' },
                                            { id: 'strength', label: 'Build Strength', emoji: '💪' },
                                            { id: 'diet', label: 'Healthy Eating', emoji: '🥗' },
                                            { id: 'pregnancy', label: 'Pregnancy', emoji: '🤰' },
                                        ].map(goal => (
                                            <button
                                                key={goal.id}
                                                onClick={() => {
                                                    const current = formData.healthGoals || [];
                                                    const isSelected = current.includes(goal.id);
                                                    updateData('healthGoals', isSelected ? current.filter(id => id !== goal.id) : [...current, goal.id]);
                                                }}
                                                className={`p-4 rounded-2xl border text-left transition-all ${formData.healthGoals?.includes(goal.id)
                                                    ? 'bg-red-50 border-red-200 ring-1 ring-red-200'
                                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="text-2xl mb-2">{goal.emoji}</div>
                                                <div className="font-medium text-sm text-gray-900">{goal.label}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentStep === 7 && (
                                <div className="flex-1 flex flex-col animate-fade-in">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">🔌</div>
                                        <div>
                                            <h2 className="font-display text-xl font-bold">Integrations</h2>
                                            <div className="text-xs text-gray-500">Connect your devices</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {[
                                            { id: 'apple', label: 'Apple Health', icon: '🍎', color: 'bg-gray-900' },
                                            { id: 'fitbit', label: 'Fitbit', icon: '⌚️', color: 'bg-teal-600' },
                                            { id: 'oura', label: 'Oura Ring', icon: '💍', color: 'bg-stone-800' },
                                        ].map(app => (
                                            <div key={app.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${app.color}`}>
                                                        {app.icon}
                                                    </div>
                                                    <div className="font-medium text-gray-900">{app.label}</div>
                                                </div>
                                                <button
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.integrations?.includes(app.id)
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                        }`}
                                                    onClick={() => {
                                                        const current = formData.integrations || [];
                                                        const isSelected = current.includes(app.id);
                                                        updateData('integrations', isSelected ? current.filter(id => id !== app.id) : [...current, app.id]);
                                                    }}
                                                >
                                                    {formData.integrations?.includes(app.id) ? 'Connected' : 'Connect'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-auto bg-blue-50 p-4 rounded-xl flex items-start gap-3">
                                        <span className="text-blue-500 mt-0.5">ℹ️</span>
                                        <div className="text-xs text-blue-700 leading-relaxed">
                                            You can always manage your integrations later in Settings. Data syncing happens securely in the background.
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Footer Buttons */}
                        {currentStep > 0 && (
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                                <button
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                    className={`text-gray-400 font-medium text-sm hover:text-gray-600 transition-colors ${currentStep === 0 ? 'opacity-0 cursor-default' : 'opacity-100 cursor-pointer'
                                        }`}
                                >
                                    ← Back
                                </button>

                                <div className="flex gap-2">
                                    {step.optional && (
                                        <button
                                            onClick={handleNext}
                                            className="px-6 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors font-medium text-sm"
                                        >
                                            Skip
                                        </button>
                                    )}
                                    <button
                                        onClick={handleNext}
                                        disabled={!step.optional && (
                                            (currentStep === 1 && (!formData.location || !formData.language)) ||
                                            (currentStep === 2 && (!formData.name || !formData.age)) ||
                                            (currentStep === 3 && (!formData.agreedToPrivacy || !formData.agreedToData))
                                        )}
                                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm shadow-md shadow-purple-200 hover:shadow-lg hover:shadow-purple-300 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {currentStep === STEPS.length - 1 ? 'Finish Setup' : 'Continue'}
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="text-center mt-6">
                        <p className="text-xs text-gray-400">
                            Completed steps are saved automatically. You can always change these later in settings.
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
