import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Svg, Circle, Text } from "react-native-svg";

export const AudioTimer: React.FC<{
  pauseStatus: boolean;
  togglePause: any;
  duration: number;
  setFinished: any;
  finished: boolean;
}> = ({ pauseStatus, togglePause, duration, setFinished, finished }) => {
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [strokeDashoffset, setStrokeDashoffset] = useState<any>(null);
  useEffect(() => {
    if (progress === 100) {
      setFinished(true);
    }
  }, [progress]);

  useEffect(() => {
    const interval: any = setInterval(() => {
      if (!pauseStatus) {
        setProgress((oldProgress: any) => {
          if (oldProgress < 100) {
            return oldProgress + 100 / (duration / 1000);
          } else if (oldProgress >= 100 || finished) {
            clearInterval(interval);
            return 100;
          }
        });
      }
    }, 1000);
    setIntervalId(interval);

    return () => clearInterval(interval);
  }, [pauseStatus, duration]);

  const radius = 50;
  const innerRadius = 45;
  const circumference = 2 * Math.PI * radius;

  const minutes = Math.floor(((progress / 100) * duration) / 1000 / 60);
  const seconds = Math.floor((((progress / 100) * duration) / 1000) % 60);
  const timeFormatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  useEffect(() => {
    setStrokeDashoffset(
      Math.floor(circumference - (progress / 100) * circumference)
    );
    if (progress === 100) {
      setFinished(true);
    }
  }, [progress]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePause}>
        <Svg height="120" width="120">
          <Circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="black"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90, 60, 60)`}
          />
          <Circle
            cx="60"
            cy="60"
            r={innerRadius}
            fill="#fff" // Change to your desired color
          />
          <Text
            x="60"
            y="60"
            fill="black" // Change text color if needed
            fontSize="20"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {timeFormatted}
          </Text>
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
