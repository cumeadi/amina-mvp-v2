import React, { useState } from 'react';

export default function WalletAndInsurance({ onClose, memory }) {
    const [activeTab, setActiveTab] = useState('wallet'); // wallet, insurance
    const [showScanner, setShowScanner] = useState(false);
    const [scanning, setScanning] = useState(false);

    // Mock Data
    const [walletData, setWalletData] = useState({
        balance: '₦12,500',
        points: 450,
        ashiaStatus: 'active', // active, inactive
        ashiaSponsor: 'Chidi (Brother in US)',
        cards: [
            { type: 'Visa', last4: '4242', expiry: '12/28' },
            { type: 'Mastercard', last4: '8839', expiry: '09/27' }
        ]
    });

    const [insuranceData, setInsuranceData] = useState([
        {
            provider: 'Reliance HMO',
            id: 'REL-882993',
            plan: 'Roam Silver',
            status: 'Active',
            coverage: '80%'
        }
    ]);

    const handleScan = () => {
        setScanning(true);
        setTimeout(() => {
            setScanning(false);
            setShowScanner(false);
            setInsuranceData([...insuranceData, {
                provider: 'ASHIA',
                id: 'ASH-99283-X',
                plan: 'Standard Care',
                status: 'Active',
                coverage: '100% (Primary)'
            }]);
        }, 3000);
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end font-sans text-gray-900">
            <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
                <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .animate-slide-in {
            animation: slideIn 0.3s ease-out forwards;
          }
          @keyframes scan {
              0% { top: 0; }
              50% { top: 100%; }
              100% { top: 0; }
          }
          .scan-line {
              animation: scan 2s linear infinite;
          }
        `}</style>

                {/* Header */}
                <div className="bg-white border-b border-gray-100 p-4 flex items-center justify-between">
                    <div>
                        <h2 className="font-display font-bold text-lg flex items-center gap-2">
                            Wallet & Insurance
                        </h2>
                        <div className="text-xs text-gray-500">Financial Health Pillar</div>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100">✕</button>
                </div>

                {/* Tabs */}
                <div className="flex p-2 gap-2 bg-gray-50 mx-4 mt-4 rounded-xl">
                    <button
                        onClick={() => setActiveTab('wallet')}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'wallet' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        💳 Payment Methods
                    </button>
                    <button
                        onClick={() => setActiveTab('insurance')}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'insurance' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        🏥 Insurance
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">

                    {/* WALLET TAB */}
                    {activeTab === 'wallet' && (
                        <div className="space-y-6 animate-fade-in">

                            {/* Health Wallet Card */}
                            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-purple-200">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <div className="text-purple-200 text-xs font-medium uppercase tracking-wider mb-1">Amina Health Wallet</div>
                                            <div className="font-display font-bold text-3xl">{walletData.balance}</div>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                            <span>💎</span> {walletData.points} pts
                                        </div>
                                    </div>

                                    {/* ASHIA Status Badge */}
                                    {walletData.ashiaStatus === 'active' && (
                                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center gap-3">
                                            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-lg shadow-lg">
                                                🛡️
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm">ASHIA Premium Covered</div>
                                                <div className="text-[10px] text-purple-100">Sponsored by {walletData.ashiaSponsor}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Funding Options */}
                            <div className="grid grid-cols-2 gap-3">
                                <button className="p-3 bg-purple-50 text-purple-700 rounded-xl font-medium text-sm hover:bg-purple-100 flex flex-col items-center gap-2 transition-colors">
                                    <span className="text-xl">➕</span>
                                    Top Up Balance
                                </button>
                                <button className="p-3 bg-gray-50 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-100 flex flex-col items-center gap-2 transition-colors">
                                    <span className="text-xl">📄</span>
                                    Transaction History
                                </button>
                            </div>

                            {/* Payment Data */}
                            <div>
                                <h3 className="font-bold text-gray-900 mb-3">Linked Cards</h3>
                                <div className="space-y-3">
                                    {walletData.cards.map((card, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-white text-[10px] uppercase font-bold tracking-widest">
                                                    {card.type}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-sm text-gray-900">•••• {card.last4}</div>
                                                    <div className="text-xs text-gray-500">Expires {card.expiry}</div>
                                                </div>
                                            </div>
                                            <button className="text-gray-400 hover:text-red-500">🗑️</button>
                                        </div>
                                    ))}
                                    <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-medium text-sm hover:border-purple-300 hover:text-purple-600 transition-all flex items-center justify-center gap-2">
                                        <span>➕</span> Add New Card
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* INSURANCE TAB */}
                    {activeTab === 'insurance' && (
                        <div className="space-y-6 animate-fade-in">

                            {/* Active Plans */}
                            <div className="space-y-4">
                                {insuranceData.map((ins, i) => (
                                    <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h4 className="font-bold text-gray-900">{ins.provider}</h4>
                                                <div className="text-xs text-gray-500">{ins.plan} • ID: {ins.id}</div>
                                            </div>
                                            <div className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded flex items-center gap-1">
                                                <span>✓</span> {ins.status}
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-between text-xs">
                                            <span className="text-blue-800 font-medium">Outpatient Coverage</span>
                                            <span className="font-bold text-blue-900">{ins.coverage}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Scan Trigger */}
                            {!showScanner ? (
                                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
                                        📸
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1">Link New Insurance</h3>
                                    <p className="text-sm text-gray-500 mb-4">Scan your HMO or ASHIA card to instantly check eligibility.</p>
                                    <button
                                        onClick={() => setShowScanner(true)}
                                        className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
                                    >
                                        Scan Card
                                    </button>
                                </div>
                            ) : (
                                // Mock Scanner UI
                                <div className="relative bg-black rounded-2xl aspect-[4/3] overflow-hidden">
                                    {!scanning ? (
                                        <>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-48 h-32 border-2 border-white/50 rounded-xl relative">
                                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                                                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                                                <button
                                                    onClick={handleScan}
                                                    className="w-14 h-14 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center"
                                                >
                                                    <div className="w-10 h-10 bg-white rounded-full"></div>
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => setShowScanner(false)}
                                                className="absolute top-4 right-4 text-white p-2"
                                            >
                                                ✕
                                            </button>
                                            <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full text-white text-xs">
                                                Position card in frame
                                            </div>
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                                            <div className="w-full absolute top-0 h-1 bg-green-400 shadow-[0_0_10px_#4ade80] scan-line"></div>
                                            <div className="text-white font-mono text-lg animate-pulse">Scanning ID...</div>
                                            <div className="text-green-400 text-xs mt-2">Connecting to ASHIA Portal...</div>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-white">
                    <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                        <span>🔒 Bank-Grade Security</span>
                        <span>•</span>
                        <span>PCI DSS Compliant</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
