import { Button, Flex } from "native-base";
import React from "react";
import { Text } from "react-native";
import { WebView } from "react-native-webview";
import { storeData } from "../helpers/auth/storeData";
import * as Updates from "expo-updates";

export const OnBoardingScreen: React.FC<{
  setFetchedEmail: any;
  userEmail: any;
}> = ({ setFetchedEmail, userEmail }) => {
  const proceedToApp = async () => {
    setFetchedEmail(userEmail);
    await storeData("user", userEmail);
  };

  return (
    <Flex flex={1} p={5} backgroundColor={"#75c3db"}>
      <WebView
        style={{
          margin: 0,
          marginTop: 20,
          padding: 0,
          minHeight: 0,
          maxHeight: 200,
        }}
        containerStyle={{
          margin: 0,
          marginTop: 20,
          padding: 0,
          minHeight: 0,
          maxHeight: 200,
        }}
        source={{
          uri: "https://www.loom.com/embed/5d4435b68b8a498ca1ee9d09a6b58a6b?sid=f44955bd-db8b-40a9-95b4-218278a3556f",
        }}
        allowsFullscreenVideo={true}
      />

      <Text
        style={{
          marginTop: 10,
          marginBottom: 10,
          fontSize: 20,
          fontFamily: "Quicksand",
        }}
      >
        Welcome {userEmail.split("@")[0]},
      </Text>
      <Text style={{ fontSize: 18, fontFamily: "Quicksand" }}>
        We developed the Frid app to take you on a journey through the elephant
        path to enhance your focus and relief stress.
      </Text>

      <Button style={{ marginTop: 40 }} onPress={proceedToApp}>
        Proceed to the app
      </Button>
    </Flex>
  );
};
