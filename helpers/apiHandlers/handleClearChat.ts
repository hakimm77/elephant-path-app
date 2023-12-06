import { Alert } from "react-native";
import axios from "axios";
import { api } from "../../utils/constants";
import { IConversation } from "../../utils/types";
import { handleGetChat } from "./handleGetChat";

export const handleClearChat = async (email: string, setConversation : React.Dispatch<React.SetStateAction<IConversation[]>>) => {
  if (email) {
    const clearChat = async (): Promise<void> => {
      await axios
        .post(`${api}/api/clearChat`, { email })
        .catch((error) => {
          console.log("Error clearing chat:", error);
          Alert.alert("Error", "Something went wrong. Please try again.");
        });
    };

    
      Alert.alert(
        "Confirm Clear Chat",
        "Are you sure you want to clear your chat history?",
        [
          {
            text: "Cancel",
            onPress: () => {
              console.log("Clear chat cancelled");

            },
            style: "cancel",
          },
          {
            text: "Yes, delete it",
            onPress: () => {
              clearChat().then(() => {
                handleGetChat(email, setConversation)
              });
            },
          },
        ],
        { cancelable: false }
      );
  }

  return false;
};
