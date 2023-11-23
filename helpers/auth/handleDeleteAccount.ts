import { Alert } from "react-native";
import axios from "axios";
import { removeData } from "./removeData";
import { api } from "../../utils/constants";

export const handleDeleteAccount = async (email: string) => {
  if (email) {
    const deleteAccount = async () => {
      await axios
        .post(`${api}/api/deleteAccount`, { email })
        .then(async (res) => {
          await removeData("user");
          await removeData("stage");
        })
        .catch((error) => {
          Alert.alert("Error", "Something went wrong. Please try again.");
        });
    };

    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel",
        },
        {
          text: "Yes, delete it",
          onPress: () => deleteAccount(),
        },
      ],
      { cancelable: false }
    );
  }
};
