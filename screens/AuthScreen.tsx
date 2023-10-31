import React, { useEffect, useState } from "react";
import {
  VStack,
  Flex,
  Text,
  Button,
  Input,
  Box,
  Link,
  Checkbox,
} from "native-base";
import { useAuth } from "../hooks/useAuth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../helpers/auth/firebaseConfig";
import { FontAwesome } from "@expo/vector-icons";
import { storeData } from "../helpers/auth/storeData";

export const AuthScreen = ({
  setUser,
  setStatus,
}: {
  setUser: React.Dispatch<string>;
  setStatus: any;
}) => {
  const { user, signInWithGoogle } = useAuth();

  const [authenticationType, setAuthenticationType] =
    useState<string>("Sign in");
  const [consent, setConsent] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // const handleUserSaving = async () => {
  //   setUser(user.email);
  // };

  const handleSignin = async () => {
    if (userEmail) {
      setLoading(true);
      setStatus("onboarding");
      setUser(userEmail);
    }
    // if (userEmail && userPassword) {
    //   setLoading(true);
    //   await signInWithEmailAndPassword(auth, userEmail, userPassword)
    //     .then((signInResponse) => {
    //       console.log(signInResponse);
    //       setLoading(false);
    //     })
    //     .catch((signInError) => {
    //       setLoading(false);

    //       switch (signInError.code) {
    //         case `auth/wrong-password`:
    //           alert("Wrong password, Try again");
    //           break;
    //         case `auth/user-not-found`:
    //           alert("User not found, Try again");
    //           break;
    //       }
    //     });
    // }
  };

  const handleCreateAccount = async () => {
    if (userEmail && userPassword) {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCreateResponse) => {
          console.log("helllo", userCreateResponse);
          setLoading(false);
        })
        .catch((userCreateError) => {
          setLoading(false);
          switch (userCreateError.code) {
            case "auth/email-already-in-use":
              alert("Email already in use, Sign in instead");
              setAuthenticationType("Sign in");
              break;
            case "auth/weak-password":
              alert("Weak password, Try again");
              break;
            case "auth/invalid-email":
              alert("Invalid email, Try again");
              break;
          }
        });
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     handleUserSaving();
  //   }
  // }, [user]);

  return (
    <Flex
      flex={1}
      bg="white"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#75c3db"
    >
      <VStack space={4} width="80%">
        {/* <Text fontSize="2xl">Google Sign in</Text>

        <Button
          w="250px"
          isDisabled={!consent}
          bgColor={"#fff"}
          borderColor="#000"
          borderWidth={1}
          onPress={signInWithGoogle}
        >
          <Flex
            w="200px"
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text>Sign in with Google</Text>
            <FontAwesome name="google" size={32} color="#4285f4" />
          </Flex>
        </Button> */}

        <Text fontSize="2xl" fontFamily="Quicksand">
          {authenticationType}
        </Text>
        <Input
          value={userEmail}
          onChangeText={setUserEmail}
          placeholder="Email"
          variant="outline"
          width="100%"
          fontFamily="Quicksand"
        />
        {/* <Input
          value={userPassword}
          onChangeText={setUserPassword}
          placeholder="Password"
          type="password"
          variant="outline"
          width="100%"
        /> */}
        <Button
          onPress={
            handleSignin
            // authenticationType === "Sign in"
            //   ? handleSignin
            //   : handleCreateAccount
          }
          width="100%"
          isLoading={loading}
          isDisabled={!consent}
          fontFamily="Quicksand"
        >
          {authenticationType}
        </Button>

        <Flex flexDir="row" w={"90%"} alignItems="flex-start">
          <Checkbox
            aria-label="Consent"
            mt={2}
            onChange={(e) => {
              setConsent(e.valueOf());
            }}
            value={String(consent)}
          />
          <Text ml={5} fontSize={14} fontFamily="Quicksand">
            By using this chatbot, you agree to your data being used for
            research purposes and for receiving future email updates about this
            chatbot.
          </Text>
        </Flex>
      </VStack>
    </Flex>
  );
};
