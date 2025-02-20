import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'userSettings';

enum TemperatureUnit {
    Celsius = 'celsius',
    Fahrenheit = 'fahrenheit',
};

enum SoundEffect {
    On = 'on',
    Off = 'off',
};

enum TextSize {
    Normal = 'normal',
    Large = 'large',
    ExtraLarge = 'extra large',
};

type Settings = {
    textSize: TextSize;
    soundEffect: SoundEffect;
    temperatureUnit: TemperatureUnit;
};

const DEFAULT_SETTINGS: Settings = {
    textSize: TextSize.Normal,
    soundEffect: SoundEffect.On,
    temperatureUnit: TemperatureUnit.Celsius,
};

export const useLocalStorageSettings = () => {
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const storedSettings = await AsyncStorage.getItem(STORAGE_KEY) ?? JSON.stringify(DEFAULT_SETTINGS);
                if (storedSettings) {
                    setSettings(JSON.parse(storedSettings));
                }
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        };

        loadSettings();
    }, []);

    const changeSetting = async <K extends keyof Settings>(key: K, value: Settings[K]) => {
        try {
            const updatedSettings = { ...settings, [key]: value };
            setSettings(updatedSettings);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    const resetSettings = async () => {
        try {
            setSettings(DEFAULT_SETTINGS);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
        } catch (error) {
            console.error('Error resetting settings:', error);
        }
    }

    return { settings, changeSetting, resetSettings };
};

export { Settings, TemperatureUnit, SoundEffect, TextSize };
