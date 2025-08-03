// Firebase Configuration and Services
import Constants from 'expo-constants'
import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

// Firebase configuration
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || 'your-api-key',
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || 'your-project.firebaseapp.com',
  projectId: Constants.expoConfig?.extra?.firebaseProjectId || 'your-project-id',
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket || 'your-project.appspot.com',
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId || '123456789',
  appId: Constants.expoConfig?.extra?.firebaseAppId || 'your-app-id',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Auth
export const auth = getAuth(app)

// Initialize Firestore
export const db = getFirestore(app)

// Development environment setup
if (__DEV__) {
  // Uncomment these lines if you want to use Firebase emulators in development
  // connectAuthEmulator(auth, "http://localhost:9099");
  // connectFirestoreEmulator(db, "localhost", 8080);
}

export default app
