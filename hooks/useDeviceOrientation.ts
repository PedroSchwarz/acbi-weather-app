import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

enum Orientation {
    Landscape,
    Portrait,
}

export function useDeviceOrientation() {
    const [orientation, setOrientation] = useState<Orientation>(
        Dimensions.get('window').width > Dimensions.get('window').height ? Orientation.Landscape : Orientation.Portrait
    );

    useEffect(() => {
        const onChange = (window: ScaledSize) => {
            setOrientation(window.width > window.height ? Orientation.Landscape : Orientation.Portrait);
        };

        const subscription = Dimensions.addEventListener('change', ({ window }) => onChange(window));
        return () => subscription.remove();
    }, []);

    return orientation;
}

export { Orientation };