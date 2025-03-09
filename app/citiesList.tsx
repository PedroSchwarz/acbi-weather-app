import { ThemedView } from '@/components/ThemedView';
import React, { useCallback, useEffect, useState } from 'react';
import countriesJson from '../assets/data/countries/countries.json';
import { SafeAreaView, SectionList, StyleSheet, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CityItem from './components/CityItem';
import { Stack, useNavigation } from 'expo-router';
import { Button, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Country = {
    country: string;
    cities: City[];
}

type City = {
    name: string;
    country: string;
}

const CountryHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ThemedView style={styles.countryHeader}>
        <ThemedText type='subtitle'>{children}</ThemedText>
    </ThemedView>
);

export default function CitiesListScreen() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [search, setSearch] = useState<string | null>(null);
    const [scrollOffset, setScrollOffset] = useState<number>(0);
    const height = useSharedValue(70);
    const background = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const accent = useThemeColor({}, 'accent');
    const navigation = useNavigation();

    useEffect(() => { setCountries(countriesJson); }, []);

    useEffect(() => {
        if (search) {
            setCountries(countriesJson.filter(country => country.country.toLowerCase().includes(search.toLowerCase()) || country.cities.some(city => city.name.toLowerCase().includes(search.toLowerCase()))));
        } else if (!search || search?.length === 0) {
            setCountries(countriesJson);
        }
    }, [search]);

    const handleScroll = useCallback((event: any) => {
        const newOffset = event.nativeEvent.contentOffset.y

        if (newOffset > 20 && newOffset > scrollOffset) {
            height.value = withTiming(0);
            setScrollOffset(newOffset);
        } else if (newOffset <= scrollOffset - 10) {
            height.value = withTiming(70);
            setScrollOffset(newOffset);
        }
    }, [scrollOffset]);

    const sections = countries.map(country => ({
        title: country.country,
        data: country.cities
    }));

    const animatedStyle = useAnimatedStyle(() => ({ height: withTiming(height.value) }));

    return (
        <>
            <Stack.Screen options={{
                title: 'Cities',
                headerRight: (_) => {
                    return <Button onPress={() => navigation.goBack()}><ThemedText style={{ color: accent }}>Cancel</ThemedText></Button>
                },
                headerTitleAlign: 'center',
                headerBackButtonDisplayMode: 'minimal',
                headerStyle: { backgroundColor: background },
                headerShadowVisible: false,
            }} />

            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
                    <Animated.View style={animatedStyle}>
                        <ThemedView style={styles.searchContainer}>
                            <TextInput style={[styles.searchField, { color: textColor, borderBottomColor: textColor }]} onChangeText={setSearch} />
                            <Ionicons name="search" size={20} color={accent} />
                        </ThemedView>
                    </Animated.View>

                    <SectionList
                        onScroll={handleScroll}
                        sections={sections}
                        keyExtractor={(item, index) => item.name + index}
                        renderItem={({ item }) => <CityItem {...item} />}
                        renderSectionHeader={({ section: { title } }) => (<CountryHeader key={title}>{title}</CountryHeader>)}
                        ItemSeparatorComponent={(_) => <Divider />}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    searchContainer: {
        marginVertical: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    searchField: {
        flex: 1,
        borderBottomWidth: 1,
        paddingVertical: 8,
        fontSize: 16,
    },
    countryHeader: {
        flex: 1,
        padding: 20,
    },
});

export { City };