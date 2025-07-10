export default ({ config }) => ({
  expo: {
    name: "Nomago",
    slug: "Nomago",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "nomago",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.nomago.app"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      package: "com.nomago.app"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    splash: {
      image: "./assets/images/logo.png",
      resizeMode: "contain",
      backgroundColor: "#000000"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#000000"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      STRAPI_API_URL: 'http://10.30.0.80:1337', // Your computer's IP address
      STRAPI_API_TOKEN: '0979e8429f743288c091f4b44803f43c5478ca2a73c95e7fb845cab85e5dedb848b0c138c37a957bca3a506376fd0fdca445deb6b2c22fa8088dd302210fbcdf39ca1cca999d0c62ee70ec4a208f3a347acd00a1d6c4fbb9e3446bcbd15734f82ca0968a437ebc0cbf54bc0e2c22cfd0c1f248d2a8deed07aadb801cdc0fb822'
    }
  }
});