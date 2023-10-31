import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BodhiBot } from "./screens/BodhiBot";
import { colors } from "./utils/colors";
import { ResourcesScreen } from "./screens/ResourcesScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { getData } from "./helpers/auth/getData";
import { PathScreen } from "./screens/PathScreen";
import { MeditationRoom } from "./screens/MeditationRoom";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Image, Keyboard, LogBox } from "react-native";

const config = {
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
});

const Tab = createBottomTabNavigator();

export default function App() {
  LogBox.ignoreAllLogs(true);
  const [userEmail, setUserEmail] = useState("");
  const [fontsLoaded] = useFonts({
    Quicksand: require("./assets/fonts/Quicksand.ttf"),
    QuicksandBold: require("./assets/fonts/Quicksand-Bold.ttf"),
    QuicksandSemiBold: require("./assets/fonts/Quicksand-SemiBold.ttf"),
  });

  useEffect(() => {
    getData("user", setUserEmail);
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={theme}>
        {userEmail ? (
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
                  } else if (route.name === "Resources") {
                    return (
                      <Image
                        source={require("./assets/resources-logo.png")}
                        style={{ width: 25, height: 25 }}
                      />
                    );
                  } else if (route.name === "Profile") {
                    return (
                      <Image
                        source={require("./assets/home-logo.png")}
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
                name="Path"
                children={(props) => (
                  <PathScreen {...props} userEmail={userEmail} />
                )}
              />
              <Tab.Screen
                name="BodhiBot"
                children={(props) => (
                  <BodhiBot {...props} userEmail={userEmail} />
                )}
              />
              <Tab.Screen name="Meditation" component={MeditationRoom} />
              <Tab.Screen
                name="Resources"
                component={(props: any) => (
                  <ResourcesScreen {...props} userEmail={userEmail} />
                )}
              />
              <Tab.Screen
                name="Profile"
                component={(props: any) => (
                  <ProfileScreen {...props} userEmail={userEmail} />
                )}
              />
            </Tab.Navigator>
          </NavigationContainer>
        ) : (
          <AuthScreen setUser={setUserEmail} />
        )}
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
