import React, { createContext, useContext } from 'react';
import { City } from '@/app/citiesList';
import { useLocalStorageCheckbox } from '@/hooks/useLocalStorageCities';

type CitiesContextType = {
    checkedItems: Record<string, City>;
    toggleItem: (item: City) => void;
};

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

export const CitiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { checkedItems, toggleItem } = useLocalStorageCheckbox();

    return (
        <CitiesContext.Provider value={{ checkedItems, toggleItem }}>
            {children}
        </CitiesContext.Provider>
    );
};

export const useCities = () => {
    const context = useContext(CitiesContext);
    if (!context) {
        throw new Error("useCities must be used within a CitiesProvider");
    }
    return context;
};
