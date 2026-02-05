import React, { useState } from 'react';

export default function BookingTray({ service, onClose, onComplete }) {
    const [step, setStep] = useState('schedule'); // schedule, type, provider, confirmed
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({
        date: 'Mon 12',
        time: '10:00 AM',
        type: 'Virtual'
    });

    // Mock Professionals Data
    const professionals = {
        'Dietary consultation': [
            {
                id: 1,
                name: "Amara Nwachukwu",
                title: "Clinical Nutritionist",
                rating: 4.9,
                reviews: 124,
                price: "₦15,000",
                image: "👩🏾‍⚕️",
                verified: true,
                availableTypes: ['Virtual', 'Physical'],
                nextAvailable: 'Tomorrow'
            },
            {
                id: 2,
                name: "Dr. Tunde Bakare",
                title: "Dietitian & Wellness Coach",
                rating: 4.7,
                reviews: 89,
                price: "₦12,500",
                image: "👨🏾‍⚕️",
                verified: true,
                availableTypes: ['Virtual'],
                nextAvailable: 'Wed, Feb 14'
            }
        ],
        'Annual eye exam': [
            {
                id: 3,
                name: "Vision Care Vi",
                title: "Optometry Clinic",
                rating: 4.8,
                reviews: 312,
                price: "₦25,000",
                image: "🏥",
                verified: true,
                availableTypes: ['Physical'],
                nextAvailable: 'Today'
            },
            {
                id: 4,
                name: "Dr. Chioma Okeke",
                title: "Senior Optometrist",
                rating: 5.0,
                reviews: 56,
                price: "₦30,000",
                image: "👩🏾‍⚕️",
                verified: true,
                availableTypes: ['Physical'],
                nextAvailable: 'Fri, Feb 16'
            }
        ]
    };

    // Filter providers based on type selection (mock logic)
    const currentProviders = professionals[service?.need]?.filter(p =>
        p.availableTypes.includes(bookingDetails.type)
    ) || [];

    const handleBook = () => {
        // Simulate booking process
        setTimeout(() => {
            setStep('confirmed');
            if (onComplete) onComplete();
        }, 1500);
    };

    const getButtonText = () => {
        switch (step) {
            case 'schedule': return 'Next: Consultation Type';
            case 'type': return 'Find Specialists';
            case 'provider': return 'Confirm Booking';
            default: return 'Next';
        }
    };

    const handleNextStep = () => {
        if (step === 'schedule') setStep('type');
        else if (step === 'type') setStep('provider');
        else if (step === 'provider') handleBook();
    };

    const isNextDisabled = () => {
        if (step === 'provider' && !selectedProvider) return true;
        return false;
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
                            Book Specialist
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100 flex items-center gap-1">
                                <span>🛡️</span> Verified Care
                            </span>
                        </h2>
                        <div className="text-xs text-gray-500">Amina Health Partners</div>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100">✕</button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">

                    {/* Service Header Card */}
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex gap-4">
                            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
                                {service?.need.includes('eye') ? '👁️' : '🥗'}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{service?.need}</h3>
                                <p className="text-sm text-gray-500">Connect with top-rated specialists near you.</p>
                            </div>
                        </div>
                    </div>

                    {/* STEP 1: SCHEDULE */}
                    {step === 'schedule' && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="font-bold text-lg text-gray-900">When works for you?</h3>

                            {/* Date Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Select Date</label>
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {['Today', 'Mon 12', 'Tue 13', 'Wed 14', 'Thu 15'].map((d) => (
                                        <button
                                            key={d}
                                            onClick={() => setBookingDetails({ ...bookingDetails, date: d })}
                                            className={`min-w-[70px] p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${bookingDetails.date === d
                                                ? 'border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-200'
                                                : 'border-gray-200 bg-white hover:border-blue-300'
                                                }`}
                                        >
                                            <span className={`text-xs mb-1 ${bookingDetails.date === d ? 'opacity-80' : 'opacity-70'}`}>{d.split(' ')[0]}</span>
                                            <span className="font-bold">{d.split(' ')[1] || '10'}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Time Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Available Time</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['09:00 AM', '10:00 AM', '02:00 PM', '04:30 PM'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setBookingDetails({ ...bookingDetails, time: t })}
                                            className={`p-2 rounded-lg text-xs font-medium border transition-all ${bookingDetails.time === t ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-white border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: TYPE */}
                    {step === 'type' && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="font-bold text-lg text-gray-900">How do you want to meet?</h3>

                            <div className="space-y-3">
                                {['Virtual', 'Physical'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setBookingDetails({ ...bookingDetails, type })}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${bookingDetails.type === type
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 bg-white hover:border-blue-200'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${bookingDetails.type === type ? 'bg-blue-200' : 'bg-gray-100'
                                            }`}>
                                            {type === 'Virtual' ? '📹' : '🏥'}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{type} Consultation</div>
                                            <div className="text-sm text-gray-500">
                                                {type === 'Virtual' ? 'Video call via Amina App' : 'Visit a verified clinic near you'}
                                            </div>
                                        </div>
                                        <div className={`ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center ${bookingDetails.type === type ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                                            }`}>
                                            {bookingDetails.type === type && <span className="text-white text-xs">✓</span>}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 3: SELECT PROVIDER */}
                    {step === 'provider' && (
                        <div className="space-y-4 animate-fade-in">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm text-gray-700">Available {bookingDetails.type} Specialists</h3>
                                <div className="text-xs text-gray-500">
                                    {bookingDetails.date} @ {bookingDetails.time}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {currentProviders.length > 0 ? currentProviders.map(provider => (
                                    <div
                                        key={provider.id}
                                        onClick={() => setSelectedProvider(provider)}
                                        className={`bg-white p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedProvider?.id === provider.id
                                            ? 'border-blue-500 shadow-md shadow-blue-100'
                                            : 'border-gray-100 hover:border-blue-200'
                                            }`}
                                    >
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                                                {provider.image}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-gray-900">{provider.name}</h4>
                                                    <span className="font-bold text-gray-900 text-sm">{provider.price}</span>
                                                </div>
                                                <div className="text-xs text-gray-500 mb-1">{provider.title}</div>
                                                <div className="flex items-center gap-3 text-xs">
                                                    <span className="flex items-center gap-1 text-orange-500 font-bold">★ {provider.rating} ({provider.reviews})</span>
                                                    <span className="px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-[10px] font-medium">Available</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="p-8 text-center text-gray-500">
                                        No specialists available for {bookingDetails.type} consultation at this time.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* STEP 4: CONFIRMED */}
                    {step === 'confirmed' && (
                        <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-fade-in">
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-5xl mb-2 animate-bounce">
                                🎉
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-xl text-gray-900">Booking Confirmed!</h3>
                                <p className="text-gray-500 text-sm">A calendar invite has been sent to your email.</p>
                            </div>

                            <div className="w-full bg-white p-6 rounded-2xl border border-gray-100 text-left shadow-sm">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">{service?.need}</h4>
                                        <div className="text-sm text-gray-500">with {selectedProvider?.name}</div>
                                    </div>
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                                        {selectedProvider?.image}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">📅</div>
                                        <div>
                                            <div className="text-xs text-gray-400 font-bold uppercase">Date & Time</div>
                                            <div className="font-medium text-sm">{bookingDetails.date} • {bookingDetails.time}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                                            {bookingDetails.type === 'Virtual' ? '📹' : '🏥'}
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 font-bold uppercase">Location</div>
                                            <div className="font-medium text-sm">{bookingDetails.type === 'Virtual' ? 'Amina Virtual Care' : 'Isolo General Hospital, Lagos'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full space-y-3">
                                <button className="w-full py-3 bg-blue-50 text-blue-700 rounded-xl font-bold hover:bg-blue-100 transition-colors">
                                    Add to Calendar
                                </button>
                                <button onClick={onClose} className="w-full py-3 bg-white text-gray-500 rounded-xl font-medium hover:text-gray-700">
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Actions */}
                {step !== 'confirmed' && (
                    <div className="p-4 border-t border-gray-100 bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500 text-sm">Estimated Total</span>
                            <span className="font-display font-bold text-xl">
                                {selectedProvider ? selectedProvider.price : '---'}
                            </span>
                        </div>

                        <button
                            disabled={isNextDisabled()}
                            onClick={handleNextStep}
                            className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-gray-200"
                        >
                            {getButtonText()}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
