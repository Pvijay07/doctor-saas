// lib/firebase.js
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  signInAnonymously,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const config = {
  apiKey: "AIzaSyAD_TqXyZZHwk4cN3FDIcpQ33hfdbHdrps",
  authDomain: "petsfolio-2204f.firebaseapp.com",
  projectId: "petsfolio-2204f",
  storageBucket: "petsfolio-2204f.appspot.com", // Changed from firebasestorage.app to appspot.com
  messagingSenderId: "941943976685",
  appId: "1:941943976685:web:07c5d772412dff182812e4", // Changed from android to web
};

const app = getApps().length > 0 ? getApp() : initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
