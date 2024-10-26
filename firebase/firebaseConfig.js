// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "ecommerce-bff44.firebaseapp.com",
  projectId: "ecommerce-bff44",
  storageBucket: "ecommerce-bff44.appspot.com",
  messagingSenderId: "375948020823",
  appId: "1:375948020823:web:359139197e5836f227e712",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Firebase Auth and set persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, db, storage };
