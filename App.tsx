import "react-native-polyfill-globals/auto";
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BodhiBot } from "./screens/BodhiBot";
import { AuthScreen } from "./screens/AuthScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { getData } from "./helpers/auth/getData";
import { PathScreen } from "./screens/PathScreen";
import { MeditationRoom } from "./screens/MeditationRoom";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Image, Keyboard, LogBox, Text, View } from "react-native";
import { ContactScreen } from "./screens/ContactScreen";
import { OnBoardingScreen } from "./screens/OnBoardingScreen";
import { handleStageIdentification } from "./helpers/handleStageIdentification";

const config = {
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
});

const Tab = createBottomTabNavigator();

export default function App() {
  LogBox.ignoreAllLogs();
  const [userEmail, setUserEmail] = useState("");
  const [fetchedEmail, setFetchedEmail] = useState("");
  const [status, setStatus] = useState<"auth" | "app" | "onboarding">("auth");
  const [fontsLoaded] = useFonts({
    Quicksand: require("./assets/fonts/Quicksand.ttf"),
    QuicksandBold: require("./assets/fonts/Quicksand-Bold.ttf"),
    QuicksandSemiBold: require("./assets/fonts/Quicksand-SemiBold.ttf"),
  });

  useEffect(() => {
    getData("user", setFetchedEmail);
  }, []);

  useEffect(() => {
    if (fetchedEmail) {
      setStatus("app");
    }
  }, [fetchedEmail]);

  useEffect(() => {
    if (fetchedEmail) {
      handleStageIdentification(fetchedEmail);
    }
  }, [fetchedEmail]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={theme}>
        {status === "app" ? (
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === "Path") {
                    return (
                      <Image
                        source={require("./assets/home-logo.png")}
                        style={{ width: 25, height: 25, resizeMode: "contain" }}
                      />
                    );
                  } else if (route.name === "BodhiBot") {
                    return (
                      <Image
                        source={require("./assets/bodhibot-logo3.png")}
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: "contain",
                        }}
                      />
                    );
                  } else if (route.name === "Meditation") {
                    return (
                      <Image
                        source={require("./assets/meditation-room-logo.png")}
                        style={{ width: 23, height: 23, resizeMode: "contain" }}
                      />
                    );
                  } else if (route.name === "Contact") {
                    return (
                      <Image
                        source={require("./assets/resources-logo.png")}
                        style={{ width: 25, height: 25 }}
                      />
                    );
                  } else if (route.name === "Profile") {
                    return (
                      <Image
                        source={require("./assets/profile.png")}
                        style={{ width: 25, height: 25 }}
                      />
                    );
                  }
                },
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: "#444654", // active icon color
                tabBarInactiveTintColor: "gray", // inactive icon color
                tabBarActiveBackgroundColor: "#c2e4e2",
                tabBarInactiveBackgroundColor: "#fff8e4",
              })}
            >
              <Tab.Screen
                name="BodhiBot"
                children={(props) => (
                  <BodhiBot {...props} userEmail={fetchedEmail} />
                )}
              />
              <Tab.Screen
                name="Path"
                children={(props) => (
                  <PathScreen {...props} userEmail={fetchedEmail} />
                )}
              />
              <Tab.Screen
                name="Meditation"
                children={(props) => (
                  <MeditationRoom {...props} userEmail={fetchedEmail} />
                )}
              />
              <Tab.Screen
                name="Contact"
                component={(props: any) => (
                  <ContactScreen {...props} userEmail={fetchedEmail} />
                )}
              />
              <Tab.Screen
                name="Profile"
                component={(props: any) => (
                  <ProfileScreen {...props} userEmail={fetchedEmail} />
                )}
              />
            </Tab.Navigator>
          </NavigationContainer>
        ) : status === "auth" ? (
          <AuthScreen setUser={setUserEmail} setStatus={setStatus} />
        ) : (
          <OnBoardingScreen
            setFetchedEmail={setFetchedEmail}
            userEmail={userEmail}
          />
        )}
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
