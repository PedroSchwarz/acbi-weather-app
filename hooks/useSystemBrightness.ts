import { useEffect, useState } from "react";
import * as Brightness from 'expo-brightness';

export const useSystemBrightness = () => {
    const [brightness, setBrightness] = useState(1);

    useEffect(() => {
        const fetchBrightness = async () => {
            const level = await Brightness.getBrightnessAsync();
            setBrightness(level);
        };

        fetchBrightness();
    }, []);

    const changeBrightness = async (value: number) => {
        setBrightness(value);
        await Brightness.setBrightnessAsync(value);
    };

    return { brightness, changeBrightness };
}