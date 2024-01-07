// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "roulette-95581.firebaseapp.com",
  projectId: "roulette-95581",
  storageBucket: "roulette-95581.appspot.com",
  messagingSenderId: "246526117881",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-BVNRN26X1L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();