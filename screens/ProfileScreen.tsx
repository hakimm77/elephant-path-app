import { Box, Button, Flex, Input } from "native-base";
import { removeData } from "../helpers/auth/removeData";
import {
  Image,
  ImageBackground,
  Text,
  Share,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { StatsComponent } from "../components/StatsComponent";
import { getData } from "../helpers/auth/getData";
import { handleDeleteAccount } from "../helpers/auth/handleDeleteAccount";
import {handleClearChat} from "../helpers/apiHandlers/handleClearChat"
import { IConversation } from "../utils/types";

export const ProfileScreen: React.FC<{
  userEmail: string;
  setConversation: React.Dispatch<React.SetStateAction<IConversation[]>>;
}> = ({ userEmail, setConversation }) => {
  const [stage, setStage] = useState(null);
  console.log("convo func ", setConversation)
  const handleLogout = async () => {
    await removeData("user");
    await removeData("stage");
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out this amazing app! https://fridmditation.com",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getData("stage", setStage);
  }, []);

  return (
    <ImageBackground
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      imageStyle={{
        resizeMode: "cover",
      }}
      source={require("../assets/profile-screen.png")}
    >
      <Flex flexDir="column" mt={-20} alignItems={"center"}>
        <Image
          source={require("../assets/pfp.jpg")}
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            marginBottom: 20,
          }}
        />

        <Flex
          flexDir="column"
          alignItems={"center"}
          backgroundColor={"rgba(255,255,255,0.7)"}
          p={3}
          borderRadius={10}
          borderWidth={1}
          borderColor={"#000"}
          mb={30}
        >
          <Flex flexDir="row" alignItems="center">
            <Text style={{ color: "#1d1d1d", fontSize: 23 }}>
              {userEmail.split("@")[0]}
            </Text>
            <StatsComponent stage={stage ?? 1} />
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
              value="fridmeditation.com"
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
      </Flex>

      <Button
        onPress={handleLogout}
        position={"absolute"}
        bottom={5}
        w="70%"
        style={{ backgroundColor: "red" }}
      >
        <Text style={{ fontFamily: "Quicksand", fontSize: 18, color: "#fff" }}>
          Logout
        </Text>
      </Button>

      <Button
        onPress={() => {
          handleDeleteAccount(userEmail);
        }}
        position={"absolute"}
        bottom={20}
        // w="70%"
        w = "70%"
        style={{ backgroundColor: "blue" }}
      >
        <Text style={{ fontFamily: "Quicksand", fontSize: 18, color: "#fff" }}>
          Delete Account
        </Text>
      </Button>

      <Button
        onPress={async () => {
          handleClearChat(userEmail, setConversation);
        }}
        position={"absolute"}
        bottom={36}
        w="70%"
        style={{ backgroundColor: "red" }}
      >
        <Text style={{ fontFamily: "Quicksand", fontSize: 18, color: "#fff" }}>
          Clear Chat
        </Text>
      </Button>

    </ImageBackground>
  );
};
