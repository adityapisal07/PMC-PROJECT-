// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9Jg7JAOS0Q8awhD2TN4UJqsDgp_NKsRc",
  authDomain: "reactauthapp-f0d68.firebaseapp.com",
  projectId: "reactauthapp-f0d68",
  storageBucket: "reactauthapp-f0d68.firebasestorage.app",
  messagingSenderId: "494622492329",
  appId: "1:494622492329:web:d9f7000d6d272263830bb8",
  measurementId: "G-N7K4S2KBL9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
