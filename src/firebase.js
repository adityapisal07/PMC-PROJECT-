// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9Jg7JAOS0Q8awhD2TN4UJqsDgp_NKsRc",
  authDomain: "reactauthapp-f0d68.firebaseapp.com",
  projectId: "reactauthapp-f0d68",
  storageBucket: "reactauthapp-f0d68.appspot.com", // NOTE: fixed typo (should end with .appspot.com)
  messagingSenderId: "494622492329",
  appId: "1:494622492329:web:d9f7000d6d272263830bb8",
  measurementId: "G-N7K4S2KBL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, googleProvider, db, storage };
