import React, { useState } from "react";
import {
  Flex,
  Text,
  ScrollView,
  Input,
  Button,
  VStack,
  Box,
} from "native-base";

interface Message {
  type: "user" | "bot";
  content: string;
}

export const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const handleSend = () => {
    if (currentMessage.trim()) {
      setMessages([...messages, { type: "user", content: currentMessage }]);

      // Mock AI bot response
      setTimeout(() => {
        setMessages([
          ...messages,
          { type: "user", content: currentMessage },
          { type: "bot", content: "Hello from the AI bot!" },
        ]);
      }, 1000);

      setCurrentMessage("");
    }
  };

  return (
    <Flex flex={1} bg="white">
      <ScrollView flex={1} p={4}>
        <VStack space={4} alignItems="center" flex={1}>
          {messages.length === 0 ? (
            <Text fontSize="xl" fontWeight="bold" color="gray.500">
              BodhiBot
            </Text>
          ) : (
            messages.map((message, index) => (
              <Box
                key={index}
                alignSelf={message.type === "user" ? "flex-end" : "flex-start"}
                bg={message.type === "user" ? "blue.200" : "gray.200"}
                rounded="lg"
                p={2}
                maxWidth="70%"
              >
                <Text>{message.content}</Text>
              </Box>
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
          value={currentMessage}
          onChangeText={(text: string) => setCurrentMessage(text)}
        />
        <Button ml={2} onPress={handleSend}>
          Send
        </Button>
        <Button
          ml={2}
          onPress={() => {
            setMessages([]);
          }}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  );
};
