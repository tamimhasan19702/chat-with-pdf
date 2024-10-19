/** @format */

// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7K-zvlBIDDgeqK0qH0Flg84ZUArpbK-g",
  authDomain: "chatwithpdf-99c1b.firebaseapp.com",
  projectId: "chatwithpdf-99c1b",
  storageBucket: "chatwithpdf-99c1b.appspot.com",
  messagingSenderId: "871818561966",
  appId: "1:871818561966:web:a3cc21a6d8ad3c8cbf603f",
  measurementId: "G-BMW6LVKFCN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const STORAGE = getStorage(app);
