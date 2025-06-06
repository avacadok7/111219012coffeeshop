// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8uomBCTtm6V4g1tNdo0GA-3L55GqxHQ4",
  authDomain: "coffeeshop-6ff98.firebaseapp.com",
  databaseURL: "https://coffeeshop-6ff98-default-rtdb.firebaseio.com",
  projectId: "coffeeshop-6ff98",
  storageBucket: "coffeeshop-6ff98.firebasestorage.app",
  messagingSenderId: "65802404441",
  appId: "1:65802404441:web:c1f30ff1b7bf6688a2a748",
  measurementId: "G-CCPFXHHDRC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);