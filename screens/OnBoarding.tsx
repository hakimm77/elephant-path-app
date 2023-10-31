import { Flex, Text } from "native-base";
import React from "react";

export const OnBoarding: React.FC<{ userEmail: string }> = ({ userEmail }) => {
  return (
    <Flex flex={1} pt={5} bgColor="#1d1d1d">
      <Text>OnBoarding heybye</Text>
    </Flex>
  );
};
