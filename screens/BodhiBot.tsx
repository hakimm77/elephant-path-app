import React, { useState, useRef, useEffect } from "react";
import {
  Flex,
  Text,
  ScrollView,
  Input,
  Button,
  VStack,
  Box,
  Spinner,
} from "native-base";
import { IConversation } from "../utils/types";
import { handleChat } from "../helpers/apiHandlers/handleChat";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import type { ScrollView as ScrollViewType } from "react-native";
import { handleGetChat } from "../helpers/apiHandlers/handleGetChat";
import { handleSaveChat } from "../helpers/apiHandlers/handleSaveChat";
import Icon from "react-native-vector-icons/Ionicons";

export const BodhiBot: React.FC<{ userEmail: string; route: any }> = ({
  userEmail,
  route,
}) => {
  const [conversation, setConversation] = useState<IConversation[]>([
    {
      role: "assistant",
      content: `Welcome to your customized interactive meditation journey! I'm here to help you make efficient and meaningful progress in your meditation practice. Let's get started by understanding your goals. What are you hoping to achieve with meditation?`,
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loadingReponse, setLoadingResponse] = useState(false);
  const [gotChat, setGotChat] = useState(false);
  const scrollViewRef = useRef<ScrollViewType>(null);
  const lesson = route.params?.lesson ?? "";
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardOffset(e.endCoordinates.height);
    });
    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOffset(0);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const handleSubmit = async (input?: string) => {
    if (input) {
      Keyboard.dismiss();
      setLoadingResponse(true);
      await setConversation((previousConversation) => [
        ...previousConversation,
        { role: "user", content: input },
        { role: "assistant", content: "0L1o2a3d4i5n6g7" },
      ]);
      scrollViewRef.current?.scrollToEnd({ animated: true });
      setUserInput("");

      await handleChat(
        [
          ...conversation,
          { role: "user", content: input },
          { role: "assistant", content: "0L1o2a3d4i5n6g7" },
        ],
        setConversation,
        setLoadingResponse
      ).then(() => {
        handleSaveChat(userEmail, conversation);
      });
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [conversation, Keyboard]);

  useEffect(() => {
    if (conversation.length < 2) {
      handleGetChat(userEmail, setConversation).then(async () => {
        setGotChat(true);
        await handleSaveChat(userEmail, conversation);
      });
    }
  }, []);

  useEffect(() => {
    if (gotChat && lesson) {
      handleSubmit(`Explain to me what is ${lesson}`);
    }
  }, [lesson]);

  useEffect(() => {
    if (conversation && conversation.length > 1) {
      handleSaveChat(userEmail, conversation);
    }
  }, [conversation]);

  return (
    <ImageBackground
      source={require("../assets/bodhibot-screen.png")}
      style={{ flex: 1, paddingTop: 20 }}
      imageStyle={{ opacity: 0.7 }}
    >
      <ScrollView p={4} ref={scrollViewRef}>
        <VStack justifyContent="center" alignItems="center" pb={20} mt={10}>
          {conversation.length === 0 && !conversation ? (
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.500"
              alignSelf="center"
            >
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
                bgColor={message.role === "assistant" ? "#fff" : "#096c7d"}
                borderWidth={1}
                borderColor="#000"
              >
                {message.content === "0L1o2a3d4i5n6g7" ? (
                  <Flex flexDir="row" alignItems="center">
                    <Spinner color="#444654" size={"sm"} />
                    <Text ml={2}>Thinking...</Text>
                  </Flex>
                ) : (
                  <Flex fontSize={15} w="100%">
                    <Text
                      style={{
                        color:
                          message.role === "assistant" ? "#444654" : "#fff",
                        fontFamily: "Quicksand",
                      }}
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

      <Flex
        position="absolute"
        bottom={Platform.OS === "ios" ? keyboardOffset : 0}
        flexDirection="row"
        alignItems="center"
        p={2}
      >
        <Input
          flex={1}
          placeholder="Type your message..."
          placeholderTextColor={"#1d1d1d"}
          value={userInput}
          onChangeText={(text: string) => setUserInput(text)}
          isDisabled={loadingReponse}
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingLeft: 10,
            borderRadius: 30,
            borderColor: "#096c7d",
            borderWidth: 1,
            color: "#1d1d1d",
            fontFamily: "Quicksand",
            elevation: 0, // remove shadow for Android
            shadowColor: "transparent",
          }}
        />
        <Button
          ml={2}
          onPress={() => {
            handleSubmit(userInput);
          }}
          isLoading={loadingReponse}
          style={{
            backgroundColor: "#096c7d",
            width: 45,
            height: 45,
            borderRadius: 10,
          }}
        >
          <Icon name="send" style={{ margin: 0 }} size={20} color="#fff" />
        </Button>
      </Flex>
    </ImageBackground>
  );
};
