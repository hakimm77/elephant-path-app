import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async (key: string, setUserEmail: any) => {
  try {
    const value: any = await AsyncStorage.getItem(key);
    console.log(value);
    setUserEmail(value);
  } catch (e) {
    return null;
  }
};
