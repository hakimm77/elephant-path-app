import React, { useState, useEffect, useRef } from "react";
import { Animated, TouchableOpacity } from "react-native";
import {
  HamburgerIcon,
  CloseIcon,
  IconButton,
  Text,
  Flex,
  Image,
  View,
} from "native-base";
import { Easing } from "react-native";

export const MenuComponent = ({
  navigation,
  activeItem,
}: {
  navigation: any;
  activeItem: string;
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const drawerWidthPercentage = 50;
  const initialDrawerPosition = -(drawerWidthPercentage / 100) * 75;
  const drawerTranslateX = useRef(
    new Animated.Value(initialDrawerPosition)
  ).current;

  const navItems = [
    {
      name: "Home",
      function: () => {
        navigation.navigate("Home");
        setDrawerOpen(false);
      },
      icon: require("../assets/navItems/bodhibot.png"),
    },
    {
      name: "BodhiBot",
      function: () => {
        navigation.navigate("BodhiBot");
        setDrawerOpen(false);
      },
      icon: require("../assets/navItems/bodhibot.png"),
    },
    {
      name: "Meditation Room",
      function: () => {
        navigation.navigate("Meditation");
        setDrawerOpen(false);
      },
      icon: require("../assets/navItems/bodhibot.png"),
    },
    {
      name: "Resources",
      function: () => {
        navigation.navigate("Resources");
        setDrawerOpen(false);
      },
      icon: require("../assets/navItems/bodhibot.png"),
    },
    {
      name: "Profile",
      function: () => {
        navigation.navigate("Profile");
        setDrawerOpen(false);
      },
      icon: require("../assets/navItems/bodhibot.png"),
    },
  ];

  const handleMenuPress = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleOverlayPress = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    Animated.timing(drawerTranslateX, {
      toValue: isDrawerOpen ? 0 : initialDrawerPosition,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();
  }, [isDrawerOpen, drawerTranslateX]);

  const overlayStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 40,
  };

  return (
    <>
      <Flex zIndex={100} position="absolute" top={5} left={5}>
        <IconButton
          icon={
            isDrawerOpen ? (
              <CloseIcon size="6" color="white" />
            ) : (
              <HamburgerIcon size="6" color="#1d1d1d" />
            )
          }
          onPress={handleMenuPress}
          backgroundColor="transparent"
          _hover={{ backgroundColor: "transparent" }}
          _pressed={{ backgroundColor: "transparent" }}
        />
      </Flex>
      {isDrawerOpen && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <TouchableOpacity
            style={overlayStyle}
            activeOpacity={1}
            onPress={handleOverlayPress}
          ></TouchableOpacity>

          <Animated.View
            style={{
              transform: [{ translateX: drawerTranslateX }],
              flexDirection: "column",
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 50,
              width: "70%",
              height: "100%",
              backgroundColor: "#096c7d",
              paddingTop: 100,
              paddingLeft: 20,
            }}
          >
            {navItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.function}
                style={{ flexDirection: "row", marginBottom: 20 }}
              >
                <Image
                  source={item.icon}
                  alt={item.name}
                  style={{ width: 24, height: 24, marginRight: 10 }}
                />
                <Text color={activeItem === item.name ? "#FFFFFF" : "#000000"}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>
      )}
    </>
  );
};
