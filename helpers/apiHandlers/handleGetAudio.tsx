import { Audio } from "expo-av";
import axios from "axios";
import { api } from "../../utils/constants";

export const handleGetAudio = async () => {
  try {
    // Set up the audio playback object
    const { sound } = await Audio.Sound.createAsync({
      uri: `${api}/api/getAudio`,
    });

    await sound.playAsync();

    return sound;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
