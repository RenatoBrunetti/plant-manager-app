const dotenv = require('dotenv');
dotenv.config();

export default {
  expo: {
    name: "plantmanager",
    slug: "plantmanager",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    splash: {
      image: "./src/assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./src/assets/favicon.png"
    },
    extra: {
      api_ip: process.env.API_IP,
      api_port: process.env.API_PORT
    }
  }
}
