// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANDen27dHMk3PzoGTXa-t3ViGqCWJsjXs",
  authDomain: "jazz-piano-lessons.firebaseapp.com",
  projectId: "jazz-piano-lessons",
  storageBucket: "jazz-piano-lessons.firebasestorage.app",
  messagingSenderId: "46756887289",
  appId: "1:46756887289:web:bef30326dfc6ee6be3c028",
  measurementId: "G-25R5C90BTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
