import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    await Updates.reloadAsync();
  } catch (e) {
    return null;
  }
};
