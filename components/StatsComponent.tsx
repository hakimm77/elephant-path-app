import { Flex, Text } from "native-base";
import React from "react";

export const StatsComponent: React.FC<{
  stage: number | null;
}> = ({ stage }) => {
  return (
    <Flex
      flexDir="row"
      borderWidth={1}
      borderColor="#fff"
      bgColor="gray.500"
      px={3}
      style={{ borderRadius: 20, padding: 7 }}
      justifyContent="center"
      alignItems="center"
      mx={3}
    >
      <Text color="#fff">Stage: {String(stage)}</Text>
    </Flex>
  );
};
