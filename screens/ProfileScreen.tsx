import { Box, Button, Flex, Input, Text } from "native-base";
import { removeData } from "../helpers/auth/removeData";
import { MenuComponent } from "../components/MenuComponent";
import { Image } from "react-native";
import { useState } from "react";
import { StatsComponent } from "../components/StatsComponent";
import { Share, TouchableOpacity } from "react-native";

export const ProfileScreen: React.FC<{
  userEmail: string;
  navigation: any;
}> = ({ userEmail, navigation }) => {
  const [stats, setStats] = useState([
    {
      name: "Daily",
      value: 15,
    },
    {
      name: "Stage",
      value: 2,
    },
    {
      name: "Hours",
      value: 19,
    },
  ]);

  const handleLogout = async () => {
    await removeData("user");
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out this amazing app! <link_to_your_app>", // you can put the link of your app here
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Flex flex={1} style={{ backgroundColor: "#1d1d1d" }} alignItems="center">
      <MenuComponent navigation={navigation} activeItem="Profile" />

      <Flex flexDir="column" mt={20} alignItems={"center"}>
        <Image
          source={require("../assets/pfp.jpg")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 20,
          }}
        />
        <Text style={{ color: "#fff", fontSize: 23, marginBottom: 30 }}>
          {userEmail.split("@")[0]}
        </Text>
        <Flex flexDir="row" alignItems="center">
          {stats.map((stat, idx) => (
            <StatsComponent key={idx} stat={stat} />
          ))}
        </Flex>
        <Box
          w="90%"
          borderWidth={1}
          borderRadius={10}
          borderColor={"#000"}
          bgColor="gray.700"
          p={4}
          mt={30}
          alignItems={"center"}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Input
            color="#fff"
            height={10}
            value="https://fridmeditation.com/"
            isDisabled={true}
            flex={1}
            marginRight={3}
          />

          <TouchableOpacity
            onPress={onShare}
            style={{
              backgroundColor: "#0891b2",
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 10,
            }}
            activeOpacity={0.7}
          >
            <Text style={{ color: "#fff" }}>Share App</Text>
          </TouchableOpacity>
        </Box>
      </Flex>

      <Button
        onPress={handleLogout}
        position={"absolute"}
        bottom={10}
        w="70%"
        style={{ backgroundColor: "red" }}
      >
        <Text fontSize={18} fontWeight={"bold"} color="#fff">
          Logout
        </Text>
      </Button>
    </Flex>
  );
};
