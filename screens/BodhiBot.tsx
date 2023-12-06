import React, { useState, useRef, useEffect } from "react";
import {
  Flex,
  Text,
  ScrollView,
  Input,
  Button,
  VStack,
  Spinner,
} from "native-base";
import { IConversation } from "../utils/types";
import { handleChat } from "../helpers/apiHandlers/handleChat";
import { ImageBackground, Keyboard, Platform } from "react-native";
import type { ScrollView as ScrollViewType } from "react-native";
import { handleGetChat } from "../helpers/apiHandlers/handleGetChat";
import { handleSaveChat } from "../helpers/apiHandlers/handleSaveChat";
import Icon from "react-native-vector-icons/Ionicons";
import { MessageComponent } from "../components/conversation/MessageComponent";
import uuid from 'react-native-uuid';


export const BodhiBot: React.FC<{ userEmail: string; conversation:IConversation[]; setConversation:React.Dispatch<React.SetStateAction<IConversation[]>>; route: any }> = ({
  userEmail,
  route,
  conversation,
  setConversation,
}) => {
  const [userInput, setUserInput] = useState("");
  const [previousUserInput, setPreviousUserInput] = useState("");
  const [loadingReponse, setLoadingResponse] = useState(false);
  const [errorResponse, setErrorResponse] = useState(false);
  const [gotChat, setGotChat] = useState(false);
  const scrollViewRef = useRef<ScrollViewType>(null);
  const lesson = route.params?.lesson ?? "";
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [text, setText] = useState("");

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
      console.log("err: ", errorResponse);
      if (errorResponse) {
        conversation.pop();
        conversation.pop();
      }

      await setConversation((previousConversation) => [
        ...previousConversation,
        { role: "user", content: input, id: uuid.v4() },
        { role: "assistant", content: "Loading", id: uuid.v4() },
      ]);
      scrollViewRef.current?.scrollToEnd({ animated: true });
      setUserInput("");
      console.log("convo before submitt : ", conversation);
      await handleChat(
        conversation,
        setConversation,
        setLoadingResponse,
        setErrorResponse,
      );
    }
  };

  const handleRegenerate = async () => {
    // Remove error response
    conversation.pop();
    await setConversation((previousConversation) => [
      ...previousConversation,
      { role: "assistant", content: "Loading", id: uuid.v4() },
    ]);

    await handleChat(
      conversation,
      setConversation,
      setLoadingResponse,
      setErrorResponse,
    );
  }

  const saveChat = async (userEmail: string, conversation: IConversation[]) => {
    console.log("saving chat: ", conversation)
    handleSaveChat(userEmail, conversation);
  }

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, []);


  useEffect(() => {
    if (conversation.length < 2) {
      handleGetChat(userEmail, setConversation).then(async () => {
        setGotChat(true);
      });
    }
  }, []);

  useEffect(() => {
    if (gotChat && lesson) {
      handleSubmit(`Explain to me what is ${lesson}`);
    }
  }, [lesson]);

  useEffect(() => {
    if (conversation && conversation.length > 0) {
      saveChat(userEmail, conversation);
    }
  }, [conversation]);

  useEffect(() => {
    setPreviousUserInput(userInput);
  }, [userInput]);

  // Add this useEffect for handling scroll when userInput changes from empty to non-empty
  useEffect(() => {
    if (previousUserInput === "" && userInput !== "") {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [userInput, previousUserInput]); // Depend on both userInput and previousUserInput

  
   useEffect(() => {
    if (errorResponse) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [errorResponse]);

  return (
    <ImageBackground
      source={require("../assets/bodhibot-screen.png")}
      style={{ flex: 1, paddingTop: 20 }}
      imageStyle={{ opacity: 0.7 }}
    >
      <ScrollView p={4} ref={scrollViewRef}
      onContentSizeChange={()=> scrollViewRef.current?.scrollToEnd()}>
        <VStack justifyContent="center" alignItems="center" pb={20} mt={10}>
          <Flex
            flexDir="column"
            w="fit-content"
            maxW={"70%"}
            p={2}
            mb={3}
            alignSelf={"flex-start"}
            borderRadius={10}
            bgColor={"#fff"}
            borderWidth={1}
            borderColor="#000"
          >
            <Flex fontSize={15} w="100%">
              <Text
                style={{
                  color: "#444654",
                  fontFamily: "Quicksand",
                }}
              >
                Welcome to your customized interactive meditation journey! I'm
                here to help you make efficient and meaningful progress in your
                meditation practice. Let's get started by understanding your
                goals. The guided meditations will be tailored to your answers
                so please take your time to answer thourougly. What are you
                hoping to achieve with meditation?
              </Text>
            </Flex>
          </Flex>
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
            conversation.map((message) => (
              <MessageComponent message={message} />
            )
            ))}
        </VStack>
      </ScrollView>

     
      <Flex
        position="absolute"
        bottom={Platform.OS === "ios" ? keyboardOffset : 0}
        flexDirection="row"
        alignItems="flex-end"
        p={2}
        h={"30%"}
        w={"100%"}
        flex={1}
      >
        <Input
          multiline
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
      
        {errorResponse && (
        <Button 
        ml={2}
        style={{
          backgroundColor: "#096c7d",
          width: 45,
          height: 45,
          borderRadius: 10,
        }}
        onPress={handleRegenerate} title="Click me to regenerate">
            <Icon name="sync" style={{ margin: 0 }} size={20} color="#fff" />
        </Button>
      )}
      </Flex>
    </ImageBackground>
  );
};
