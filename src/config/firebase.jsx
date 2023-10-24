// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from "firebase/firestore"
import { compileString } from "sass";
const firebaseConfig = {
  apiKey: "AIzaSyBmGKiS4LLRDWAXxK4XYjx46HoNUzAC7IU",
  authDomain: "crud-app-42e0d.firebaseapp.com",
  projectId: "crud-app-42e0d",
  storageBucket: "crud-app-42e0d.appspot.com",
  messagingSenderId: "582017293186",
  appId: "1:582017293186:web:e45d86873fdb72e5050d9b",
  measurementId: "G-EZ8G9W2CBQ",
};
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app);

