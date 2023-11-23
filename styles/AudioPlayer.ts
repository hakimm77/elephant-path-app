import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    paddingTop: 50,
    paddingBottom: 20,
    color: "#fe776e",
  },
  albumCover: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  songTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1d1d1d",
  },
  artistName: {
    fontSize: 18,
    color: "#666",
    marginTop: 6,
  },
  playbackControls: {
    marginBottom: -30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  slider: {
    width: "100%",
    height: 20,
  },
}) as any;
