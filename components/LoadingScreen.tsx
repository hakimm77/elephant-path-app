import { Button, Flex, Spinner, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { handleGetAudio } from "../helpers/apiHandlers/handleGetAudio";

export const LoadingScreen: React.FC<{
  length: number | null;
  setPageStatus: React.Dispatch<
    React.SetStateAction<"browse" | "loading" | "audio">
  >;
}> = ({ length, setPageStatus }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPageStatus("audio");
  }, []);

  return (
    <Flex
      flex={1}
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      {isLoading ? (
        <>
          <Spinner size="xl" color="#fe776e" mb={3} />
          <Text fontSize={18}>Generating Guided Meditation...</Text>
        </>
      ) : (
        <Button mt={5} onPress={() => {}}>
          Cancel
        </Button>
      )}
    </Flex>
  );
};
