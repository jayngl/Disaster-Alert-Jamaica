import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrUO2K_0Om_NuEx5rhV_cwskWLJhpzHMs",
  authDomain: "disaster-alert-jamaica.firebaseapp.com",
  projectId: "disaster-alert-jamaica",
  storageBucket: "disaster-alert-jamaica.firebasestorage.app",
  messagingSenderId: "732505366140",
  appId: "1:732505366140:web:04d54e05ad7cb69455b3f9",
  measurementId: "G-FJT72KRPCV"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
