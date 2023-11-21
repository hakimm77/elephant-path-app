import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async (key: string, setValue: any) => {
  try {
    const value: any = await AsyncStorage.getItem(key);
    setValue(key === "stage" ? Number(value) : value);
  } catch (e) {
    return null;
  }
};
