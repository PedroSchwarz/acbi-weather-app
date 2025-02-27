import { ThemedView } from '@/components/ThemedView';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import SettingsOption from './components/SettingsOption';
import { useSettings } from '@/contexts/SettingsContext';
import { SoundEffect, TemperatureUnit, TextSize } from '@/hooks/useLocalStorageSettings';
import BrightnessOption from './components/BrightnessOption';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { Button } from 'react-native-paper';
import AppInformationBlock from './components/AppInformationBlock';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function SettingsScreen() {
    const { settings, changeSetting, resetSettings } = useSettings();
    const accent = useThemeColor({}, 'accent');
    const background = useThemeColor({}, 'background');

    return (
        <>
            <Stack.Screen options={{
                title: 'Settings', headerRight: () => {
                    return <Button onPress={resetSettings}><ThemedText style={{ color: accent }}>Reset</ThemedText></Button>
                },
                headerTitleAlign: 'center',
                headerBackButtonDisplayMode: 'minimal',
                headerStyle: { backgroundColor: background },
                headerShadowVisible: false,
            }} />
            <ThemedView style={styles.container}>
                <SafeAreaProvider>
                    <SafeAreaView style={{ flex: 1 }}>
                        <ScrollView>
                            <ThemedView style={{ gap: 10, padding: 16 }}>
                                <SettingsOption title="Temperature Unit:" value={settings.temperatureUnit} options={[TemperatureUnit.Celsius, TemperatureUnit.Fahrenheit]} onChange={(name) => { changeSetting('temperatureUnit', name as TemperatureUnit) }} />

                                <SettingsOption title="Text Size:" value={settings.textSize} options={[TextSize.Normal, TextSize.Large, TextSize.ExtraLarge]} onChange={(size) => { changeSetting('textSize', size as TextSize) }} />

                                <SettingsOption title="Sound Effect" value={settings.soundEffect} options={[SoundEffect.On, SoundEffect.Off]} onChange={(name) => { changeSetting('soundEffect', name as SoundEffect) }} />

                                <BrightnessOption />

                                <AppInformationBlock />
                            </ThemedView>
                        </ScrollView >
                    </SafeAreaView>
                </SafeAreaProvider>
            </ThemedView>

        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    row: { flexDirection: 'row', alignItems: 'center' },
});
