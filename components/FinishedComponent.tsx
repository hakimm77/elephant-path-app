import { Audio } from "expo-av";
import { Button, Flex } from "native-base";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const FinishedComponent: React.FC<{
  redirectToBot: any;
  audioLength: number;
  setPageStatus: any;
}> = ({ redirectToBot, audioLength, setPageStatus }) => {
  const [sound, setSound] = useState<any>(null);

  let loadSound = async () => {
    const { sound: newSound } = await Audio.Sound.createAsync(
      {
        uri: "https://firebasestorage.googleapis.com/v0/b/weather112.appspot.com/o/singing-bowl_23042017-01-raw-71015.mp3?alt=media&token=ca09e1cf-11ad-4422-a41b-600c606b3f1c",
      },
      { shouldPlay: true }
    );

    setSound(newSound);
  };

  useEffect(() => {
    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return (
    <Flex
      position="absolute"
      w="95%"
      alignSelf="center"
      bottom={5}
      borderRadius={10}
      borderWidth={2}
      borderColor={"#000"}
      p={5}
      justifyContent="center"
      alignItems="center"
      backgroundColor={`rgba(255, 255, 255, 0.8)`}
    >
      <Text
        style={{
          fontSize: 25,
          fontFamily: "QuicksandBold",
          color: "#1d1d1d",
          alignSelf: "center",
          marginBottom: 10,
        }}
      >
        Congrats!
      </Text>
      <View
        style={{
          width: "80%",
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#000",
            fontFamily: "Quicksand",
          }}
        >
          You just finished a {audioLength} minute meditation, you can now speak
          to BodhiBot about your current meditation sit and how you feel.
        </Text>

        <Flex flexDir="row" alignItems="center" justifyContent="space-around">
          <TouchableOpacity
            onPress={async () => {
              setPageStatus("select"); // Set the page status to select
            }}
          >
            <Icon
              name="arrow-back"
              size={40}
              color="#1d1d1d"
              style={{ marginBottom: -10 }}
            />
          </TouchableOpacity>
          <Button onPress={redirectToBot} mt={4}>
            Go to BodhiBot
          </Button>
        </Flex>
      </View>
    </Flex>
  );
};
