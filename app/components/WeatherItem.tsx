import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useMemo } from 'react';
import { StyleSheet, Image, ViewStyle } from 'react-native';
import { City } from '../citiesList';
import { useWeatherData } from '@/hooks/useWeatherData';
import DeletableItem from '@/components/DeletableItem';
import { useSettings } from '@/contexts/SettingsContext';
import { SoundEffect, TemperatureUnit } from '@/hooks/useLocalStorageSettings';
import { ActivityIndicator } from 'react-native-paper';
import { useActionSound } from '@/contexts/SoundContext';
import { useThemeColor } from '@/hooks/useThemeColor';

type WeatherItemProps = City & { onDelete: () => void };

const WeatherItem: React.FC<WeatherItemProps> = ({ name, country, onDelete }) => {
    const { settings: { temperatureUnit, soundEffect } } = useSettings();
    const { loading, temperature, weatherCondition, date, time } = useWeatherData(name, country);
    const actionSound = useActionSound();
    const accent = useThemeColor({}, 'accent');

    const unit = useMemo(() => {
        return temperatureUnit === TemperatureUnit.Celsius ? '°C' : '°F';
    }, [temperatureUnit]);

    if (loading) {
        return (
            <ThemedView style={styles.loadingContainer}>
                <ActivityIndicator color={accent} />
            </ThemedView>
        );
    }

    const handleOnDelete = () => {
        onDelete();
        if (soundEffect === SoundEffect.On) {
            actionSound.playSound();
        }
    }

    return (
        <DeletableItem onDelete={handleOnDelete}>
            <ThemedView style={styles.container}>
                <ThemedView style={styles.column}>
                    <ThemedView style={styles.row}>
                        <ThemedText type='defaultSemiBold'>{name}</ThemedText>
                        <ThemedText>{`, ${country}`}</ThemedText>
                    </ThemedView>
                    <ThemedText type='subtitle'>{time}</ThemedText>
                    <ThemedText>{date}</ThemedText>
                </ThemedView>

                <ThemedView style={styles.columnEnd}>
                    <ThemedView style={styles.row}>
                        <Image style={styles.image} source={{ uri: `https:${weatherCondition?.icon}` }} />
                        <ThemedText type='subtitle'>{`${temperature}${unit}`}</ThemedText>
                    </ThemedView>
                    <ThemedText>{weatherCondition?.text}</ThemedText>
                </ThemedView>
            </ThemedView>
        </DeletableItem>
    );
}

const GAP_SIZE = 16;
const IMAGE_SIZE = 30;

const columnBase: ViewStyle = { flexDirection: 'column', gap: GAP_SIZE };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    loadingContainer: {
        flex: 1,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    columnBase: {
        flexDirection: 'column',
        gap: GAP_SIZE,
    },
    column: columnBase,
    columnEnd: {
        ...columnBase,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    row: { flexDirection: 'row' },
    image: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        resizeMode: 'cover',
    },
});

export default WeatherItem;
