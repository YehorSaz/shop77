import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeService = {
  saveData: async (key: string, value: string[]): Promise<void> =>
    await AsyncStorage.setItem(key, JSON.stringify(value)),
  getData: async (key: string): Promise<string> =>
    await AsyncStorage.getItem(key),
  delAll: async () => await AsyncStorage.clear(),
};
