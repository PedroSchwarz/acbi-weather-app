import { ThemedText } from "@/components/ThemedText";
import { useSystemBrightness } from "@/hooks/useSystemBrightness";
import Slider from "@react-native-community/slider";
import React from "react";

export default function BrightnessOption() {
    const { brightness, changeBrightness } = useSystemBrightness();

    return (
        <>
            <ThemedText type='defaultSemiBold'>Brightness: </ThemedText>
            <Slider
                minimumValue={0}
                maximumValue={1}
                step={0.01}
                value={brightness}
                onValueChange={changeBrightness}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#007AFF"
            />
        </>
    );
}