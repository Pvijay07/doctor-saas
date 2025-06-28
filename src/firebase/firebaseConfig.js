import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyAD_TqXyZZHwk4cN3FDIcpQ33hfdbHdrps",
  authDomain: "petsfolio-2204f.firebaseapp.com",
  projectId: "petsfolio-2204f",
  storageBucket: "petsfolio-2204f.appspot.com",
  messagingSenderId: "941943976685",
  appId: "1:941943976685:web:07c5d772412dff182812e4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// Get a reference to the database service
var database = firebase.database();
// Get a reference to the storage service
var storage = firebase.storage();


