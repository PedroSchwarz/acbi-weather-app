import { ThemedView } from '@/components/ThemedView';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { City } from './citiesList';
import WeatherItem from './components/WeatherItem';
import { Button, Divider } from 'react-native-paper';
import { useCities } from '@/contexts/CitiesContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Orientation, useDeviceOrientation } from '@/hooks/useDeviceOrientation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Href, Stack, useRouter } from 'expo-router';
import AppToolbar from './components/AppToolbar';

export default function WeatherListScreen() {
    const { checkedItems, toggleItem } = useCities();
    const orientation = useDeviceOrientation();
    const [cities, setCities] = useState<City[]>([]);
    const background = useThemeColor({}, 'background');
    const accent = useThemeColor({}, 'accent');
    const router = useRouter();

    useEffect(() => { setCities(Object.values(checkedItems)) }, [checkedItems]);

    const renderWeatherItem = useCallback(({ item }: { item: City }) => (
        <WeatherItem {...item} onDelete={() => toggleItem(item)} />
    ), [toggleItem]);

    const isLandscape = useMemo(() => orientation === Orientation.Landscape, [orientation]);

    const handleNavigation = useCallback((route: Href) => {
        setTimeout(() => {
            router.push(route);
        }, 100);
    }, [router]);

    const SettingsButton = useMemo(() => (
        <TouchableOpacity style={{ marginVertical: 0 }} onPress={() => handleNavigation('/settings')}>
            <Ionicons name="cog" size={30} color={accent} />
        </TouchableOpacity>
    ), [router, accent]);

    const AddCityButton = useMemo(() => (
        <TouchableOpacity style={{ marginVertical: 0 }} onPress={() => handleNavigation('/citiesList')}>
            <Ionicons name="add" size={30} color={accent} />
        </TouchableOpacity>
    ), [router, accent]);

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: !isLandscape,
                    header: () => (
                        <AppToolbar title='Weather' leading={SettingsButton} trailing={AddCityButton} />
                    ),
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: background },
                }}
            />

            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
                    <GestureHandlerRootView>
                        <ThemedView style={[isLandscape ? styles.landscapeContainer : styles.container]}>
                            {
                                isLandscape &&
                                (
                                    <ThemedView style={styles.landscapeHeader}>
                                        <ThemedText type='subtitle'>Weather Time</ThemedText>
                                        <Button contentStyle={{ backgroundColor: background }} mode="outlined" onPress={() => router.push('/citiesList')}>
                                            <ThemedText>Add City</ThemedText>
                                        </Button>
                                        <Button contentStyle={{ backgroundColor: background }} mode="outlined" onPress={() => router.push('/settings')}>
                                            <ThemedText>Settings</ThemedText>
                                        </Button>
                                    </ThemedView>
                                )
                            }
                            <FlatList
                                style={{ flex: 1 }}
                                data={cities}
                                renderItem={renderWeatherItem}
                                keyExtractor={(item, index) => item.name + index}
                                ItemSeparatorComponent={Divider}
                                ListEmptyComponent={() => (
                                    <ThemedView style={styles.emptyContentContainer}>
                                        <ThemedText type='subtitle'>Welcome to Weather Time!</ThemedText>
                                        <ThemedText style={styles.emptyContentText}>Press <Ionicons name="add" size={20} color={accent} /> to add cities from around the world to view their date, time and weather.</ThemedText>
                                        <ThemedText style={styles.emptyContentText}>Press <Ionicons name="cog" size={20} color={accent} /> for settings. Settings enables the user to select unit of temperature, text size, sound effect and brigthness.</ThemedText>
                                    </ThemedView>
                                )}
                            />

                            <ThemedView style={{ width: 32 }} />
                        </ThemedView>
                    </GestureHandlerRootView>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    landscapeContainer: { flex: 1, flexDirection: 'row' },
    landscapeHeader: { flexBasis: '20%', alignItems: 'center', justifyContent: 'center', gap: 20 },
    emptyContentContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20, padding: 20 },
    emptyContentText: { textAlign: 'center' },
});
