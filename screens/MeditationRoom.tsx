import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import { Flex, Button } from "native-base";
import Slider from "@react-native-community/slider";
import AudioPlayer from "../components/AudioPlayer";
import { handleStageIdentification } from "../helpers/handleStageIdentification";

export const MeditationRoom: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [pageStatus, setPageStatus] = useState<"select" | "audio">("select");
  const [audioLength, setAudioLength] = useState(15); // Default length
  const [stage, setStage] = useState(null);

  const startMeditation = () => {
    if (stage) {
      setPageStatus("audio");
    }
  };

  useEffect(() => {
    handleStageIdentification(setStage);
  }, []);

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
        {pageStatus === "select" ? (
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
                minimumValue={15}
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
        ) : (
          <>
            <AudioPlayer
              setPageStatus={setPageStatus}
              duration={audioLength}
              stage={stage ?? 1}
            />
          </>
        )}
      </Flex>
    </ImageBackground>
  );
};
