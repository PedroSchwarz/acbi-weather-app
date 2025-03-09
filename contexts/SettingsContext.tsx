import React, { createContext, useContext } from 'react';
import { Settings, useLocalStorageSettings } from '@/hooks/useLocalStorageSettings';


type SettingsContextType = {
    settings: Settings;
    loading: boolean;
    changeSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => Promise<void>;
    resetSettings: () => Promise<void>;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const settings = useLocalStorageSettings();

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsContext");
    }
    return context;
};