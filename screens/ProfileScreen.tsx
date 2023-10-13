import { Button, Flex, Text } from "native-base";
import { removeData } from "../helpers/auth/removeData";

export const ProfileScreen: React.FC<{ userEmail: string }> = ({
  userEmail,
}) => {
  const handleLogout = async () => {
    await removeData("user");
  };

  return (
    <Flex flex={1} p={3}>
      <Text fontWeight="bold" fontSize={18} mb={5}>
        Welcome!
      </Text>
      <Text fontSize={17} mb={20}>
        {userEmail}
      </Text>

      <Button onPress={handleLogout}>Logout</Button>
    </Flex>
  );
};
