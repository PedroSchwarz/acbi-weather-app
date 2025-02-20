import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { City } from '@/app/citiesList';

const STORAGE_KEY = 'checkedItems';

export const useLocalStorageCheckbox = () => {
    const [checkedItems, setCheckedItems] = useState<Record<string, City>>({});

    useEffect(() => {
        const loadCheckedItems = async () => {
            try {
                const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedItems) {
                    setCheckedItems(JSON.parse(storedItems));
                }
            } catch (error) {
                console.error('Error loading checked items:', error);
            }
        };

        loadCheckedItems();
    }, []);

    const toggleItem = async (item: City) => {
        try {
            setCheckedItems((prevCheckedItems) => {
                const newCheckedItems = { ...prevCheckedItems };

                if (newCheckedItems[item.name]) {
                    delete newCheckedItems[item.name];
                } else {
                    newCheckedItems[item.name] = item;
                }

                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newCheckedItems)).catch((error) =>
                    console.error('Error saving checked item:', error)
                );

                return newCheckedItems;
            });
        } catch (error) {
            console.error('Error saving checked item:', error);
        }
    };

    return { checkedItems, toggleItem };
};
