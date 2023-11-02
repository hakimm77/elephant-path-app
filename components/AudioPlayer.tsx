import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Audio } from "expo-av";
import { styles } from "../styles/AudioPlayer";
import { recordings } from "../helpers/meditationRecordings/recordings";
import Icon from "react-native-vector-icons/Ionicons";
import { Flex } from "native-base";
import Slider from "@react-native-community/slider";

const AudioPlayer: React.FC<{
  duration: number;
  stage: number;
  setPageStatus: any;
  NoWords: boolean;
  specification: string;
}> = ({ duration, stage, setPageStatus, NoWords, specification }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackFinished, setPlaybackFinished] = useState(false);
  const [scriptProgress, setScriptProgress] = useState(0);
  const [soundDuration, setSoundDuration] = useState(1);
  const [sound, setSound] = useState<any>(null);
  const [recordingIndex, setRecordingIndex] = useState(0);
  const [silenceLength, setSilenceLength] = useState(0);
  const recordingsTimeline = specification
    ? recordings[duration < 13 ? 0 : stage - 1]
    : recordings[duration < 13 ? 0 : stage - 1];

  const seekToPosition = async (value: number) => {
    if (sound) {
      const positionMillis = value * soundDuration;
      await sound.setPositionAsync(positionMillis);
    }
  };

  const getAudioDuration = async (uri: string) => {
    try {
      const { sound, status }: { sound: any; status: any } =
        await Audio.Sound.createAsync({ uri }, { shouldPlay: false });
      const duration = status.durationMillis;
      await sound.unloadAsync();
      return duration;
    } catch (error) {
      console.error("Error getting audio duration", error);
      return 0;
    }
  };

  const getAllDurations = async (timeline: any) => {
    const promises = timeline
      .filter((recording: any) => recording.link)
      .map((recording: any) => getAudioDuration(recording.link));
    return await Promise.all(promises);
  };

  async function loadAndPlaySound(recordingIndex: number) {
    if (recordingsTimeline.timeline.length > recordingIndex) {
      if (recordingsTimeline.timeline[recordingIndex].link) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          {
            uri: recordingsTimeline.timeline[recordingIndex].link as string,
          },
          { shouldPlay: true }
        );

        setSound(newSound);
        setIsPlaying(true);
        setIsLoading(false);
      } else {
        setSound(null);

        setTimeout(() => {
          let nextRecordingIndex = recordingIndex + 1;

          if (nextRecordingIndex > recordingsTimeline.timeline.length - 1) {
            setIsPlaying(false);
            setPlaybackFinished(true);
            setIsLoading(false);
          } else {
            setIsPlaying(true);
            setIsLoading(false);
            setRecordingIndex(nextRecordingIndex);
            loadAndPlaySound(nextRecordingIndex);
          }
        }, silenceLength);
      }
    }
  }

  useEffect(() => {
    const fetchDurations = async () => {
      const allDurations = await getAllDurations(recordingsTimeline.timeline);

      let total = 0;
      for (var i in allDurations) {
        total += allDurations[i];
      }

      console.log("silence duration should be: ", duration * 60 * 1000 - total);

      setSilenceLength(duration * 60 * 1000 - total);
    };

    fetchDurations();
  }, []);

  useEffect(() => {
    loadAndPlaySound(recordingIndex);

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(async (status: any) => {
        if (status.isLoaded) {
          setScriptProgress(status.positionMillis);
          setSoundDuration(status.durationMillis || 1);

          if (status.didJustFinish) {
            if (recordingIndex < recordingsTimeline.timeline.length - 1) {
              await sound.unloadAsync();
              setSound(null);
              setIsPlaying(false);

              let nextRecordingIndex = recordingIndex + 1;
              setRecordingIndex(nextRecordingIndex);
              loadAndPlaySound(nextRecordingIndex);
            } else {
              setIsPlaying(false);
              setPlaybackFinished(true);
              setIsLoading(false);
            }
          }
        } else if (status.error) {
          console.log(`Encountered a playback error: ${status.error}`);
          setIsLoading(false);
        }
      });
    }
  }, [sound]);

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (playbackFinished) {
      setPageStatus("finished");
    }
  }, [playbackFinished]);

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#1d1d1d" />
        ) : recordingsTimeline.timeline[recordingIndex].link ? (
          <>
            <View style={styles.playbackControls}>
              <Slider
                style={{ width: "90%", height: 40 }}
                minimumValue={0}
                maximumValue={soundDuration}
                value={scriptProgress}
                onSlidingComplete={seekToPosition}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
              />

              <Flex
                flexDir="row"
                alignItems="center"
                justifyContent="space-around"
                w="80%"
              >
                <TouchableOpacity
                  onPress={async () => {
                    if (sound) {
                      await sound.stopAsync(); // Stop the sound
                    }
                    setPageStatus("select"); // Set the page status to select
                  }}
                >
                  <Icon name="arrow-back" size={80} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity onPress={togglePlayPause}>
                  <Icon
                    name={
                      playbackFinished
                        ? "reload-circle"
                        : isPlaying
                        ? "pause-circle"
                        : "play-circle"
                    }
                    color="#fff"
                    size={80}
                  />
                </TouchableOpacity>
              </Flex>
            </View>
          </>
        ) : (
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "bold" }}>
            Meditating...
          </Text>
        )}
      </View>
    </View>
  );
};

export default AudioPlayer;
