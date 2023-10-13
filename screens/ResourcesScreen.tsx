import React, { useState } from "react";
import { Button, Flex, Spinner, Text } from "native-base";
import { WebView } from "react-native-webview";
import { Asset } from "expo-asset";

export const ResourcesScreen: React.FC<{ userEmail: string }> = ({
  userEmail,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const pdfUrl =
    "https://mybodhisattva.com/wp-content/uploads/2022/05/the-mind-illuminated-by-culadasa-john-yates-ph.d.-matthew-immergut-jeremy-graves-2017.pdf";
  const googleDriveUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${pdfUrl}`;

  return (
    <Flex flex={1}>
      {isLoading && (
        <Flex justifyContent="center" alignItems="center" flex={1}>
          <Spinner size="lg" />
          <Text>Loading...</Text>
        </Flex>
      )}
      <WebView
        source={{
          uri: googleDriveUrl,
        }}
        onLoad={() => setIsLoading(false)}
        style={{ flex: 1 }}
      />
    </Flex>
  );
};
