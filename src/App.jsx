import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Onboarding from './Onboarding';

export default function App() {
    const [isOnboarded, setIsOnboarded] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Check local storage for onboarding status
        const savedStatus = localStorage.getItem('amina_onboarded');
        if (savedStatus === 'true') {
            const savedData = localStorage.getItem('amina_user_data');
            if (savedData) setUserData(JSON.parse(savedData));
            setIsOnboarded(true);
        }
    }, []);

    const handleOnboardingComplete = (data) => {
        setUserData(data);
        setIsOnboarded(true);
        localStorage.setItem('amina_onboarded', 'true');
        localStorage.setItem('amina_user_data', JSON.stringify(data));
    };

    const handleLogout = () => {
        setIsOnboarded(false);
        setUserData(null);
        localStorage.removeItem('amina_onboarded');
    };

    if (isOnboarded) {
        return <Dashboard onLogout={handleLogout} userData={userData} />;
    }

    return <Onboarding onComplete={handleOnboardingComplete} />;
}
