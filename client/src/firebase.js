// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5b4Yk0jmnZNQG7TKuXABaeFmEPzKuPk8",
  authDomain: "estate-fa59a.firebaseapp.com",
  projectId: "estate-fa59a",
  storageBucket: "estate-fa59a.appspot.com",
  messagingSenderId: "979611525387",
  appId: "1:979611525387:web:6509bbac23e86e495d820e",
  measurementId: "G-MB03VC5L2P"
};

export const app = initializeApp(firebaseConfig);