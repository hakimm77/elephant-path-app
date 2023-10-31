import { StyleSheet, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { View } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StageComponent } from "../components/StageComponent";
import { handleStageIdentification } from "../helpers/handleStageIdentification";

export const PathScreen: React.FC<{ userEmail: string; navigation: any }> = ({
  userEmail,
  navigation,
}) => {
  const [currentStage, setCurrentStage] = useState(null);
  const [stages, setStages] = React.useState([
    {
      title: "Stage 4",
      stage: 4,
      video: "jKBvhyWiTKU",
      goals: "Continuous Attention",
      obstacles: ["Scattered attention", "Laxity", "Subtle dullness"],
      mastery: [
        "Sustained attention on the object",
        "Ability to maintain clarity and sharpness in focus",
      ],
      links: [
        "Continuous introspective awareness",
        "Monitoring Quality of Attention",
      ],
    },

    {
      title: "Stage 3",
      stage: 3,
      video: "jKBvhyWiTKU",
      goals: "Overcoming Forgetting",
      obstacles: ["Forgetting the object of meditation", "Subtle distraction"],
      mastery: [
        "Significantly reduced episodes of forgetting",
        "Swift recognition and correction of distractions",
      ],
      links: ["Labeling", "Checking in"],
    },
    {
      title: "Stage 2",
      stage: 2,
      video: "jKBvhyWiTKU",
      goals: "Overcoming mind wandering",
      obstacles: ["Gross distraction", "Monkey mind"],
      mastery: [
        "Reduced frequency and duration of mind wandering",
        "Ability to redirect attention back to the object swiftly",
      ],
      links: ["Counting Technique", "Aha moment "],
    },
    {
      title: "Stage 1",
      stage: 1,
      video: "jKBvhyWiTKU",
      goals: "Establishing a consistent practice",
      obstacles: ["Procrastination", "Resistance", "Lack of routine"],
      mastery: [
        "Established daily practice",
        "Reduced resistance to sitting",
        "Consistent routine",
      ],
      links: ["6 point preparation", "4 stage transition"],
    },
  ]);

  useEffect(() => {
    handleStageIdentification(setCurrentStage);
  }, []);
  return (
    <View style={styles.container}>
      {stages.map((stage, index) => (
        <StageComponent
          stage={stage}
          index={index}
          currentStage={currentStage}
          navigation={navigation}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#75c3db",
    paddingTop: 50,
  },
});
