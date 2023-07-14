// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore';
import { Firestore } from "firebase/firestore";
 
//needed it once for exporting data to cloud datastore.
// import {seedDatabase} from '../seed';

const firebaseConfig = {
  apiKey: "AIzaSyBHJ4QosAFGXvi0LpxsZKlrXk701pr3a58",
  authDomain: "instagram-a42d4.firebaseapp.com",
  projectId: "instagram-a42d4",
  storageBucket: "instagram-a42d4.appspot.com",
  messagingSenderId: "54173696537",
  appId: "1:54173696537:web:7c679af888d5affa18e088",
  measurementId: "G-FKZSHBKMME"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const FieldValue = Firestore;

seedDatabase(firebase);

export {firebase, FieldValue};