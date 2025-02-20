import { ISoundRepository, SoundRepository } from '@/repositories/SoundRepository';
import React, { createContext, PropsWithChildren, useContext, useEffect } from 'react';

type SoundProviderProps = PropsWithChildren & {
    fileName: string
}

const SoundContext = createContext<SoundRepository | undefined>(undefined);

export const SoundProvider: React.FC<SoundProviderProps> = ({ children, fileName }) => {
    const repository = ISoundRepository.getInstance();

    useEffect(() => {
        const loadSoundFile = async () => {
            await repository.loadSound(fileName);
        }

        loadSoundFile();
    }, []);

    return (
        <SoundContext.Provider value={repository}>
            {children}
        </SoundContext.Provider>
    );
};

export const useActionSound = () => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error("useActionSound must be used within a SoundProvider");
    }
    return context;
};
