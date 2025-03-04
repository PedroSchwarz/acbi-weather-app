import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PropsWithChildren } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AppToolBarProps = PropsWithChildren & {
    title: string;
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
}

export default function AppToolbar({ title, leading, trailing }: AppToolBarProps) {
    const { top } = useSafeAreaInsets();

    return (
        <ThemedView style={{ paddingTop: top, paddingBottom: 16, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {leading && leading}
            {!leading && <ThemedView />}
            <ThemedText type="defaultSemiBold">
                {title}
            </ThemedText>
            {trailing && trailing}
            {!trailing && <ThemedView />}
        </ThemedView>
    );
}