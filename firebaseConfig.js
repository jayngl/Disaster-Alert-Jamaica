import { initializeApp, getApps, getApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrUO2K_0Om_NuEx5rhV_cwskWLJhpzHMs",
  authDomain: "disaster-alert-jamaica.firebaseapp.com",
  projectId: "disaster-alert-jamaica",
  storageBucket: "disaster-alert-jamaica.firebasestorage.app",
  messagingSenderId: "732505366140",
  appId: "1:732505366140:web:04d54e05ad7cb69455b3f9",
  measurementId: "G-FJT72KRPCV",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);

export { app, db };
