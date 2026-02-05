import React, { useState } from 'react';

export default function MarketplaceTray({ item, onClose, onComplete }) {
    const [step, setStep] = useState('selection'); // selection, payment, tracking
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('wallet');

    // Mock Providers
    const providers = [
        {
            id: 'healthplus',
            name: 'HealthPlus Pharmacy',
            price: '₦4,500',
            eta: '2 hrs',
            verified: true,
            license: 'PCN-19284'
        },
        {
            id: 'medplus',
            name: 'MedPlus',
            price: '₦4,750',
            eta: '45 mins',
            verified: true,
            license: 'PCN-88392'
        }
    ];

    const handlePayment = () => {
        // Simulate processing
        setTimeout(() => {
            setStep('tracking');
            if (onComplete) onComplete();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex justify-end font-sans text-gray-900">
            <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
                <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .animate-slide-in {
            animation: slideIn 0.3s ease-out forwards;
          }
        `}</style>

                {/* Header */}
                <div className="bg-white border-b border-gray-100 p-4 flex items-center justify-between">
                    <div>
                        <h2 className="font-display font-bold text-lg flex items-center gap-2">
                            Secure Fulfillment
                            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full border border-green-100 flex items-center gap-1">
                                <span>🔒</span> Verified
                            </span>
                        </h2>
                        <div className="text-xs text-gray-500">Managed by Amina Logistics</div>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100">✕</button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">

                    {/* Order Summary Card */}
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <div className="relative z-10 flex gap-4">
                            <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center text-3xl">
                                💊
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-lg">{item?.name || 'Metformin Refill'}</h3>
                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded">Rx Verified</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">500mg • 60 Tablets • Extended Release</p>
                                <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded inline-block">
                                    ✨ Maintains your 78 Health Score
                                </div>
                            </div>
                        </div>
                    </div>

                    {step === 'selection' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm text-gray-700">Select Vetted Provider</h3>
                                <button className="text-xs text-purple-600 font-medium">Compare Prices</button>
                            </div>

                            <div className="space-y-3">
                                {providers.map(provider => (
                                    <div
                                        key={provider.id}
                                        onClick={() => setSelectedProvider(provider)}
                                        className={`bg-white p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedProvider?.id === provider.id
                                                ? 'border-purple-500 shadow-md shadow-purple-100'
                                                : 'border-gray-100 hover:border-purple-200'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-gray-900">{provider.name}</span>
                                                {provider.verified && (
                                                    <span className="text-xs text-green-600 flex items-center">
                                                        🛡️
                                                    </span>
                                                )}
                                            </div>
                                            <div className="font-bold text-lg text-gray-900">{provider.price}</div>
                                        </div>

                                        <div className="flex justify-between items-center text-xs text-gray-500">
                                            <div className="flex gap-3">
                                                <span>🕒 {provider.eta}</span>
                                                <span>License: {provider.license}</span>
                                            </div>
                                            {provider.id === 'healthplus' && (
                                                <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Cold-Chain Ready ❄️</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'payment' && (
                        <div className="space-y-4 animate-fade-in">
                            <h3 className="font-bold text-sm text-gray-700">Payment Method</h3>

                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                                <div
                                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-2 ${paymentMethod === 'wallet' ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'}`}
                                    onClick={() => setPaymentMethod('wallet')}
                                >
                                    <div className="w-5 h-5 rounded-full border-2 border-purple-600 flex items-center justify-center">
                                        {paymentMethod === 'wallet' && <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-sm">Amina Health Wallet</div>
                                        <div className="text-xs text-gray-500">Balance: ₦12,500</div>
                                    </div>
                                </div>

                                <div
                                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'}`}
                                    onClick={() => setPaymentMethod('card')}
                                >
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                        {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-sm">Pay with Card/USSD</div>
                                        <div className="text-xs text-gray-500">Flutterwave Secured</div>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="w-6 h-4 bg-gray-200 rounded"></div>
                                        <div className="w-6 h-4 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-purple-50 p-4 rounded-xl flex gap-3 text-xs text-purple-800">
                                <span className="text-lg">💡</span>
                                <p>Paying with your Health Wallet earns you <strong>50 Future-Points</strong> towards your next premium renewal.</p>
                            </div>
                        </div>
                    )}

                    {step === 'tracking' && (
                        <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-fade-in">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl mb-2 animate-bounce">
                                ✅
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-xl text-gray-900">Order Confirmed!</h3>
                                <p className="text-gray-500 text-sm">Ref #8839-XP29</p>
                            </div>

                            <div className="w-full bg-white p-6 rounded-2xl border border-gray-100 text-left">
                                <h4 className="font-bold text-sm mb-4">Live Status</h4>

                                <div className="space-y-6 relative">
                                    <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="w-6 h-6 rounded-full bg-green-500 ring-4 ring-white flex items-center justify-center text-white text-xs">✓</div>
                                        <div>
                                            <div className="font-bold text-sm">Order Placed</div>
                                            <div className="text-xs text-gray-500">2:30 PM</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="w-6 h-6 rounded-full bg-green-500 ring-4 ring-white flex items-center justify-center text-white text-xs">✓</div>
                                        <div>
                                            <div className="font-bold text-sm">Vetted by Amina</div>
                                            <div className="text-xs text-gray-500">2:31 PM • Batch #9928 Verifed</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="w-6 h-6 rounded-full bg-purple-600 ring-4 ring-purple-100 flex items-center justify-center text-white text-xs animate-pulse">🚚</div>
                                        <div>
                                            <div className="font-bold text-sm text-purple-700">Dispatching</div>
                                            <div className="text-xs text-purple-600">Finding nearest rider...</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 relative z-10 opacity-50">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 ring-4 ring-white"></div>
                                        <div>
                                            <div className="font-bold text-sm">Delivered & Logged</div>
                                            <div className="text-xs text-gray-500">Est. 4:15 PM</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full">
                                <button onClick={onClose} className="w-full py-3 bg-gray-100 text-gray-900 rounded-xl font-medium hover:bg-gray-200">
                                    Close Tracker
                                </button>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Actions */}
                {step !== 'tracking' && (
                    <div className="p-4 border-t border-gray-100 bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500 text-sm">Total to pay</span>
                            <span className="font-display font-bold text-xl">
                                {selectedProvider ? selectedProvider.price : '---'}
                            </span>
                        </div>

                        <button
                            disabled={!selectedProvider}
                            onClick={() => step === 'selection' ? setStep('payment') : handlePayment()}
                            className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-gray-200"
                        >
                            {step === 'selection' ? 'Proceed to Payment' : 'Pay & Schedule Delivery'}
                        </button>
                        <div className="text-center mt-3 text-xs text-gray-400">
                            Secured by <strong>Flutterwave</strong> • 256-bit Encryption
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
