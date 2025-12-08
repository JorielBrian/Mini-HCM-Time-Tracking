import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfHDV0KLLKRQcA4xJeo7OW3ccpkOWqv5U",
  authDomain: "mini-hcm-time-tracking-d4cd8.firebaseapp.com",
  projectId: "mini-hcm-time-tracking-d4cd8",
  storageBucket: "mini-hcm-time-tracking-d4cd8.firebasestorage.app",
  messagingSenderId: "796120432726",
  appId: "1:796120432726:web:3c7ff5e30d000e47dabbf7"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db };