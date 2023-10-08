import { Flex, Text } from "native-base";

export const ProfileScreen: React.FC<{ userEmail: string }> = ({
  userEmail,
}) => {
  return (
    <Flex flex={1} p={3}>
      <Text fontWeight="bold" fontSize={18}>
        Email Address:
      </Text>
    </Flex>
  );
};
