import React from 'react';

export default function HealthReport({ onClose, memory }) {
    // Mock data for visualizations
    const bloodSugarTrend = [
        140, 138, 135, 142, 130, 128, 125,
        122, 118, 120, 115, 112, 110, 108
    ];

    const adherenceData = Array(30).fill(null).map((_, i) => {
        // Simulate mostly good adherence with a few misses
        const rand = Math.random();
        if (rand > 0.9) return 'missed';
        if (rand > 0.75) return 'partial';
        return 'full';
    });

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto animate-fade-in">
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}</style>

            {/* Top Navigation */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <span>←</span> Back to Dashboard
                </button>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    <span>🔒</span> End-to-end Encrypted
                </div>
            </div>

            <div className="max-w-5xl mx-auto p-6 space-y-8 pb-20">

                {/* 1. Executive Header: "The Pulse" */}
                <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                        {/* Hero Metric */}
                        <div className="flex-shrink-0">
                            <div className="relative w-40 h-40">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="80" cy="80" r="70" stroke="#f3f4f6" strokeWidth="12" fill="none" />
                                    <circle
                                        cx="80" cy="80" r="70"
                                        stroke="#9333EA" strokeWidth="12" fill="none"
                                        strokeDasharray="440" strokeDashoffset="96" // 78% of 440
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-display font-bold text-gray-900">{memory.healthScore}</span>
                                    <span className="text-xs text-green-600 font-medium">+2 this week</span>
                                </div>
                            </div>
                        </div>

                        {/* Narrative Summary */}
                        <div className="flex-1">
                            <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">The Pulse</h1>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                {memory.name}, your stability is high, but your activity is lagging.
                                You’re winning on meds, but the late-night spikes are holding back your 80+ potential.
                            </p>

                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                                    <span>📥</span> Share with Doctor
                                </button>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                                    <span>👋</span> Invite Caregiver
                                </button>
                            </div>
                        </div>

                        {/* Sparkline Visual - simplified */}
                        <div className="hidden lg:block w-48 h-32 bg-gray-50 rounded-xl p-4">
                            <div className="text-xs text-gray-400 mb-2">30 Day Trajectory</div>
                            <div className="h-full flex items-end gap-1">
                                {bloodSugarTrend.map((val, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 bg-purple-200 rounded-t-sm transition-all hover:bg-purple-400"
                                        style={{ height: `${(val - 100) * 1.5}%` }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Pillar Breakdown: "4-Quadrant Stability Map" */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Clinical Stability */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-display font-bold text-lg text-gray-900">Clinical Stability</h3>
                                <p className="text-xs text-gray-500">Blood Glucose & Pressure</p>
                            </div>
                            <div className="badge px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">94% TIR</div>
                        </div>

                        <div className="h-48 w-full bg-gray-50 rounded-xl p-4 relative overflow-hidden flex items-end">
                            {/* Mock Line Chart */}
                            <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
                                <path
                                    d="M0,80 C20,70 50,90 80,60 S150,40 200,50 S280,20 300,30"
                                    fill="none"
                                    stroke="#9333EA"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M0,80 C20,70 50,90 80,60 S150,40 200,50 S280,20 300,30 L300,100 L0,100 Z"
                                    fill="url(#gradient)"
                                    fillOpacity="0.1"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#9333EA" />
                                        <stop offset="100%" stopColor="white" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Reference Lines */}
                            <div className="absolute top-10 w-full border-t border-dashed border-gray-300"></div>
                            <div className="absolute bottom-10 w-full border-t border-dashed border-gray-300"></div>
                        </div>
                        <div className="mt-3 flex justify-between text-xs text-gray-400">
                            <span>7am</span>
                            <span>12pm</span>
                            <span>5pm</span>
                            <span>10pm</span>
                        </div>
                    </div>

                    {/* Medication Adherence */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-display font-bold text-lg text-gray-900">Adherence</h3>
                                <p className="text-xs text-gray-500">Last 30 Days</p>
                            </div>
                            <div className="text-xl">🔥 12 Day Streak</div>
                        </div>

                        <div className="grid grid-cols-7 gap-3 mb-4">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                <div key={d} className="text-center text-xs font-medium text-gray-400">{d}</div>
                            ))}
                            {adherenceData.map((status, i) => (
                                <div key={i} className="flex justify-center">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
                      ${status === 'full' ? 'bg-green-100 text-green-700' :
                                                status === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-50 text-red-400'}
                    `}
                                    >
                                        {i + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Lifestyle Resilience */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="font-display font-bold text-lg text-gray-900 mb-2">Lifestyle Resilience</h3>
                        <div className="bg-indigo-50 rounded-xl p-4 mb-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">👟</span>
                                <span className="font-medium text-indigo-900 text-sm">Motion Impact</span>
                            </div>
                            <p className="text-sm text-indigo-800">Your BP is <span className="font-bold">10% lower</span> on days you hit 8,000 steps.</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Correlation found with verified device data
                        </div>
                    </div>

                    {/* Risk Mitigation */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 opacity-50"></div>

                        <h3 className="font-display font-bold text-lg text-gray-900 mb-4">Risk Shield</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-100 rounded-xl">
                                <span className="text-green-600">🛡️</span>
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">Flare-up Avoided</div>
                                    <div className="text-xs text-gray-500">Consistent hydration stabilized levels</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl">
                                <span className="text-gray-400">👁️</span>
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">Vision Check</div>
                                    <div className="text-xs text-gray-500">Upcoming in 2 weeks</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. The "Why" Engine */}
                <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <h2 className="font-display text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span>💡</span> Insight Correlation
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex gap-4">
                            <div className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0 bg-cover bg-center relative group overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🥗</div>
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">Contextual Nutrition</div>
                                <h4 className="font-bold text-gray-900 text-sm mb-1">Lunch Impact Analysis</h4>
                                <p className="text-sm text-gray-500">That Quinoa Salad kept your post-meal glucose spike under 140mg/dL. A great alternative to the jollof rice from Tuesday.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-24 h-24 bg-red-50 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl">
                                🤕
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">Pattern Recognition</div>
                                <h4 className="font-bold text-gray-900 text-sm mb-1">Symptom Overlay</h4>
                                <p className="text-sm text-gray-500">Your logged "Afternoon Headaches" correlate with days where water intake was below 1.5L.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Predictive Outlook */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl -mr-32 -mt-32 opacity-30"></div>

                        <div className="relative z-10">
                            <div className="text-purple-300 font-semibold mb-2 text-sm uppercase tracking-wide">The Next 7 Days</div>
                            <h2 className="font-display text-2xl font-bold mb-4">Forecast: Trending Upward 🚀</h2>

                            <div className="flex items-center gap-8 mb-6">
                                <div>
                                    <div className="text-3xl font-bold">82</div>
                                    <div className="text-xs text-gray-400">Projected Score</div>
                                </div>
                                <div className="h-10 w-px bg-gray-600"></div>
                                <div>
                                    <div className="text-3xl font-bold text-green-400">-4%</div>
                                    <div className="text-xs text-gray-400">Est. Glucose Var</div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                <div className="font-bold text-white mb-1">🎯 The Amina Challenge</div>
                                <p className="text-sm text-gray-300">"If we can stabilize your 8 PM glucose readings this week, your score will likely clearly pass 80. Try a 15-min walk after dinner."</p>
                            </div>
                        </div>
                    </div>

                    {/* Marketplace Integration */}
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-4 text-orange-600 font-medium text-sm">
                                <span>⚠️</span> Low Supply Alert
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                Based on your log frequency, you’re running low on <span className="font-semibold text-gray-900">Accu-Chek Test Strips</span>.
                            </p>
                        </div>

                        <button className="w-full py-3 bg-orange-50 text-orange-700 font-semibold rounded-xl text-sm hover:bg-orange-100 transition-colors">
                            Order Verified Refills
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
}
