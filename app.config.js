// Expo configuration with environment variable support
// This file replaces app.json and allows dynamic environment variable loading
// Load environment variables
import 'dotenv/config'

export default {
  expo: {
    name: 'ActivityTracker Pro',
    slug: 'activity-tracker-pro',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.irfanmaulana007.ios.activitytracker',
      buildNumber: '1.0.0',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      package: 'com.irfanmaulana007.android.activitytracker',
      versionCode: 1,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: process.env.EAS_PROJECT_ID || 'your-eas-project-id',
      },
      // Firebase configuration from environment variables
      firebaseApiKey: process.env.FIREBASE_API_KEY || 'your-firebase-api-key',
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com',
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID || 'your-project-id',
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com',
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '123456789',
      firebaseAppId: process.env.FIREBASE_APP_ID || 'your-app-id',
    },
    plugins: ['expo-location'],
  },
}
