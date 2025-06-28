
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  signInAnonymously,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";


const FirebaseProvider = ({ children }) => {
  const [firebaseApp, setFirebaseApp] = useState(null);
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        const firebaseConfig = {
          apiKey: "AIzaSyAD_TqXyZZHwk4cN3FDIcpQ33hfdbHdrps",
          authDomain: "petsfolio-2204f.firebaseapp.com",
          projectId: "petsfolio-2204f",
          storageBucket: "petsfolio-2204f.appspot.com",
          messagingSenderId: "941943976685",
          appId: "1:941943976685:web:07c5d772412dff182812e4",
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const firestore = getFirestore(app);
        const firebaseAuth = getAuth(app);

        setFirebaseApp(app);
        setDb(firestore);
        setAuth(firebaseAuth);

        const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
          if (user) {
            setUserId(user.uid);
            setLoading(false);
          } else {
            try {
              const initialAuthToken =
                typeof __initial_auth_token !== "undefined"
                  ? __initial_auth_token
                  : null;

              if (initialAuthToken) {
                await signInWithCustomToken(firebaseAuth, initialAuthToken);
              } else {
                await signInAnonymously(firebaseAuth);
              }
            } catch (error) {
              console.error("Authentication error:", error);
              // Fallback to anonymous auth if other methods fail
              try {
                await signInAnonymously(firebaseAuth);
              } catch (anonError) {
                console.error("Anonymous auth failed:", anonError);
                setLoading(false);
              }
            }
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Firebase initialization failed:", error);
        setLoading(false);
      }
    };

    initializeFirebase();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-lg text-gray-700">Loading application...</p>
      </div>
    );
  }

  return (
    <FirebaseContext.Provider value={{ db, auth, userId, firebaseApp }}>
      {children}
    </FirebaseContext.Provider>
  );
};


export default FirebaseProvider;