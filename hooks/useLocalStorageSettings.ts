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
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadSettings = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                const storedSettings = await AsyncStorage.getItem(STORAGE_KEY) ?? JSON.stringify(DEFAULT_SETTINGS);
                if (storedSettings) {
                    setSettings(JSON.parse(storedSettings));
                }
            } catch (error) {
                console.error('Error loading settings:', error);
            } finally {
                setLoading(false);
            }
        };

        loadSettings();
    }, []);

    const changeSetting = async <K extends keyof Settings>(key: K, value: Settings[K]) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const updatedSettings = { ...settings, [key]: value };
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
            setSettings(updatedSettings);
        } catch (error) {
            console.error('Error saving settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetSettings = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
        } catch (error) {
            console.error('Error resetting settings:', error);
        } finally {
            setSettings(DEFAULT_SETTINGS);
            setLoading(false);
        }
    }

    return { settings, changeSetting, resetSettings, loading };
};

export { Settings, TemperatureUnit, SoundEffect, TextSize };
