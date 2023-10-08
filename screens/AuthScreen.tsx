import React, { useState } from "react";
import { VStack, Flex, Text, Button, Input, Box } from "native-base";

export const AuthScreen = ({
  setLoginStatus,
}: {
  setLoginStatus: React.Dispatch<boolean>;
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoginStatus(true);
      setLoading(false);
    }, 1000);
  };

  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoginStatus(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <Flex flex={1} bg="white" alignItems="center" justifyContent="center">
      <VStack space={4} width="80%">
        <Text fontSize="2xl">{isLogin ? "Login" : "Signup"}</Text>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          variant="outline"
          width="100%"
        />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          type="password"
          variant="outline"
          width="100%"
        />
        <Button
          onPress={isLogin ? handleLogin : handleSignup}
          width="100%"
          isLoading={loading}
        >
          {isLogin ? "Login" : "Signup"}
        </Button>
        <Box>
          {isLogin ? (
            <Text onPress={() => setIsLogin(false)}>
              Don't have an account? Signup
            </Text>
          ) : (
            <Text onPress={() => setIsLogin(true)}>
              Already have an account? Login
            </Text>
          )}
        </Box>
      </VStack>
    </Flex>
  );
};
