import React, { useEffect, useState } from "react";
import * as Application from 'expo-application';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Platform } from "react-native";

export default function AppInformationBlock() {
    const [currentYear, setCurrentYear] = useState<string>();
    const [version, setVersion] = useState<string>();
    const [lastUpdate, setLastUpdate] = useState<string>();
    const [installationDate, setInstallationDate] = useState<string>();

    useEffect(() => {
        const loadApplicationInformation = async () => {
            const currentDate = new Date();
            setCurrentYear(currentDate.getFullYear().toString());
            const version = Application.nativeBuildVersion;
            setVersion(version ?? '1.0.0');
            try {
                const installationDate = await Application.getInstallationTimeAsync();
                setInstallationDate((new Date(installationDate) ?? currentDate).toLocaleDateString());

                if (Platform.OS === 'android') {
                    const lastUpdate = await Application.getLastUpdateTimeAsync();
                    setLastUpdate((new Date(lastUpdate) ?? currentDate).toLocaleDateString());
                } else {
                    setLastUpdate('Not available on iOS');
                }
            } catch (error) {
                console.error(error);
            }
        }

        loadApplicationInformation();
    }, []);

    return (
        <ThemedView style={{ marginTop: 40, gap: 20 }}>
            <ThemedText type="subtitle">Weather Time</ThemedText>
            <ThemedText>(c) {currentYear} ABC Solutions Pty Ltd</ThemedText>
            <ThemedText>Version: {version}</ThemedText>
            <ThemedText>Last Update: {lastUpdate}</ThemedText>
            <ThemedText>Build Date: {installationDate}</ThemedText>
            <ThemedText>Developer: Pedro, João & Heric</ThemedText>
            <ThemedText>Student Number: ACBI20240269</ThemedText>
        </ThemedView>
    );
}