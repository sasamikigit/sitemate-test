import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadSearchHistory = async (): Promise<string[]> => {
  try {
    const history = await AsyncStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Failed to load search history:', error);
    return [];
  }
};

export const saveSearchHistory = async (history: string[]) => {
  try {
    await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save search history:', error);
  }
};
