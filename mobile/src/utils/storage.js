import { MMKV } from 'react-native-mmkv';
import * as SecureStore from 'expo-secure-store';

export const storage = new MMKV();

export const secureStorage = {
    setItem: async (key, value) => {
        await SecureStore.setItemAsync(key, value);
    },
    getItem: async (key) => {
        return await SecureStore.getItemAsync(key);
    },
    removeItem: async (key) => {
        await SecureStore.deleteItemAsync(key);
    },
};
