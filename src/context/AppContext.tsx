import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Beneficiary } from '../types';

// Define the shape of our Global State
interface AppState {
    currentUser: {
        id: string;
        name: string;
        role: 'admin' | 'doctor' | 'social_worker' | 'nurse';
    } | null;
    activeBeneficiary: Beneficiary | null;
    theme: 'light' | 'dark';
    language: 'ar' | 'en';
}

// Define the Actions (Methods to update state)
interface AppContextType extends AppState {
    setCurrentUser: (user: AppState['currentUser']) => void;
    setActiveBeneficiary: (beneficiary: Beneficiary | null) => void;
    toggleTheme: () => void;
    setLanguage: (lang: 'ar' | 'en') => void;
}

// Create Context with default values
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider Component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // State Initialization
    const [currentUser, setCurrentUser] = useState<AppState['currentUser']>({
        id: '1',
        name: 'Admin User',
        role: 'admin' // Default for dev
    });
    const [activeBeneficiary, setActiveBeneficiary] = useState<Beneficiary | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [language, setLanguage] = useState<'ar' | 'en'>('ar');

    // Actions
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
        // Logic to update document class for Tailwind dark mode could go here
    };

    const value = {
        currentUser,
        activeBeneficiary,
        theme,
        language,
        setCurrentUser,
        setActiveBeneficiary,
        toggleTheme,
        setLanguage
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// Custom Hook for easy access
export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
