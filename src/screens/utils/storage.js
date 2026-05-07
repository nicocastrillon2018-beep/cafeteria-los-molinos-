import AsyncStorage from '@react-native-async-storage/async-storage';

export const guardar = async (key, data) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

export const cargar = async (key) => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};