import { ThemedText } from "@/components/ThemedText";
import { useSystemBrightness } from "@/hooks/useSystemBrightness";
import { useThemeColor } from "@/hooks/useThemeColor";
import Slider from "@react-native-community/slider";
import React from "react";

export default function BrightnessOption() {
    const { brightness, changeBrightness } = useSystemBrightness();
    const accent = useThemeColor({}, 'accent');

    return (
        <>
            <ThemedText type='defaultSemiBold'>Brightness: </ThemedText>
            <Slider
                minimumValue={0}
                maximumValue={1}
                step={0.01}
                value={brightness}
                onValueChange={changeBrightness}
                minimumTrackTintColor={accent}
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor={accent}
            />
        </>
    );
}