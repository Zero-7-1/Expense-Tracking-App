// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5R73H-oEXeJKYkJgL5Lv1n21xnvKSUHs",
  authDomain: "fma-project-291ac.firebaseapp.com",
  projectId: "fma-project-291ac",
  storageBucket: "fma-project-291ac.firebasestorage.app",
  messagingSenderId: "128596166313",
  appId: "1:128596166313:web:64b80fbe2eb064e18b8bb8",
  measurementId: "G-2JGLY4HP51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 

export { app, auth }; // Export the auth variable for use in other files