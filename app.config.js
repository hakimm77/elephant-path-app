export default {
  expo: {
    owner: "hakimm77",
    name: "Eelephant Path",
    slug: "elephant-path",
    version: "1.0.4",
    orientation: "portrait",
    icon: "./assets/logo.png",
    splash: {
      image: "./assets/logo.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      url: "https://u.expo.dev/e1ca8747-8040-400c-ad57-b63255e8e994",
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.elephantpath.app",
    },
    android: {
      package: "com.elephantpath.app",
      adaptiveIcon: {
        foregroundImage: "./assets/logo.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/logo.png",
    },
    extra: {
      eas: {
        projectId: "e1ca8747-8040-400c-ad57-b63255e8e994",
      },
    },
  },
};
