import React, { useEffect } from "react";
import { Flex, Text } from "native-base";
import { Linking } from "react-native";

export const RetreatsScreen: React.FC<{ userEmail?: string }> = ({
  userEmail,
}) => {
  useEffect(() => {
    const url = "https://fridmeditation.com/foundationsretreat/";

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Can't open this URL: " + url);
      }
    });
  }, []);

  return (
    <Flex flex={1} bg="white" alignItems="center" justifyContent="center">
      <Text>Redirecting to website...</Text>
    </Flex>
  );
};
