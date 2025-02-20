import { ThemedView } from '@/components/ThemedView';
import { Stack, useRouter, } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, FlatList, Pressable } from 'react-native';
import { City } from './citiesList';
import WeatherItem from './components/WeatherItem';
import { Button, Divider } from 'react-native-paper';
import { useCities } from '@/contexts/CitiesContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Orientation, useDeviceOrientation } from '@/hooks/useDeviceOrientation';

export default function WeatherListScreen() {
    const { checkedItems, toggleItem } = useCities();
    const orientation = useDeviceOrientation();
    const [cities, setCities] = useState<City[]>([]);
    const router = useRouter();

    useEffect(() => { setCities(Object.values(checkedItems)) }, [checkedItems]);

    const isLandscape = useMemo(() => orientation === Orientation.Landscape, [orientation]);

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: !isLandscape,
                    title: 'Weather',
                    headerRight: () => (
                        <Pressable onPress={() => router.push('/citiesList')}>
                            <Ionicons name="add" size={24} color="blue" />
                        </Pressable>
                    ),
                    headerLeft: () => (
                        <Pressable onPress={() => router.push('/settings')}>
                            <Ionicons name="cog" size={24} color="black" />
                        </Pressable>
                    ),
                }}
            />

            <GestureHandlerRootView style={{ flex: 1 }}>
                <ThemedView style={[isLandscape ? styles.landscapeContainer : styles.container]}>
                    {
                        isLandscape &&
                        (
                            <ThemedView style={styles.landscapeHeader}>
                                <ThemedText type='subtitle'>Weather Time</ThemedText>
                                <Button mode="elevated" onPress={() => router.push('/citiesList')}>
                                    <ThemedText>Add City</ThemedText>
                                </Button>
                                <Button mode="elevated" onPress={() => router.push('/settings')}>
                                    <ThemedText>Settings</ThemedText>
                                </Button>
                            </ThemedView>
                        )
                    }
                    <FlatList
                        data={cities}
                        renderItem={({ item }) => <WeatherItem {...item} onDelete={() => toggleItem(item)} />}
                        keyExtractor={(item, index) => item.name + index}
                        ItemSeparatorComponent={(_) => <Divider />}
                        ListEmptyComponent={() => (
                            <ThemedView style={styles.emptyContentContainer}>
                                <ThemedText type='subtitle'>Welcome to Weather Time!</ThemedText>
                                <ThemedText style={styles.emptyContentText}>Press <Ionicons name="add" size={20} color="blue" /> to add cities from around the world to view their date, time and weather.</ThemedText>
                                <ThemedText style={styles.emptyContentText}>Press <Ionicons name="cog" size={20} color="black" /> for settings. Settings enables the user to select unit of temperature, text size, sound effect and brigthness.</ThemedText>
                            </ThemedView>
                        )}
                    />

                    <ThemedView style={{ width: 32 }} />
                </ThemedView>
            </GestureHandlerRootView>
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    landscapeContainer: { flex: 1, flexDirection: 'row' },
    landscapeHeader: { flex: 1, flexBasis: '20%', alignItems: 'center', justifyContent: 'center', gap: 20 },
    emptyContentContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20, padding: 20 },
    emptyContentText: { textAlign: 'center' },
});
