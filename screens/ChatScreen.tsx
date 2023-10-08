import React, { useState, useRef } from "react";
import {
  Flex,
  Text,
  ScrollView,
  Input,
  Button,
  VStack,
  Box,
} from "native-base";
import { IConversation } from "../utils/types";
import { handleChat } from "../helpers/apiHandlers/handleChat";
import { Keyboard } from "react-native";
import type { ScrollView as ScrollViewType } from "react-native";

export const ChatScreen: React.FC<{ userEmail: string }> = ({ userEmail }) => {
  const [conversation, setConversation] = useState<IConversation[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loadingReponse, setLoadingResponse] = useState(false);
  const scrollViewRef = useRef<ScrollViewType>(null);

  const handleSubmit = async () => {
    if (userInput) {
      Keyboard.dismiss();
      setLoadingResponse(true);
      await setConversation((previousConversation) => [
        ...previousConversation,
        { role: "user", content: userInput },
        { role: "assistant", content: "0L1o2a3d4i5n6g7" },
      ]);
      scrollViewRef.current?.scrollToEnd({ animated: true });
      setUserInput("");

      await handleChat(
        [
          ...conversation,
          { role: "user", content: userInput },
          { role: "assistant", content: "0L1o2a3d4i5n6g7" },
        ],
        setConversation,
        setLoadingResponse
      );

      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  return (
    <Flex flex={1} bg="white">
      <ScrollView
        flex={1}
        p={4}
        ref={scrollViewRef} // Attach the ref to the ScrollView
      >
        <VStack flex={1} justifyContent="center" alignItems="center" pb={5}>
          {conversation.length === 0 ? (
            <Text fontSize="xl" fontWeight="bold" color="gray.500">
              BodhiBot
            </Text>
          ) : (
            conversation &&
            conversation.map((message, index) => (
              <Flex
                key={index}
                flexDir="column"
                w="fit-content"
                maxW={"70%"}
                p={2}
                mb={3}
                alignSelf={
                  message.role === "assistant" ? "flex-start" : "flex-end"
                }
                borderRadius={10}
                bgColor={message.role === "assistant" ? "gray.200" : "#444654"}
              >
                {message.content === "0L1o2a3d4i5n6g7" ? (
                  <Flex flexDir="row" alignItems="center">
                    <Button isLoading={true} />
                    <Text ml={2}>Thinking...</Text>
                  </Flex>
                ) : (
                  <Flex fontSize={15} w="100%">
                    <Text
                      color={
                        message.role === "assistant" ? "#444654" : "gray.200"
                      }
                    >
                      {message.content}
                    </Text>
                  </Flex>
                )}
              </Flex>
            ))
          )}
        </VStack>
      </ScrollView>

      <Flex flexDirection="row" alignItems="center" p={2} bg="gray.50">
        <Input
          flex={1}
          placeholder="Type your message..."
          variant="outline"
          bg="white"
          borderRadius="30px"
          value={userInput}
          onChangeText={(text: string) => setUserInput(text)}
        />
        <Button ml={2} onPress={handleSubmit} isLoading={loadingReponse}>
          Send
        </Button>
        <Button
          ml={2}
          onPress={() => {
            setConversation([]);
          }}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  );
};
