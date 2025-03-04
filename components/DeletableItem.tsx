import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { Gesture, GestureDetector, RectButton } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type DeletableItemProps = React.PropsWithChildren & { onDelete: () => void };

const SCREEN_WIDTH = Dimensions.get('window').width;

const DeletableItem: React.FC<DeletableItemProps> = ({ children, onDelete }) => {
    const translateX = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .activateAfterLongPress(150)
        .onUpdate((event) => {
            translateX.value = event.translationX < 0 ? event.translationX : 0;
        })
        .onEnd(() => {
            if (translateX.value < -100) {
                translateX.value = withTiming(-SCREEN_WIDTH * 0.2);
            } else {
                translateX.value = withTiming(0);
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(translateX.value) }],
    }));

    const showAlert = () => Alert.alert(
        'Delete Item',
        'Are you sure you want to delete this item?',
        [
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {
                    translateX.value = withTiming(0);
                }
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    onDelete();
                }
            },
        ],
    );

    return (
        <GestureDetector gesture={panGesture}>
            <ThemedView>
                <RectButton style={[styles.hiddenButtons, styles.deleteButton]} onPress={showAlert}>
                    <ThemedText style={styles.deleteText}>Delete</ThemedText>
                </RectButton>

                <Animated.View style={animatedStyle}>
                    {children}
                </Animated.View>
            </ThemedView>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    hiddenButtons: {
        position: 'absolute',
        right: 0,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '50%',
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default DeletableItem;
