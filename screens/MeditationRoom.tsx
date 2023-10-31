import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import { Flex, Button } from "native-base";
import Slider from "@react-native-community/slider";
import AudioPlayer from "../components/AudioPlayer";
import { handleStageIdentification } from "../helpers/handleStageIdentification";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { Audio } from "expo-av";

export const MeditationRoom: React.FC<{ navigation: any; userEmail: any }> = ({
  navigation,
  userEmail,
}) => {
  const [pageStatus, setPageStatus] = useState<"select" | "audio" | "finished">(
    "select"
  );
  const [audioLength, setAudioLength] = useState(5); // Default length
  const [stage, setStage] = useState(null);

  const startMeditation = () => {
    if (stage) {
      setPageStatus("audio");
    }
  };

  const redirectToBot = async () => {
    setPageStatus("select");
    navigation.navigate("BodhiBot");
  };

  useEffect(() => {
    handleStageIdentification(setStage, userEmail);
  }, []);

  useEffect(() => {
    if (pageStatus === "finished") {
      Audio.Sound.createAsync(
        {
          uri: "https://firebasestorage.googleapis.com/v0/b/weather112.appspot.com/o/singing-bowl_23042017-01-raw-71015.mp3?alt=media&token=ca09e1cf-11ad-4422-a41b-600c606b3f1c",
        },
        { shouldPlay: true }
      );
    }
  }, [pageStatus]);

  return (
    <ImageBackground
      source={require("../assets/meditation-room.png")}
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.8 }}
    >
      <Flex
        position="absolute"
        w="95%"
        alignSelf="center"
        bottom={5}
        borderRadius={10}
        borderWidth={pageStatus === "select" ? 2 : 0}
        borderColor={pageStatus === "select" ? "#000" : ""}
        p={5}
        justifyContent="center"
        alignItems="center"
        backgroundColor={`rgba(255, 255, 255, ${
          pageStatus === "select" ? "0.8" : "0"
        })`}
      >
        {pageStatus === "select" && (
          <>
            <Text
              style={{
                fontSize: 25,
                fontFamily: "QuicksandBold",
                color: "#1d1d1d",
                alignSelf: "center",
              }}
            >
              Duration
            </Text>

            <View
              style={{
                width: "80%",
                alignItems: "stretch",
                justifyContent: "center",
              }}
            >
              <Slider
                style={{ width: "100%", height: 49 }}
                minimumValue={5}
                maximumValue={45}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#000000"
                thumbTintColor="#444654"
                value={audioLength}
                onValueChange={setAudioLength}
                step={1}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "#000",
                  fontFamily: "Quicksand",
                }}
              >
                {audioLength} minutes
              </Text>

              <Button onPress={startMeditation} mt={4} isLoading={!stage}>
                Start Meditating
              </Button>
            </View>
          </>
        )}
        {pageStatus === "audio" && (
          <>
            <AudioPlayer
              setPageStatus={setPageStatus}
              duration={audioLength}
              stage={stage ?? 1}
              NoWords={false}
            />
          </>
        )}
        {pageStatus === "finished" && (
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
                You just finished a {audioLength} minute meditation, you can now
                speak to BodhiBot about your current meditation sit and how you
                feel.
              </Text>

              <Flex
                flexDir="row"
                alignItems="center"
                justifyContent="space-around"
              >
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
        )}
      </Flex>
    </ImageBackground>
  );
};
