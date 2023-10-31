import React, { useState, useRef } from "react";
import { Box, Flex } from "native-base";
import {
  Animated,
  StyleSheet,
  Text,
  Modal,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import YoutubePlayer from "react-native-youtube-iframe";

export const StageComponent: React.FC<{
  index: number;
  stage: any;
  currentStage: number | null;
  navigation: any;
  userEmail: string;
}> = ({ stage, index, currentStage, navigation, userEmail }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const animateScale = (newValue: any) => {
    Animated.spring(scale, {
      toValue: newValue,
      useNativeDriver: true,
      speed: 20,
      bounciness: 12,
    }).start();
  };

  const handlePressIn = () => {
    animateScale(0.8);
  };

  const handlePressOut = () => {
    animateScale(1);
  };

  const handlePress = () => {
    setModalVisible(true);
  };

  const redirectToBodhiBot = async (lesson: string) => {
    await setModalVisible(false);

    navigation.navigate("BodhiBot", {
      userEmail: userEmail,
      lesson: lesson,
    });
  };

  return (
    <Flex
      w="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Animated.View
        style={[
          {
            width: "90%",
            height: 80,
            backgroundColor: "#fff",
            borderWidth: 2,
            borderColor: currentStage >= stage.stage ? "green" : "#0a5581",
            borderRadius: 10,
            padding: 10,
            justifyContent: "center",
          },
          { transform: [{ scale }] },
        ]}
        key={index}
      >
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress} // added onPress event to control modal
        >
          <Text style={{ fontSize: 18, fontFamily: "Quicksand" }}>
            {stage.title}: {stage.goals}
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <ScrollView>
              <Text style={{ ...styles.modalTitle, marginBottom: 30 }}>
                About {stage.title}
              </Text>

              <YoutubePlayer
                height={200}
                width={"100%"}
                videoId={stage.video}
                onError={(e) => console.log(e)}
                onPlaybackQualityChange={(q) => console.log(q)}
                volume={100}
              />

              <Text style={styles.modalSubtitle}>Lessons</Text>
              {stage.links.map((linkItem: string, index: number) => (
                <Text
                  key={index}
                  style={styles.linkText}
                  onPress={() => {
                    redirectToBodhiBot(linkItem);
                  }}
                >
                  - {linkItem}
                </Text>
              ))}

              <Text style={styles.modalSubtitle}>Goals</Text>
              <Text style={styles.modalText}>{stage.goals}</Text>

              <Text style={styles.modalSubtitle}>Obstacles</Text>
              {stage.obstacles.map((obstacle: string, index: number) => (
                <Text key={index} style={styles.modalText}>
                  - {obstacle}
                </Text>
              ))}

              <Text style={styles.modalSubtitle}>Mastery Criteria</Text>
              {stage.mastery.map((masteryItem: string, index: number) => (
                <Text key={index} style={styles.modalText}>
                  - {masteryItem}
                </Text>
              ))}

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Box
        style={{
          width: 20,
          height: 40,
          borderRadius: 3,
          backgroundColor: currentStage >= stage.stage ? "green" : "#0a5581",
        }}
      />
    </Flex>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    shadowColor: "#000",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: "center",
    alignItems: "center",
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Quicksand",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 20,
    fontFamily: "Quicksand",
    marginTop: 15,
  },
  modalText: {
    fontSize: 16,
    fontFamily: "Quicksand",
    textAlign: "left",
    marginBottom: 5,
  },
  linkText: {
    color: "blue",
    fontSize: 16,
    fontFamily: "Quicksand",
    textAlign: "left",
    marginBottom: 5,
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
  },
});
