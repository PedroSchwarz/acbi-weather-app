import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { Pressable, StyleSheet } from 'react-native';
import { Switch } from "react-native-paper";
import { City } from "../citiesList";
import { useCities } from "@/contexts/CitiesContext";
import { useActionSound } from "@/contexts/SoundContext";
import { useSettings } from "@/contexts/SettingsContext";
import { SoundEffect } from "@/hooks/useLocalStorageSettings";

type CityItemProps = City

const CityItem: React.FC<CityItemProps> = ({ name: title, country }) => {
    const { checkedItems, toggleItem } = useCities();
    const { settings: { soundEffect } } = useSettings();
    const item = { name: title, country };
    const isChecked = checkedItems[title] ? true : false;
    const actionSound = useActionSound();

    const handleItemChange = (item: City) => {
        toggleItem(item);
        if (soundEffect === SoundEffect.On) {
            actionSound.playSound();
        }
    }

    return (
        <Pressable onPress={() => toggleItem(item)}>
            <ThemedView style={styles.cityItem} >
                <ThemedText>{title}</ThemedText>
                <Switch value={isChecked} onValueChange={() => handleItemChange(item)} />
            </ThemedView>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cityItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    }
});

export default CityItem;