// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsb_OV5rmV2y6NlOU4XAh5CzEEYy41VTU",
  authDomain: "ecommerce-bff44.firebaseapp.com",
  projectId: "ecommerce-bff44",
  storageBucket: "ecommerce-bff44.appspot.com",
  messagingSenderId: "375948020823",
  appId: "1:375948020823:web:359139197e5836f227e712",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and set persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };