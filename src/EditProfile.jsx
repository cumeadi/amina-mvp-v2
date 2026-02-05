import React, { useState } from 'react';

export default function EditProfile({ onClose, memory }) {
    const [activeTab, setActiveTab] = useState('identity');

    // Local state for form fields (initialized from memory)
    const [profileData, setProfileData] = useState({
        ...memory,
        language: 'English (US)',
        location: 'Nigeria',
        bloodType: 'O+',
        targetSteps: '8,000',
        hydrationGoal: '2.5L',
        caregivers: [
            { name: "Dr. Amara", role: "Primary Care", access: ["Meds", "Vitals"] },
            { name: "Ifeoma", role: "Sister", access: ["Lifestyle"] }
        ]
    });

    const sections = [
        { id: 'identity', icon: '🆔', title: 'Identity & Resonance' },
        { id: 'medical', icon: '🏥', title: 'Medical Foundation' },
        { id: 'meds', icon: '💊', title: 'Medications' },
        { id: 'goals', icon: '🎯', title: 'Goals & Focus' },
        { id: 'care', icon: '🤝', title: 'Circle of Care' },
        { id: 'data', icon: '🔒', title: 'Data Sovereignty' }
    ];

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto animate-fade-in font-sans text-gray-900">
            <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                        ✕
                    </button>
                    <div>
                        <h1 className="font-display font-bold text-xl">Health Profile Manager</h1>
                        <div className="flex items-center gap-2 text-xs text-green-600">
                            <span>🔒</span> End-to-end Encrypted
                        </div>
                    </div>
                </div>
                <button className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                    Save Changes
                </button>
            </div>

            <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveTab(section.id)}
                            className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all ${activeTab === section.id
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                                    : 'bg-white hover:bg-purple-50 text-gray-600'
                                }`}
                        >
                            <span className="text-xl">{section.icon}</span>
                            <span className="font-medium">{section.title}</span>
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-6">

                    {/* Identity & Resonance */}
                    {activeTab === 'identity' && (
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm animate-fade-in">
                            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-3xl">🆔</span> Identity & Resonance
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Preferred Name</label>
                                    <input
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                        className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-purple-500 outline-none transition-all"
                                    />
                                    <p className="text-xs text-gray-500">How Amina addresses you.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Preferred Language</label>
                                    <select
                                        value={profileData.language}
                                        onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
                                        className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-purple-500 outline-none transition-all"
                                    >
                                        <option>English (US)</option>
                                        <option>English (UK)</option>
                                        <option>Yoruba</option>
                                        <option>Igbo</option>
                                        <option>Hausa</option>
                                    </select>
                                </div>

                                <div className="col-span-full p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-4">
                                    <div className="text-2xl">🌍</div>
                                    <div>
                                        <h3 className="font-bold text-blue-900 text-sm">Data Sovereignty & Location</h3>
                                        <p className="text-sm text-blue-700 mb-2">You are set to <strong>{profileData.location}</strong>. This ensures your health data stays within regional compliance (NDPA/HIPAA).</p>
                                        <button className="text-xs font-bold text-blue-700 uppercase tracking-wide hover:underline">Manage Region</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Medical Foundation */}
                    {activeTab === 'medical' && (
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm animate-fade-in">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="font-display text-2xl font-bold flex items-center gap-3">
                                    <span className="text-3xl">🏥</span> Medical Foundation
                                </h2>
                                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
                                    Emergency ID Ready
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Conditions */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-gray-900">Active Conditions</h3>
                                        <button className="text-purple-600 text-sm font-medium hover:bg-purple-50 px-3 py-1 rounded-lg transition-colors">
                                            + Add Condition
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {profileData.conditions.map((c, i) => (
                                            <span key={i} className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl border border-purple-100 flex items-center gap-3">
                                                {c}
                                                <button className="text-purple-400 hover:text-purple-700">✕</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Allergies */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-gray-900">Allergies</h3>
                                        <button className="text-red-600 text-sm font-medium hover:bg-red-50 px-3 py-1 rounded-lg transition-colors">
                                            + Add Allergy
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {profileData.allergies.map((a, i) => (
                                            <span key={i} className="px-4 py-2 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center gap-3">
                                                <span>⚠️ {a}</span>
                                                <button className="text-red-400 hover:text-red-700">✕</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Vitals */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl border border-gray-200">
                                        <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Blood Type</label>
                                        <div className="text-xl font-bold">{profileData.bloodType}</div>
                                    </div>
                                    <div className="p-4 rounded-xl border border-gray-200 bg-green-50/50 border-green-100">
                                        <label className="block text-xs text-green-700 uppercase tracking-wide mb-1">Verified Status</label>
                                        <div className="flex items-center gap-2 font-bold text-green-800">
                                            <span>✓</span> Vetted by Amina
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Medications */}
                    {activeTab === 'meds' && (
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm animate-fade-in">
                            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-3xl">💊</span> Meds & Adherence
                            </h2>

                            <div className="space-y-4 mb-8">
                                {profileData.currentMedications.map((med, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-sm transition-all bg-gray-50/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-lg">
                                                💊
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{med.name}</div>
                                                <div className="text-sm text-gray-500">{med.dosage} • {med.frequency}</div>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-purple-600">Edit</button>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-4">
                                <div className="text-2xl">💡</div>
                                <div>
                                    <h4 className="font-bold text-orange-900 text-sm">Smart Suggestion</h4>
                                    <p className="text-sm text-orange-800 mb-2">Based on your condition "Hypertension", should we add <strong>Lisinopril</strong> to your tracking list?</p>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1.5 bg-white rounded-lg text-xs font-bold text-orange-700 shadow-sm">Yes, Add It</button>
                                        <button className="px-3 py-1.5 bg-transparent rounded-lg text-xs font-medium text-orange-700 hover:bg-orange-100">Dismiss</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Goals */}
                    {activeTab === 'goals' && (
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm animate-fade-in">
                            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-3xl">🎯</span> Goals & Focus
                            </h2>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Primary Focus</label>
                                    <div className="flex gap-2">
                                        {['Blood Sugar', 'Weight Loss', 'Better Sleep'].map(focus => (
                                            <button key={focus} className="px-4 py-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 font-medium text-sm">
                                                {focus}
                                            </button>
                                        ))}
                                        <button className="px-4 py-2 rounded-xl border border-gray-200 text-gray-400 text-sm hover:border-gray-400">+ Add</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-xl border-2 border-transparent focus-within:border-purple-500 hover:bg-white transition-all">
                                        <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Target Steps</label>
                                        <input
                                            type="text"
                                            value={profileData.targetSteps}
                                            className="w-full bg-transparent text-xl font-bold outline-none"
                                        />
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl border-2 border-transparent focus-within:border-purple-500 hover:bg-white transition-all">
                                        <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Daily Hydration</label>
                                        <input
                                            type="text"
                                            value={profileData.hydrationGoal}
                                            className="w-full bg-transparent text-xl font-bold outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Circle of Care */}
                    {activeTab === 'care' && (
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm animate-fade-in">
                            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-3xl">🤝</span> Circle of Care
                            </h2>

                            <div className="space-y-4 mb-8">
                                {profileData.caregivers.map((person, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold">
                                                {person.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{person.name}</div>
                                                <div className="text-xs text-gray-500">{person.role}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {person.access.map(perm => (
                                                <span key={perm} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">{perm}</span>
                                            ))}
                                            <button className="text-gray-400 hover:text-gray-600 ml-2">⚙️</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
                                <span>💌</span> Invite a Caregiver
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-2">Generates a secure Magic Link valid for 48 hours.</p>
                        </div>
                    )}

                    {/* Data Sovereignty */}
                    {activeTab === 'data' && (
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm animate-fade-in">
                            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-3xl">🔒</span> Data Sovereignty
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <button className="p-6 rounded-2xl bg-gray-50 text-left hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all">
                                    <div className="text-3xl mb-3">📤</div>
                                    <h3 className="font-bold text-gray-900">Export All Data</h3>
                                    <p className="text-sm text-gray-500 mt-1">Download a Clinical PDF summary for your physician.</p>
                                </button>

                                <button className="p-6 rounded-2xl bg-red-50 text-left hover:bg-red-100 border border-transparent hover:border-red-200 transition-all group">
                                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform origin-left">🗑️</div>
                                    <h3 className="font-bold text-red-900">Withdraw Consent</h3>
                                    <p className="text-sm text-red-700 mt-1">Revoke processing rights and delete your account.</p>
                                </button>
                            </div>

                            <div className="p-4 bg-gray-900 rounded-xl text-gray-400 text-xs flex gap-4">
                                <span className="text-2xl">🛡️</span>
                                <p>
                                    Amina complies with the Nigeria Data Protection Act (NDPA) and HIPAA.
                                    Your data rights are fully automated and can be exercised at any time.
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
