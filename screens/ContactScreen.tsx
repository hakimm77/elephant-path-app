import React from "react";
import { Flex, Text } from "native-base";
import { WebView } from "react-native-webview";

export const ContactScreen: React.FC<{ userEmail: string }> = ({
  userEmail,
}) => {
  return (
    <Flex flex={1} pt={5} bgColor={"#1d1d1d"}>
      <WebView
        source={{ uri: "https://form.typeform.com/to/Q8cget3c" }}
        style={{ flex: 1 }}
      />
    </Flex>
  );
};
