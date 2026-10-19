import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const getStoredItem = async (key: string): Promise<string | null> => {
  try {
    return isWeb ? globalThis.localStorage.getItem(key) : await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
};

export const setStoredItem = async (key: string, value: string): Promise<void> => {
  try {
    if (isWeb) globalThis.localStorage.setItem(key, value);
    else await SecureStore.setItemAsync(key, value);
  } catch {
    // Storage is best-effort: the session just won't survive a restart.
  }
};

export const removeStoredItem = async (key: string): Promise<void> => {
  try {
    if (isWeb) globalThis.localStorage.removeItem(key);
    else await SecureStore.deleteItemAsync(key);
  } catch {
    // Nothing to clean up if storage is unavailable.
  }
};
