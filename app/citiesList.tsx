import { ThemedView } from '@/components/ThemedView';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import countriesJson from '../assets/data/countries/countries.json';
import { SafeAreaView, SectionList, StyleSheet, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CityItem from './components/CityItem';
import { Stack, useNavigation } from 'expo-router';
import { Button, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

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
    const [searchVisible, setSearchVisible] = useState<boolean>(true);
    const navigation = useNavigation();

    useEffect(() => {
        setCountries(countriesJson);
    }, []);

    useEffect(() => {
        if (search) {
            setCountries(countriesJson.filter(country => country.country.toLowerCase().includes(search.toLowerCase()) || country.cities.some(city => city.name.toLowerCase().includes(search.toLowerCase()))));
        } else if (!search || search?.length === 0) {
            setCountries(countriesJson);
        }
    }, [search]);

    const handleScroll = useCallback((event: any) => {
        if (event.nativeEvent.contentOffset.y > 20 && searchVisible) {
            setSearchVisible(false);
        } else if (event.nativeEvent.contentOffset.y <= 20 && !searchVisible) {
            setSearchVisible(true);
        }
    }, [searchVisible]);

    const sections = countries.map(country => ({
        title: country.country,
        data: country.cities
    }));

    return (
        <>
            <Stack.Screen options={{
                title: 'Cities', headerRight: (_) => {
                    return <Button onPress={() => navigation.goBack()}><ThemedText style={{ color: "blue" }}>Cancel</ThemedText></Button>
                }
            }} />
            <SafeAreaProvider>
                <SafeAreaView style={styles.safeArea}>
                    {searchVisible && (
                        <ThemedView style={styles.searchContainer}>
                            <TextInput style={styles.searchField} onChangeText={setSearch} />
                            <Ionicons name="search" size={20} color="blue" />
                        </ThemedView>
                    )}
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
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchContainer: {
        marginVertical: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    searchField: {
        flex: 1,
        borderBottomColor: 'black',
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