import React, { useState, useEffect, createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  signInAnonymously,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

const FirebaseContext = createContext(null);

const FirebaseProvider = ({ children }) => {
  const [firebaseApp, setFirebaseApp] = useState(null);
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
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

const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

export { FirebaseProvider, useFirebase };