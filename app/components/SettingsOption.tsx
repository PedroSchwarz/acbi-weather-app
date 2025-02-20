import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';

type SettingsOptionProps = {
    title: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
};

export default function SettingsOption({ title, value, options, onChange }: SettingsOptionProps) {
    return (
        <ThemedView style={{ marginVertical: 16 }}>
            <ThemedText type='defaultSemiBold'>{title}</ThemedText>
            <ThemedView style={styles.row}>
                {options.map((option) => (
                    <ThemedView style={styles.row} key={option}>
                        <ThemedText>{option}</ThemedText>
                        <RadioButton.Android
                            color='#007AFF'
                            value={option}
                            status={value === option ? 'checked' : 'unchecked'}
                            onPress={() => {
                                onChange(option);
                            }}
                        />
                    </ThemedView>
                ))}
            </ThemedView>
            <Divider />
        </ThemedView>
    );
}

const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8 } });
