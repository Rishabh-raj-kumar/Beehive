// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKSzjorNxJSp1DxURtLc8wHa8fMUkWo8A",
  authDomain: "beehive-29535.firebaseapp.com",
  projectId: "beehive-29535",
  storageBucket: "beehive-29535.appspot.com",
  messagingSenderId: "193603109647",
  appId: "1:193603109647:web:0fa8c031f07d254fed747a",
  measurementId: "G-Y0ZH4P1JF1"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebase);
const analytics = getAnalytics(firebase);
const FieldValue = Firestore;

export { firebase, FieldValue };
