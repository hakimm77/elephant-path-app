import { Flex, Text } from "native-base";

export const ResourcesScreen: React.FC<{ userEmail: string }> = ({
  userEmail,
}) => {
  return (
    <Flex flex={1} bg="white" alignItems="center" justifyContent="center">
      <Text>Resources, coming soon....</Text>
    </Flex>
  );
};
