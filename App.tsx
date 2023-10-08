import React, { useEffect, useState } from "react";
import { NativeBaseProvider, extendTheme, Flex, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChatScreen } from "./screens/ChatScreen";
import { Image } from "react-native";
import { colors } from "./utils/colors";
import { ResourcesScreen } from "./screens/ResourcesScreen";
import { RetreatsScreen } from "./screens/RetreatsScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

const config = {
  useSystemColorMode: false,
};

const Tab = createBottomTabNavigator();

export const theme = extendTheme({
  config,
  colors: {
    primary: {
      500: colors.primary,
    },
    text: colors.text,
  },
});

type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
export default function App() {
  const [userEmail, setUserEmail] = useState<string>("");

  return (
    <NativeBaseProvider>
      {userEmail ? (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="BodhiBot"
            screenOptions={({ route }) => ({
              tabBarActiveBackgroundColor: "gray",
            })}
          >
            <Tab.Screen
              name="BodhiBot"
              options={{
                tabBarIcon: ({ size, color }) => (
                  <Image
                    source={require("./assets/frid.png")}
                    style={{ width: size, height: size }}
                  />
                ),
                tabBarLabelStyle: { fontSize: 12, color: colors.text },
              }}
            >
              {(props) => <ChatScreen {...props} userEmail={userEmail} />}
            </Tab.Screen>
            <Tab.Screen
              name="Resources"
              options={{
                tabBarIcon: ({ size, color }) => (
                  <Image
                    source={require("./assets/resources.png")}
                    style={{ width: size, height: size }}
                  />
                ),
                tabBarLabelStyle: { fontSize: 12, color: colors.text },
              }}
            >
              {(props) => <ResourcesScreen {...props} userEmail={userEmail} />}
            </Tab.Screen>
            <Tab.Screen
              name="Retreats"
              options={{
                tabBarIcon: ({ size, color }) => (
                  <Image
                    source={require("./assets/redirect.png")}
                    style={{ width: size, height: size }}
                  />
                ),
                tabBarLabelStyle: { fontSize: 12, color: colors.text },
              }}
              component={RetreatsScreen}
            />
            <Tab.Screen
              name="Profile"
              options={{
                tabBarIcon: ({ size, color }) => (
                  <Image
                    source={require("./assets/profile.png")}
                    style={{ width: size, height: size }}
                  />
                ),
                tabBarLabelStyle: { fontSize: 12, color: colors.text },
              }}
            >
              {(props) => <ProfileScreen {...props} userEmail={userEmail} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <AuthScreen setUser={setUserEmail} />
      )}
    </NativeBaseProvider>
  );
}
